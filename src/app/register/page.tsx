"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Tạo tài khoản</h1>
          <p className="text-text-secondary">Bắt đầu hành trình học lập trình của bạn</p>
        </div>

        <div className="rounded-2xl border border-surface-3 bg-surface-1 p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-lg border border-surface-3 bg-surface-0 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hau@codeverse.dev"
                  className="w-full rounded-lg border border-surface-3 bg-surface-0 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-surface-3 bg-surface-0 py-2.5 pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="press flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-surface-0 hover:bg-accent-dim transition-colors cursor-pointer"
            >
              Đăng ký
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-accent hover:text-accent-dim">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
