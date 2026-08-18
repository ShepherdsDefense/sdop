"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  Church,
  Handshake,
  LayoutDashboard,
  Menu,
  Target,
  UserRound,
  X,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

type AppShellProps = {
  children: React.ReactNode;
  active?:
  | "dashboard"
  | "profile"
  | "churches"
  | "partnerships"
  | "training"
  | "calendar"
  | "tasks"
  | "reports";
};

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    key: "dashboard",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
  label: "Profile",
  href: "/profile",
  key: "profile",
  icon: UserRound,
  enabled: true,
},
  {
    label: "Churches",
    href: "/churches",
    key: "churches",
    icon: Church,
    enabled: true,
  },
  {
    label: "Partnerships",
    href: "/partnerships",
    key: "partnerships",
    icon: Handshake,
    enabled: true,
  },
  {
    label: "Training",
    href: "#",
    key: "training",
    icon: Target,
    enabled: false,
  },
  {
    label: "Calendar",
    href: "#",
    key: "calendar",
    icon: CalendarDays,
    enabled: false,
  },
  {
    label: "Tasks",
    href: "#",
    key: "tasks",
    icon: CheckSquare,
    enabled: false,
  },
  {
    label: "Reports",
    href: "#",
    key: "reports",
    icon: BarChart3,
    enabled: false,
  },
];

export default function AppShell({
  children,
  active = "dashboard",
}: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">

  <Image
  src="/sdop-logo.png"
  alt="SDOP"
  width={110}
  height={92}
  priority
/>

  <div className="space-y-1">

    <h1 className="text-5xl font-black tracking-tight">
      SDOP
    </h1>

    <p className="text-lg text-slate-300">
      Shepherds Defense Operations Portal
    </p>

    <p className="text-sm font-medium tracking-wide text-amber-400">
      Equip • Protect • Lead
    </p>

  </div>

</div>

          <div className="hidden lg:block">
            <LogoutButton />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-slate-700 p-2 text-slate-300 transition hover:border-amber-400 hover:text-amber-400 lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-6 lg:px-8">
        <aside
          className={`mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-xl shadow-black/10 lg:mb-0 ${
            menuOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="mb-3 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Navigation
            </p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === active;

              if (!item.enabled) {
                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600"
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    isActive
                      ? "flex items-center gap-3 rounded-xl bg-amber-400 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/10"
                      : "flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  }
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
<div className="mt-8 border-t border-slate-800 px-3 pt-5">
  <p className="text-sm font-bold text-slate-300">
    SDOP
  </p>

  <p className="mt-1 text-xs text-slate-500">
    Version 0.3 Alpha
  </p>

  <p className="mt-3 text-xs leading-5 text-slate-600">
    © 2026 Shepherds Defense Group
  </p>
</div>
          <div className="mt-4 border-t border-slate-800 pt-4 lg:hidden">
            <LogoutButton />
          </div>
        </aside>

        <section className="min-w-0">
          {children}
        </section>
      </div>
    </main>
  );
}