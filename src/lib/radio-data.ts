export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
};

export type Program = {
  id: string;
  time: string;
  endTime: string;
  name: string;
  host: string;
  description: string;
  days: string[];
  live?: boolean;
};

export type Host = {
  id: string;
  name: string;
  bio: string;
  schedule: string;
  avatar: string;
  social?: string;
};

export const currentTrack: Track = {
  id: "1",
  title: "Midnight City",
  artist: "M83",
  album: "Hurry Up, We're Dreaming",
  cover: "https://picsum.photos/seed/midnight/400/400",
  duration: "4:03",
};

export const recentTracks: Track[] = [
  { id: "2", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", cover: "https://picsum.photos/seed/blinding/200/200", duration: "3:20" },
  { id: "3", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", cover: "https://picsum.photos/seed/levitating/200/200", duration: "3:23" },
  { id: "4", title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", cover: "https://picsum.photos/seed/save/200/200", duration: "3:35" },
  { id: "5", title: "Physical", artist: "Dua Lipa", album: "Future Nostalgia", cover: "https://picsum.photos/seed/physical/200/200", duration: "3:13" },
  { id: "6", title: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia", cover: "https://picsum.photos/seed/dont/200/200", duration: "3:03" },
];

export const schedule: Program[] = [
  { id: "p1", time: "06:00", endTime: "09:00", name: "Manhã Voxstream", host: "Carla Mendes", description: "O melhor para começar o dia com energia.", days: ["Seg", "Ter", "Qua", "Qui", "Sex"] },
  { id: "p2", time: "09:00", endTime: "12:00", name: "Ritmo do Dia", host: "Bruno Alves", description: "Hits nacionais e internacionais.", days: ["Seg", "Ter", "Qua", "Qui", "Sex"], live: true },
  { id: "p3", time: "12:00", endTime: "14:00", name: "Almoço Musical", host: "AutoDJ", description: "Playlist selecionada para o almoço.", days: ["Todos"] },
  { id: "p4", time: "14:00", endTime: "17:00", name: "Tarde Neon", host: "Larissa Rocha", description: "Eletrônica, synthwave e vibes urbanas.", days: ["Seg", "Ter", "Qua", "Qui", "Sex"] },
  { id: "p5", time: "17:00", endTime: "20:00", name: "Rush Hour", host: "DJ Kaio", description: "Set ao vivo para atravessar o trânsito.", days: ["Seg", "Ter", "Qua", "Qui", "Sex"] },
  { id: "p6", time: "20:00", endTime: "23:00", name: "Noite Voxstream", host: "Marina Costa", description: "Indie, alternativo e clássicos.", days: ["Todos"] },
  { id: "p7", time: "23:00", endTime: "06:00", name: "Madrugada AutoDJ", host: "AutoDJ", description: "Lounge & Chillout automático.", days: ["Todos"] },
];

export const hosts: Host[] = [
  { id: "h1", name: "Carla Mendes", bio: "Locutora há 12 anos, especialista em programas matinais.", schedule: "Seg-Sex 06h-09h", avatar: "https://i.pravatar.cc/200?img=47" },
  { id: "h2", name: "Bruno Alves", bio: "Voz principal do Ritmo do Dia.", schedule: "Seg-Sex 09h-12h", avatar: "https://i.pravatar.cc/200?img=12" },
  { id: "h3", name: "Larissa Rocha", bio: "Curadora de synthwave e eletrônica.", schedule: "Seg-Sex 14h-17h", avatar: "https://i.pravatar.cc/200?img=45" },
  { id: "h4", name: "DJ Kaio", bio: "Sets ao vivo com o melhor da eletrônica.", schedule: "Seg-Sex 17h-20h", avatar: "https://i.pravatar.cc/200?img=13" },
  { id: "h5", name: "Marina Costa", bio: "Indie, alternativo e discotecagem noturna.", schedule: "Todos os dias 20h-23h", avatar: "https://i.pravatar.cc/200?img=32" },
];

export const stats = {
  online: 1247,
  peak: 3891,
  bandwidth: 68,
  totalListeners24h: 18420,
  averageSession: "42min",
  countries: 14,
};

export const listenerHistory = [
  { time: "00h", listeners: 420 },
  { time: "03h", listeners: 380 },
  { time: "06h", listeners: 680 },
  { time: "09h", listeners: 1450 },
  { time: "12h", listeners: 2100 },
  { time: "15h", listeners: 1850 },
  { time: "18h", listeners: 2890 },
  { time: "21h", listeners: 3891 },
];

export const playlists = [
  { id: "pl1", name: "Pop Hits 2026", tracks: 128, duration: "8h 22min", active: true },
  { id: "pl2", name: "Lounge Madrugada", tracks: 84, duration: "5h 40min", active: true },
  { id: "pl3", name: "Rock Clássico", tracks: 156, duration: "10h 15min", active: false },
  { id: "pl4", name: "Sertanejo Universitário", tracks: 92, duration: "6h 12min", active: false },
];

export const streamConfig = {
  ip: "stream.voxstream.com.br",
  port: "8000",
  panelPassword: "vox-admin-2026",
  encoderPassword: "vx-enc-9K2mP4",
  mountpoint: "/live",
  bitrate: "128 kbps",
  format: "MP3",
  serverType: "Icecast 2.4",
};
