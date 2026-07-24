import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { usePlayer } from "@/lib/player-context";
import { Slider } from "@/components/ui/slider";

export function PersistentPlayer() {
  const { track, isPlaying, toggle, volume, setVolume } = usePlayer();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 glass">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:gap-4 sm:px-6">
        {/* Track info */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={track.cover}
              alt={track.album}
              className={`h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14 ${isPlaying ? "shadow-[var(--shadow-glow)]" : ""}`}
            />
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/50">
                <div className="flex items-end h-5">
                  <span className="equalizer-bar" />
                  <span className="equalizer-bar" />
                  <span className="equalizer-bar" />
                  <span className="equalizer-bar" />
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                Ao vivo
              </span>
            </div>
            <p className="mt-0.5 truncate text-sm font-semibold">{track.title}</p>
            <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pausar" : "Tocar"}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-105 active:scale-95"
          style={{ background: "var(--gradient-primary)" }}
        >
          {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current translate-x-0.5" />}
        </button>

        {/* Volume - desktop */}
        <div className="hidden items-center gap-2 sm:flex sm:w-40">
          <button
            onClick={() => setVolume(volume === 0 ? 75 : 0)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Mudo"
          >
            {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(v) => setVolume(v[0])}
            aria-label="Volume"
          />
        </div>

        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground md:flex">
          <Radio className="h-3.5 w-3.5 text-primary" />
          128 kbps
        </div>
      </div>
    </div>
  );
}
