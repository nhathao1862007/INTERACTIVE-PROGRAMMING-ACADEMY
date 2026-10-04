# Animation Standards
# Comprehensive guide for choosing and implementing animations in web projects.
#
# This file contains animation standards, patterns, and best practices
# to be applied across all projects in this workspace.

---

## 1. Libraries Overview

### When to Use Which Library

| Library | Use Case | Install |
|---|---|---|
| **GSAP** | Complex timelines, scroll-driven, SVG morphing | `npm i gsap` |
| **CSS Transitions** | Interactive state changes (hover, toggle) | built-in |
| **CSS Keyframes** | One-shot enter animations, loading | built-in |
| **Framer Motion** | Declarative React animations, layout, gestures | `npm i framer-motion` |
| **React Spring** | Physics-based animations, gesture-driven | `npm i @react-spring/web` |
| **Anime.js** | Lightweight vanilla JS, SVG paths | `npm i animejs` |

### Quick Decision Matrix

| Scenario | Recommended |
|---|---|
| Button hover/toggle | CSS transition |
| Page hero entrance | GSAP from() or Motion variants |
| Scroll-driven reveal | GSAP ScrollTrigger |
| Complex sequencing | GSAP Timeline |
| Staggered list | GSAP stagger or Motion staggerChildren |
| Layout expand/collapse | Framer Motion `layout` |
| SVG path morphing | GSAP or Anime.js |
| Icon swap (toggle) | AnimatePresence with `initial={false}` |

---

## 2. GSAP Standards

### 2.1 Core Tween Methods

- `gsap.to(targets, vars)` — animate from current state to `vars`
- `gsap.from(targets, vars)` — animate from `vars` to current state
- `gsap.fromTo(targets, fromVars, toVars)` — explicit start/end
- `gsap.set(targets, vars)` — apply immediately (duration 0)
- Dùng **camelCase** cho property names (`backgroundColor`, `rotationX`)

### 2.2 Transform Aliases (PREFER over raw transform string)

| GSAP | CSS equivalent |
|---|---|
| `x`, `y`, `z` | translateX/Y/Z (px) |
| `xPercent`, `yPercent` | % |
| `scale`, `scaleX`, `scaleY` | scale |
| `rotation` | rotate (deg) |
| `rotationX`, `rotationY` | 3D rotate |
| `skewX`, `skewY` | skew |
| `transformOrigin` | transform-origin |

- **autoAlpha** — prefer over `opacity`. Khi 0, set `visibility: hidden`

### 2.3 Easing

```javascript
ease: "power1.out"   // default
ease: "power3.inOut"
ease: "back.out(1.7)"
ease: "elastic.out(1, 0.3)"
ease: "none"         // linear
```

### 2.4 gsap.matchMedia() — Responsive & Reduced Motion

```javascript
let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  gsap.to(".box", { rotation: 360, duration: 2 });
  return () => { /* cleanup */ };
});

// conditions syntax
mm.add(
  {
    isDesktop: "(min-width: 800px)",
    isMobile: "(max-width: 799px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    const { isDesktop, reduceMotion } = context.conditions;
    gsap.to(".box", {
      rotation: isDesktop ? 360 : 180,
      duration: reduceMotion ? 0 : 2
    });
  }
);
```

### 2.5 Timeline

```javascript
const tl = gsap.timeline();
tl.to(".a", { x: 100, duration: 1 })
  .to(".b", { y: 50, duration: 0.5 })
  .to(".c", { opacity: 0, duration: 0.3 });
```

#### Position Parameter (3rd argument)
- **Absolute:** `1` — start at 1s
- **Relative:** `"+=0.5"` — 0.5s after end; `"-=0.2"` — 0.2s before end
- **Label:** `"labelName"` — at label; `"labelName+=0.3"` — 0.3s after label
- **Placement:** `"<"` — start with previous tween; `">"` — start when previous ends (default)

### 2.6 ScrollTrigger

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500, duration: 1,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  }
});
```

| Property | Description |
|---|---|
| `trigger` | Element defining start position (required) |
| `start` | When trigger active. Default `"top bottom"` |
| `end` | When trigger ends. Default `"bottom top"` |
| `scrub` | `true` = direct link; number = seconds to "catch up" |
| `toggleActions` | Order: onEnter, onLeave, onEnterBack, onLeaveBack |
| `pin` | `true` = pin trigger element |
| `markers` | `true` for dev markers — **remove in production** |

### 2.7 GSAP React (useGSAP Hook)

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const containerRef = useRef(null);
useGSAP(() => {
  gsap.to(".box", { x: 100 });
  gsap.from(".item", { opacity: 0, stagger: 0.1 });
}, { scope: containerRef });
```

