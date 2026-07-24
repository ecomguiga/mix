import { Link } from "@tanstack/react-router";
import { Radio, Calendar, MessageSquare, Shield, Home } from "lucide-react";

const links = [
  { to: "/", label: "Início", icon: Home },
  { to: "/programacao", label: "Programação", icon: Calendar },
  { to: "/pedidos", label: "Pedidos", icon: MessageSquare },
];

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-neon)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Radio className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-bold neon-text">Voxstream</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Web Rádio</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-semibold text-foreground bg-accent" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 sm:text-sm sm:px-4 sm:py-2"
        >
          <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Painel Admin</span>
          <span className="sm:hidden">Admin</span>
        </Link>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-[76px] z-40 mx-3 mb-2 flex items-center justify-around rounded-2xl border border-border/60 glass p-1 md:hidden">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <Link
              key={l.to}
              to={l.to}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] text-muted-foreground"
              activeProps={{ className: "flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-semibold text-primary bg-primary/10" }}
              activeOptions={{ exact: true }}
            >
              <Icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
