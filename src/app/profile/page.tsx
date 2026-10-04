"use client";

import { User, Mail, Calendar, Edit2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Profile</h1>
        <p className="text-text-secondary">Quản lý thông tin tài khoản</p>
      </div>

      <div className="rounded-xl border border-surface-3 bg-surface-1 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent">H</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Hàu</h2>
            <p className="text-sm text-text-muted">Level 5 — 2,450 XP</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-surface-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
              <span className="text-sm text-text-secondary">Display Name</span>
            </div>
            <span className="text-sm text-text-primary">Hàu</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-surface-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
              <span className="text-sm text-text-secondary">Email</span>
            </div>
            <span className="text-sm text-text-primary">hau@codeverse.dev</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-surface-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
              <span className="text-sm text-text-secondary">Joined</span>
            </div>
            <span className="text-sm text-text-primary">September 2026</span>
          </div>
        </div>

        <button className="press mt-4 flex items-center gap-2 rounded-lg border border-surface-3 px-4 py-2 text-sm text-text-secondary hover:bg-surface-2 cursor-pointer">
          <Edit2 className="h-4 w-4" strokeWidth={1.5} />
          Edit Profile
        </button>
      </div>

      <div className="rounded-xl border border-surface-3 bg-surface-1 p-6">
        <h3 className="font-semibold text-text-primary mb-4">Learning Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Lessons", value: "24" },
            { label: "Exercises", value: "87" },
            { label: "Projects", value: "3" },
            { label: "Streak", value: "7 days" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-accent tabular-nums">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
