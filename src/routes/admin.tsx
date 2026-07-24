import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Music2, Radio, Users, Upload, Play, Pause, Trash2, Plus,
  Copy, Eye, EyeOff, Activity, Wifi, TrendingUp, Clock, Signal, ArrowLeft, Edit3,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { stats, listenerHistory, playlists as seedPlaylists, streamConfig as seedConfig, hosts as seedHosts } from "@/lib/radio-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Voxstream Audio — Administração" },
      { name: "description", content: "Painel administrativo Voxstream: dashboard, AutoDJ, transmissão e locutores." },
      { property: "og:title", content: "Painel Voxstream Audio" },
      { property: "og:description", content: "Gerencie sua web rádio com o Painel Voxstream Audio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPanel,
});

type Tab = "dashboard" | "autodj" | "streaming" | "locutores";

function AdminPanel() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 glass">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Site
            </Link>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-neon)]" style={{ background: "var(--gradient-primary)" }}>
                <Radio className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <p className="font-display text-sm font-bold">Painel Voxstream</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Audio Panel v3.0</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-semibold text-emerald-400">Servidor Online</span>
            </span>
            <div className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              A
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[73px] lg:h-fit">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-border/60 glass p-2 lg:flex-col lg:overflow-visible">
            <SidebarBtn active={tab === "dashboard"} onClick={() => setTab("dashboard")} icon={LayoutDashboard} label="Dashboard" />
            <SidebarBtn active={tab === "autodj"} onClick={() => setTab("autodj")} icon={Music2} label="AutoDJ" />
            <SidebarBtn active={tab === "streaming"} onClick={() => setTab("streaming")} icon={Signal} label="Transmissão" />
            <SidebarBtn active={tab === "locutores"} onClick={() => setTab("locutores")} icon={Users} label="Locutores" />
          </nav>
        </aside>

        <div className="min-w-0">
          {tab === "dashboard" && <Dashboard />}
          {tab === "autodj" && <AutoDJ />}
          {tab === "streaming" && <Streaming />}
          {tab === "locutores" && <Locutores />}
        </div>
      </div>
    </div>
  );
}

function SidebarBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] lg:w-full"
          : "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground lg:w-full"
      }
      style={active ? { background: "var(--gradient-primary)" } : undefined}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

