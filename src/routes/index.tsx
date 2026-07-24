import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Pause, Users, Radio, Music, ArrowRight, Headphones } from "lucide-react";
import { usePlayer } from "@/lib/player-context";
import { currentTrack, recentTracks, schedule, stats } from "@/lib/radio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voxstream — Tocando agora" },
      { name: "description", content: "Ouça a Voxstream Web Rádio ao vivo. Programação, pedidos e o melhor da música." },
      { property: "og:title", content: "Voxstream — Tocando agora" },
      { property: "og:description", content: "Ouça a Voxstream Web Rádio ao vivo. Programação, pedidos e o melhor da música." },
    ],
  }),
  component: Home,
});

function Home() {
  const { isPlaying, toggle } = usePlayer();
  const liveProgram = schedule.find((p) => p.live) ?? schedule[1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Hero — Now Playing */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 glass p-6 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="relative mx-auto md:mx-0">
            <div
              className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            <img
              src={currentTrack.cover}
              alt={currentTrack.album}
              className="relative h-56 w-56 rounded-2xl object-cover shadow-[var(--shadow-neon)] sm:h-64 sm:w-64"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                No ar
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Users className="h-3 w-3" />
                {stats.online.toLocaleString("pt-BR")} ouvintes
              </span>
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Tocando agora</p>
            <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
              {currentTrack.title}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">{currentTrack.artist} · {currentTrack.album}</p>

            <div className="mt-5 rounded-2xl border border-border/60 bg-card/40 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Programa</p>
              <p className="mt-1 text-lg font-bold">{liveProgram.name}</p>
              <p className="text-sm text-muted-foreground">Com {liveProgram.host} · {liveProgram.time} - {liveProgram.endTime}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={toggle}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-primary)" }}
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                {isPlaying ? "Pausar transmissão" : "Ouvir ao vivo"}
              </button>
              <Link
                to="/pedidos"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-6 py-3 text-sm font-semibold hover:bg-accent"
              >
                Enviar pedido <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={Users} label="Online agora" value={stats.online.toLocaleString("pt-BR")} />
        <StatCard icon={Headphones} label="Pico do dia" value={stats.peak.toLocaleString("pt-BR")} />
        <StatCard icon={Radio} label="Países" value={stats.countries} />
        <StatCard icon={Music} label="24h ouvintes" value={stats.totalListeners24h.toLocaleString("pt-BR")} />
      </section>

      {/* Recent tracks */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Histórico</p>
            <h2 className="text-2xl font-bold sm:text-3xl">Tocadas recentemente</h2>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentTracks.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-border/60 glass p-3 transition-colors hover:border-primary/50">
              <img src={t.cover} alt={t.album} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{t.title}</p>
                <p className="truncate text-sm text-muted-foreground">{t.artist}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{t.duration}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule preview */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Hoje</p>
            <h2 className="text-2xl font-bold sm:text-3xl">Programação do dia</h2>
          </div>
          <Link to="/programacao" className="text-sm font-semibold text-primary hover:underline">
            Ver toda
          </Link>
        </div>
        <div className="mt-4 grid gap-2">
          {schedule.slice(0, 4).map((p) => (
            <div key={p.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-border/60 glass p-3 sm:p-4">
              <div className="shrink-0 rounded-xl bg-primary/10 px-3 py-2 text-center">
                <p className="font-mono text-sm font-bold text-primary">{p.time}</p>
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">Com {p.host}</p>
              </div>
              {p.live && (
                <span className="shrink-0 rounded-full bg-destructive/20 px-2 py-1 text-[10px] font-bold uppercase text-destructive">Ao vivo</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border/60 glass p-4">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