- ✅ Dùng **useGSAP()** thay vì `useEffect()`/`useLayoutEffect()`
- ✅ Pass **scope** (ref/element) để selectors được giới hạn
- ✅ Cleanup (reverting) chạy tự động trên unmount
- ✅ Dùng **contextSafe** để wrap callbacks

### 2.8 GSAP Plugins

```javascript
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(ScrollToPlugin, Flip, Draggable);
```

### 2.9 GSAP Utils

- `clamp(min, max, value?)` — ràng buộc giá trị
- `mapRange(inMin, inMax, outMin, outMax, value?)` — map từ range sang range khác
- `normalize(min, max, value?)` — chuẩn hóa về 0–1
- `interpolate(start, end, progress?)` — nội suy giữa 2 giá trị
- `random(min, max, snap?)` — ngẫu nhiên trong range
- `snap(snapTo, value?)` — snap về step/labels
- `toArray(value, scope?)` — convert selector/NodeList/element thành array
- `wrap(min, max, value?)` — wrap value vào range

---

## 3. CSS Standards

### 3.1 CSS Transitions (Interactive State Changes)

```css
/* Good — interruptible transition for a toggle */
.drawer {
  transform: translateX(-100%);
  transition: transform 200ms ease-out;
}
.drawer.open {
  transform: translateX(0);
}
```

### 3.2 CSS Keyframes (One-shot Sequences)

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}

.stagger-item {
  opacity: 0;
  animation: fadeInUp 400ms ease-out forwards;
}
.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }
```

### 3.3 Active Scale (Button Press Feedback)

```css
.button {
  transition-property: scale;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}
.button:active {
  scale: 0.96;
}
```

```tsx
// Tailwind
<button className="transition-transform duration-150 ease-out active:scale-[0.96]">
  Click me
</button>
```

---

## 4. Framer Motion Standards

### 4.1 Enter Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  Content
</motion.div>
```

### 4.2 Exit Animation (AnimatePresence)

```tsx
<AnimatePresence mode="popLayout">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### 4.3 Icon Swap (Toggle)

```tsx
<AnimatePresence initial={false} mode="popLayout">
  <motion.span
    key={isActive ? "active" : "inactive"}
    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
  >
    <Icon />
  </motion.span>
</AnimatePresence>
```

### 4.4 Layout Animation

```tsx
<motion.div layout transition={{ duration: 0.3 }}>
  {isExpanded && <Content />}
</motion.div>
```

### 4.5 Gestures

```tsx
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
  Drag me
