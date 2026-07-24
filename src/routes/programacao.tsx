import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mic } from "lucide-react";
import { schedule, hosts } from "@/lib/radio-data";

export const Route = createFileRoute("/programacao")({
  head: () => ({
    meta: [
      { title: "Programação — Voxstream Web Rádio" },
      { name: "description", content: "Veja a programação completa da Voxstream: horários, programas e locutores." },
      { property: "og:title", content: "Programação — Voxstream" },
      { property: "og:description", content: "Grade completa da Voxstream Web Rádio." },
    ],
  }),
  component: ProgramacaoPage,
});

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function ProgramacaoPage() {
  const [day, setDay] = useState("Seg");

  const visible = schedule.filter((p) => p.days.includes(day) || p.days.includes("Todos"));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Grade</p>
        <h1 className="text-3xl font-black sm:text-4xl">Programação</h1>
        <p className="mt-2 text-muted-foreground">Confira nossos programas ao vivo durante toda a semana.</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={
              d === day
                ? "rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
                : "rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            }
            style={d === day ? { background: "var(--gradient-primary)" } : undefined}
          >
            {d}
          </button>
        ))}
      </div>

      <section className="mt-8 grid gap-3">
        {visible.map((p) => (
          <article key={p.id} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-border/60 glass p-4 sm:grid-cols-[auto_1fr_auto] sm:p-5">
            <div className="shrink-0 rounded-2xl bg-primary/10 p-3 text-center sm:p-4">
              <Clock className="mx-auto h-4 w-4 text-primary" />
              <p className="mt-1 font-mono text-sm font-bold text-primary sm:text-base">{p.time}</p>
              <p className="text-[10px] text-muted-foreground">até {p.endTime}</p>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold sm:text-xl">{p.name}</h2>
                {p.live && (
                  <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">
                    Ao vivo
                  </span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mic className="h-3.5 w-3.5" /> {p.host}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Hosts */}
      <section className="mt-12">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Time</p>
        <h2 className="text-2xl font-bold sm:text-3xl">Nossos locutores</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hosts.map((h) => (
            <div key={h.id} className="flex items-center gap-4 rounded-2xl border border-border/60 glass p-4">
              <img src={h.avatar} alt={h.name} className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/40" />
              <div className="min-w-0">
                <p className="truncate font-bold">{h.name}</p>
                <p className="text-xs text-primary">{h.schedule}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{h.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
