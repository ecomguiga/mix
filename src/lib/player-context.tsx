import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { currentTrack, type Track } from "./radio-data";

type PlayerState = {
  track: Track;
  isPlaying: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
};

const Ctx = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(75);
  const toggle = useCallback(() => setIsPlaying((p) => !p), []);
  const setVolume = useCallback((v: number) => setVolumeState(v), []);
  return (
    <Ctx.Provider value={{ track: currentTrack, isPlaying, volume, toggle, setVolume }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayer must be inside PlayerProvider");
  return ctx;
}