</motion.div>
```

### 4.6 Reduced Motion

```tsx
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={{ x: prefersReducedMotion ? 0 : 100 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
/>
```

---

## 5. React Spring Standards

### 5.1 Basic Spring

```tsx
import { useSpring, animated } from "@react-spring/web";

const spring = useSpring({
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  config: { tension: 300, friction: 20 }
});

return <animated.div style={spring}>Content</animated.div>;
```

### 5.2 Stagger

```tsx
import { useTrail, animated } from "@react-spring/web";

const items = ["Item 1", "Item 2", "Item 3"];
const trail = useTrail(items.length, {
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" }
});

return trail.map((style, index) => (
  <animated.div key={index} style={style}>
    {items[index]}
  </animated.div>
));
```

---

## 6. Anime.js Standards

### 6.1 Basic Animation

```javascript
import anime from "animejs";

anime({
  targets: ".box",
  translateX: 250,
  rotate: "1turn",
  duration: 800,
  easing: "easeInOutQuad"
});
```

### 6.2 Stagger

```javascript
anime({
  targets: ".stagger-item",
  translateY: [-20, 0],
  opacity: [0, 1],
  delay: anime.stagger(100),
  easing: "easeOutQuad"
});
```

### 6.3 SVG Morphing

```javascript
anime({
  targets: ".svg-path",
  d: "M10,10 L90,10 L90,90 L10,90 Z",
  duration: 1000,
  easing: "easeInOutQuad"
});
```

---

## 7. Accessibility

### 7.1 prefers-reduced-motion

Always respect user preference for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
// GSAP
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
gsap.to(".box", { x: 100, duration: reduceMotion ? 0 : 1 });
```

### 7.2 Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### 7.3 Keyboard Navigation

Ensure all interactive elements are keyboard accessible:
- `tabindex="0"` for custom interactive elements
- `aria-label` for icon-only buttons
- `role="button"` for non-button elements acting as buttons

---

## 8. Performance

### 8.1 GPU-Accelerated Properties Only

✅ **Animate:** `transform` (x, y, scale, rotation) và `opacity`
❌ **Tránh:** `width`, `height`, `top`, `left`, `margin`, `padding`

### 8.2 will-change

```css
.animated-element {
  will-change: transform;
}
```

Chỉ dùng `will-change` cho elements thực sử animate, và remove sau khi animation hoàn thành.

### 8.3 Stagger > Multiple Tweens

```javascript
// Good — single stagger call
gsap.from(".item", { opacity: 0, stagger: 0.1 });

// Bad — multiple separate tweens
gsap.from(".item:nth-child(1)", { opacity: 0, delay: 0 });
gsap.from(".item:nth-child(2)", { opacity: 0, delay: 0.1 });
gsap.from(".item:nth-child(3)", { opacity: 0, delay: 0.2 });
```

### 8.4 autoAlpha vs opacity

Dùng `autoAlpha` thay vì `opacity` khi muốn element bị ẩn hoàn toàn (visibility: hidden khi opacity = 0):

```javascript
gsap.to(".box", { autoAlpha: 0 }); // visibility: hidden khi opacity = 0
```

---

## 9. Motion Patterns

### 9.1 Interruptible Animations

Users change intent mid-interaction. If animations aren't interruptible, the interface feels broken.

| | CSS Transitions | CSS Keyframe Animations |
|---|---|---|
| **Behavior** | Interpolate toward latest state | Run on a fixed timeline |
| **Interruptible** | Yes — retargets mid-animation | No — restarts from beginning |
| **Use for** | Interactive state changes (hover, toggle, open/close) | Staged sequences that run once (enter animations, loading) |

**Rule:** Always prefer CSS transitions for interactive elements. Reserve keyframes for one-shot sequences.

### 9.2 Staggered Enter

Use for infrequent staged entrances (page hero, success state, empty state). Break into semantic chunks and animate each individually.

```tsx
// Framer Motion — staggered enter
function PageHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
      >
        Welcome
      </motion.h1>
    </motion.div>
  );
}
```

### 9.3 Tap Scale (Active Feedback)

```tsx
const tapScale = "active:not-disabled:scale-[0.96]";

function Button({ static: isStatic, className, children, ...props }) {
  return (
    <button
      className={cn(
        "transition-transform duration-150 ease-out",
        !isStatic && tapScale,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 9.4 Skip Animation on Page Load

Use `initial={false}` on `AnimatePresence` to prevent enter animations from firing on first render:

```tsx
<AnimatePresence initial={false} mode="popLayout">
  <motion.span key={isActive ? "active" : "inactive"}>
    <Icon />
  </motion.span>
</AnimatePresence>
```

### 9.5 Motion Restraint

Motion is a budget, not a garnish:
- **No custom animation on high-frequency interactions.** Repeated interactions get instant feedback or minimal `opacity`/`background-color` transition at ≤150ms.
- **Motion is never the only feedback channel.** Every animated state change also needs a static cue (color, icon, label).
- **Brief and precise beats prominent.** If a shorter, smaller animation communicates the same thing, use it.
- **Honor reduced-motion preferences.** Preserve the static cue and remove unnecessary movement.

---

## 10. Decision Matrix

| Scenario | Recommended | Why |
|---|---|---|
| Button hover/toggle | CSS transition | Interruptible, simple |
| Page hero entrance | GSAP from() or Motion variants | Staggered, complex |
| Scroll-driven reveal | GSAP ScrollTrigger | Built-in scroll linking |
| Complex sequencing | GSAP Timeline | Position params, control |
| Staggered list | GSAP stagger or Motion staggerChildren | Performance, simplicity |
| Layout expand/collapse | Framer Motion `layout` | Automatic layout animation |
| SVG path morphing | GSAP or Anime.js | SVG-specific support |
| Icon swap (toggle) | AnimatePresence with `initial={false}` | Exit + enter transition |
| Physics-based | React Spring | Spring physics |
| Loading spinner | CSS keyframes | Simple, one-shot |
| Form validation error | CSS transition | Interruptible, immediate |

---

## 11. Installation

```bash
# GSAP
npm i gsap

# Framer Motion
npm i framer-motion

# React Spring
npm i @react-spring/web

# Anime.js
npm i animejs
```

---

## 12. References

- [GSAP Documentation](https://gsap.com/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Spring Documentation](https://react-spring.dev/)
- [Anime.js Documentation](https://animejs.com/documentation/)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