/* ================== DASHBOARD ================== */
function Dashboard() {
  const max = Math.max(...listenerHistory.map((l) => l.listeners));
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Visão geral</p>
        <h1 className="text-3xl font-black">Dashboard</h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BigStat icon={Users} label="Ouvintes online" value={stats.online.toLocaleString("pt-BR")} trend="+12,4%" color="from-primary to-neon-blue" />
        <BigStat icon={TrendingUp} label="Pico do dia" value={stats.peak.toLocaleString("pt-BR")} trend="+3,1%" />
        <BigStat icon={Wifi} label="Banda utilizada" value={`${stats.bandwidth}%`} trend="24 Mbps" />
        <BigStat icon={Clock} label="Sessão média" value={stats.averageSession} trend="+8min" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-3xl border border-border/60 glass p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Últimas 24h</p>
              <h2 className="text-lg font-bold">Ouvintes por hora</h2>
            </div>
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-6 flex items-end gap-3 h-56">
            {listenerHistory.map((h) => (
              <div key={h.time} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg shadow-[var(--shadow-glow)]"
                    style={{
                      height: `${(h.listeners / max) * 100}%`,
                      background: "var(--gradient-primary)",
                    }}
                    title={`${h.listeners} ouvintes`}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{h.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border/60 glass p-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Status do servidor</p>
          <h2 className="text-lg font-bold">Icecast 2.4</h2>
          <div className="mt-4 space-y-3">
            <ServerRow label="Uptime" value="7d 14h" />
            <ServerRow label="CPU" value="34%" />
            <ServerRow label="RAM" value="62%" />
            <ServerRow label="Bitrate" value="128 kbps" />
            <ServerRow label="Formato" value="MP3" />
            <ServerRow label="Países" value={String(stats.countries)} />
          </div>
        </section>
      </div>
    </div>
  );
}

function BigStat({ icon: Icon, label, value, trend }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; trend: string; color?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 glass p-5">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-3 text-3xl font-black">{value}</p>
      <p className="mt-1 text-xs font-semibold text-emerald-400">{trend}</p>
    </div>
  );
}

function ServerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}

/* ================== AUTODJ ================== */
function AutoDJ() {
  const [pls, setPls] = useState(seedPlaylists);
  const [autoDjEnabled, setAutoDjEnabled] = useState(true);

  function toggle(id: string) {
    setPls((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }
  function remove(id: string) {
    setPls((prev) => prev.filter((p) => p.id !== id));
    toast.success("Playlist removida");
  }
  function upload() {
    toast.success("3 arquivos enviados (simulação)");
  }
  function create() {
    const id = crypto.randomUUID();
    setPls((prev) => [...prev, { id, name: "Nova Playlist", tracks: 0, duration: "0min", active: false }]);
    toast.success("Playlist criada");
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Automação</p>
          <h1 className="text-3xl font-black">AutoDJ</h1>
          <p className="mt-1 text-sm text-muted-foreground">Playlists automáticas para quando não houver locutor ao vivo.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 glass px-4 py-3">
          <div>
            <p className="text-xs font-semibold">AutoDJ ativo</p>
            <p className="text-[10px] text-muted-foreground">Assume automaticamente</p>
          </div>
          <Switch checked={autoDjEnabled} onCheckedChange={setAutoDjEnabled} />
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        <button onClick={upload} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-semibold hover:bg-accent">
          <Upload className="h-4 w-4" /> Upload MP3
        </button>
        <button onClick={create} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)]" style={{ background: "var(--gradient-primary)" }}>
          <Plus className="h-4 w-4" /> Nova playlist
        </button>
      </div>

      <section className="grid gap-3">
        {pls.map((p) => (
          <div key={p.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-border/60 glass p-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Music2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-bold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.tracks} faixas · {p.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggle(p.id)}
                className={p.active
                  ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400"
                  : "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground"}
              >
                {p.active ? <><Play className="h-3 w-3 fill-current" /> Ativa</> : <><Pause className="h-3 w-3" /> Inativa</>}
              </button>
              <button onClick={() => remove(p.id)} className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-border/60 glass p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Agendamento</p>
        <h2 className="text-lg font-bold">Horários do AutoDJ</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <ScheduleSlot time="00:00 - 06:00" playlist="Lounge Madrugada" />
          <ScheduleSlot time="12:00 - 14:00" playlist="Pop Hits 2026" />
          <ScheduleSlot time="23:00 - 00:00" playlist="Lounge Madrugada" />
          <ScheduleSlot time="Fins de semana" playlist="Rock Clássico" />
        </div>
      </section>
    </div>
  );
}

function ScheduleSlot({ time, playlist }: { time: string; playlist: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 p-3">
      <div>
        <p className="font-mono text-sm font-bold text-primary">{time}</p>
        <p className="text-xs text-muted-foreground">{playlist}</p>
      </div>
      <Edit3 className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

/* ================== STREAMING ================== */
function Streaming() {
  const [cfg, setCfg] = useState(seedConfig);
  const [showPanel, setShowPanel] = useState(false);
  const [showEnc, setShowEnc] = useState(false);

  function copy(v: string, label: string) {
    navigator.clipboard.writeText(v);
    toast.success(`${label} copiado`);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Configurações salvas");
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Conexão</p>
        <h1 className="text-3xl font-black">Dados de transmissão</h1>
        <p className="mt-1 text-sm text-muted-foreground">Use estas credenciais no seu encoder (Sam Broadcaster, BUTT, Winamp, Mixxx).</p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <Field label="Servidor (IP/Host)" value={cfg.ip} onChange={(v) => setCfg({ ...cfg, ip: v })} copyable onCopy={() => copy(cfg.ip, "Host")} />
        <Field label="Porta" value={cfg.port} onChange={(v) => setCfg({ ...cfg, port: v })} copyable onCopy={() => copy(cfg.port, "Porta")} />
        <Field label="Mountpoint" value={cfg.mountpoint} onChange={(v) => setCfg({ ...cfg, mountpoint: v })} copyable onCopy={() => copy(cfg.mountpoint, "Mountpoint")} />
        <Field label="Tipo de servidor" value={cfg.serverType} onChange={(v) => setCfg({ ...cfg, serverType: v })} />
        <Field
          label="Senha do painel"
          value={cfg.panelPassword}
          onChange={(v) => setCfg({ ...cfg, panelPassword: v })}
          type={showPanel ? "text" : "password"}
          rightIcon={showPanel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          onRightClick={() => setShowPanel((s) => !s)}
          copyable
          onCopy={() => copy(cfg.panelPassword, "Senha do painel")}
        />
        <Field
          label="Senha do encoder"
          value={cfg.encoderPassword}
          onChange={(v) => setCfg({ ...cfg, encoderPassword: v })}
          type={showEnc ? "text" : "password"}
          rightIcon={showEnc ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          onRightClick={() => setShowEnc((s) => !s)}
          copyable
          onCopy={() => copy(cfg.encoderPassword, "Senha do encoder")}
        />
        <Field label="Bitrate" value={cfg.bitrate} onChange={(v) => setCfg({ ...cfg, bitrate: v })} />
        <Field label="Formato" value={cfg.format} onChange={(v) => setCfg({ ...cfg, format: v })} />
      </section>

      <div className="rounded-2xl border border-primary/40 bg-primary/5 p-4 text-sm">
        <p className="font-semibold text-primary">URL pública de streaming</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <code className="rounded-lg bg-background/60 px-3 py-1.5 font-mono text-xs">http://{cfg.ip}:{cfg.port}{cfg.mountpoint}</code>
          <button
            type="button"
            onClick={() => copy(`http://${cfg.ip}:${cfg.port}${cfg.mountpoint}`, "URL")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-semibold hover:bg-accent"
          >
            <Copy className="h-3 w-3" /> Copiar
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-neon)]"
        style={{ background: "var(--gradient-primary)" }}
      >
        Salvar configurações
      </button>
    </form>
  );
}

function Field({
  label, value, onChange, type = "text", rightIcon, onRightClick, copyable, onCopy,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
  rightIcon?: React.ReactNode; onRightClick?: () => void; copyable?: boolean; onCopy?: () => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="relative flex-1">
          <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="pr-10 font-mono" />
          {rightIcon && (
            <button type="button" onClick={onRightClick} className="absolute inset-y-0 right-2 grid place-items-center text-muted-foreground hover:text-foreground">
              {rightIcon}
            </button>
          )}
        </div>
        {copyable && (
          <button type="button" onClick={onCopy} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground">
            <Copy className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ================== LOCUTORES ================== */
function Locutores() {
  const [list, setList] = useState(seedHosts);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", schedule: "", bio: "", avatar: "" });

  function reset() {
    setForm({ name: "", schedule: "", bio: "", avatar: "" });
    setEditing(null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Informe o nome");
      return;
    }
    if (editing) {
      setList((prev) => prev.map((h) => (h.id === editing ? { ...h, ...form, avatar: form.avatar || h.avatar } : h)));
      toast.success("Locutor atualizado");
    } else {
      setList((prev) => [
        ...prev,
        { id: crypto.randomUUID(), name: form.name, schedule: form.schedule || "A definir", bio: form.bio || "Novo locutor", avatar: form.avatar || `https://i.pravatar.cc/200?u=${Date.now()}` },
      ]);
      toast.success("Locutor adicionado");
    }
    reset();
  }

  function edit(id: string) {
    const h = list.find((x) => x.id === id);
    if (!h) return;
    setForm({ name: h.name, schedule: h.schedule, bio: h.bio, avatar: h.avatar });
    setEditing(id);
  }

  function remove(id: string) {
    setList((prev) => prev.filter((h) => h.id !== id));
    toast.success("Locutor removido");
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Equipe</p>
        <h1 className="text-3xl font-black">Locutores</h1>
        <p className="mt-1 text-sm text-muted-foreground">Adicione, edite e organize a equipe da rádio.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <form onSubmit={submit} className="rounded-3xl border border-border/60 glass p-6">
          <h2 className="text-lg font-bold">{editing ? "Editar locutor" : "Novo locutor"}</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Horário</Label>
              <Input value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} placeholder="Seg-Sex 09h-12h" className="mt-1.5" />
            </div>
            <div>
              <Label>URL do avatar</Label>
              <Input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="https://..." className="mt-1.5" />
            </div>
            <div>
              <Label>Bio</Label>
              <Input value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-1.5" />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 rounded-full px-4 py-2.5 font-semibold text-primary-foreground shadow-[var(--shadow-neon)]" style={{ background: "var(--gradient-primary)" }}>
                {editing ? "Salvar" : "Adicionar"}
              </button>
              {editing && (
                <button type="button" onClick={reset} className="rounded-full border border-border/60 bg-card/40 px-4 py-2.5 text-sm font-semibold">
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="grid gap-3">
          {list.map((h) => (
            <div key={h.id} className="flex items-center gap-4 rounded-2xl border border-border/60 glass p-4">
              <img src={h.avatar} alt={h.name} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-primary/40" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{h.name}</p>
                <p className="text-xs text-primary">{h.schedule}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{h.bio}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => edit(h.id)} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button onClick={() => remove(h.id)} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
