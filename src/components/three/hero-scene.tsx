/**
 * @module components/three/hero-scene
 * Hand-written WebGL hero backdrop — a drifting isometric data-grid with a
 * cursor-reactive phosphor glow. Zero 3D dependencies.
 *
 * Graceful degradation:
 *  - no WebGL context -> CSS <BlueprintGrid />
 *  - prefers-reduced-motion -> single static frame, no rAF loop
 *  - WebGL context loss -> swap to the CSS fallback
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { BlueprintGrid } from "./blueprint-grid";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_glow;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float gridLine(vec2 p, float width) {
  vec2 g = abs(fract(p) - 0.5);
  return smoothstep(width, 0.0, min(g.x, g.y));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m  = (u_mouse - 0.5 * u_res) / u_res.y;

  vec2 p = uv;
  p.y -= 0.18;

  // Isometric skew — reads as 3D without a depth buffer.
  vec2 iso = vec2(p.x * 1.35 + p.y * 0.85, p.y * 1.35 - p.x * 0.85);

  float t  = u_time * 0.03;
  float g1 = gridLine(iso * vec2(6.0, 3.2) + vec2(0.0, -t * 4.0), 0.022);
  float g2 = gridLine(vec2(iso.x * 3.0, iso.y * 3.0) + vec2(t * 2.0, -t * 3.0), 0.014);

  float md    = length(uv - m);
  float glow  = exp(-md * 3.0) * u_glow;
  float fog   = smoothstep(-0.75, 0.95, p.y);
  float sweep = smoothstep(0.92, 1.0, sin(iso.x * 42.0 + u_time * 1.4) * 0.5 + 0.5) * 0.05;

  vec3 phosphor = vec3(0.208, 0.878, 0.631);
  vec3 signal   = vec3(0.275, 0.835, 0.910);

  vec3 col = vec3(0.0);
  col += phosphor * g1 * (0.30 + glow * 1.05) * fog;
  col += signal   * g2 * 0.18 * (0.35 + glow);
  col += phosphor * glow * 0.22;
  col += phosphor * sweep * fog;

  float stars = pow(hash(floor(iso * 88.0)), 42.0);
  col += phosphor * stars * fog * (0.45 + glow);

  float vig = smoothstep(1.6, 0.15, length(uv * vec2(0.82, 1.0)));
  col *= vig;

  float alpha = clamp(dot(col, vec3(0.55)) * 1.7, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroScene({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      setFailed(true);
      return;
    }

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = vert && frag ? gl.createProgram() : null;

    if (!vert || !frag || !program) {
      setFailed(true);
      return;
    }

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uGlow = gl.getUniformLocation(program, "u_glow");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 1;
    let height = 1;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, glow: 0, tglow: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (event.clientX - rect.left) * dpr;
      mouse.ty = (rect.height - (event.clientY - rect.top)) * dpr;
      mouse.tglow = 1;
    };
    const onPointerLeave = () => {
      mouse.tglow = 0;
    };

    // Seed the cursor at the canvas centre so the hero is never "dead".
    mouse.x = mouse.tx = width * 0.5;
    mouse.y = mouse.ty = height * 0.55;

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (time: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.glow += (mouse.tglow - mouse.glow) * 0.05;

      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uGlow, 0.35 + mouse.glow * 0.65);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    if (reduceMotion) {
      draw(0);
    } else {
      const loop = (time: number) => {
        draw(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const onContextLost = (event: Event) => {
      event.preventDefault();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  if (failed) return <BlueprintGrid className={className} />;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

