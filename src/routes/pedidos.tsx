import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Heart, MessageSquare, Music } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Pedidos e Recados — Voxstream" },
      { name: "description", content: "Envie seu pedido de música ou recado ao vivo para a Voxstream Web Rádio." },
      { property: "og:title", content: "Pedidos e Recados — Voxstream" },
      { property: "og:description", content: "Mural de recados e pedidos ao vivo." },
    ],
  }),
  component: PedidosPage,
});

type Msg = { id: string; name: string; message: string; song?: string; when: string; likes: number };

const seed: Msg[] = [
  { id: "m1", name: "Ana Paula", message: "Boa tarde! Adorando o programa 💜", song: "Physical - Dua Lipa", when: "há 4 min", likes: 12 },
  { id: "m2", name: "Rafael", message: "Manda um salve pra galera de Curitiba!", when: "há 12 min", likes: 8 },
  { id: "m3", name: "Juliana", message: "Toca alguma coisa do The Weeknd por favor 🎧", song: "Save Your Tears - The Weeknd", when: "há 18 min", likes: 22 },
  { id: "m4", name: "Marcos", message: "Melhor rádio pra trabalhar. Tô no ar todo dia!", when: "há 32 min", likes: 5 },
];

function PedidosPage() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [name, setName] = useState("");
  const [song, setSong] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Preencha nome e mensagem");
      return;
    }
    const m: Msg = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
      song: song.trim() || undefined,
      when: "agora",
      likes: 0,
    };
    setMessages((prev) => [m, ...prev]);
    setName("");
    setSong("");
    setMessage("");
    toast.success("Recado enviado! Fique de olho no ar 💜");
  }

  function like(id: string) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m)));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Interação</p>
        <h1 className="text-3xl font-black sm:text-4xl">Pedidos & Recados</h1>
        <p className="mt-2 text-muted-foreground">Envie sua mensagem ou peça uma música ao locutor ao vivo.</p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <form onSubmit={submit} className="rounded-3xl border border-border/60 glass p-6 neon-border">
          <div className="flex items-center gap-2 text-primary">
            <Send className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Novo recado</p>
          </div>
          <h2 className="mt-2 text-2xl font-bold">Fale com o locutor</h2>

          <div className="mt-6 grid gap-4">
            <div>
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Como quer ser chamado?" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="song">Pedido de música (opcional)</Label>
              <Input id="song" value={song} onChange={(e) => setSong(e.target.value)} placeholder="Artista - Música" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="msg">Mensagem</Label>
              <Textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Mande um salve, uma dedicatória…" className="mt-1.5" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send className="h-4 w-4" /> Enviar ao vivo
            </button>
          </div>
        </form>

        {/* Wall */}
        <div>
          <div className="flex items-center gap-2 text-primary">
            <MessageSquare className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Mural ao vivo</p>
          </div>
          <div className="mt-3 grid gap-3">
            {messages.map((m) => (
              <article key={m.id} className="rounded-2xl border border-border/60 glass p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-[11px] text-muted-foreground">{m.when}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => like(m.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/40 px-2.5 py-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Heart className="h-3.5 w-3.5" /> {m.likes}
                  </button>
                </div>
                <p className="mt-3 text-sm">{m.message}</p>
                {m.song && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    <Music className="h-3 w-3" /> {m.song}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
