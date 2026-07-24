import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { initPwa } from "@/lib/pwa-register";
import { PlayerProvider } from "@/lib/player-context";
import { PersistentPlayer } from "@/components/PersistentPlayer";
import { PublicNav } from "@/components/PublicNav";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold neon-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Voltando para a sintonia principal…
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo saiu do ar</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tente novamente em instantes.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full px-6 py-2 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1a0b2e" },
      { title: "Voxstream — Tocando agora" },
      { name: "description", content: "Ouça a Voxstream Web Rádio ao vivo. Programação, pedidos e o melhor da música." },
      { name: "author", content: "Voxstream" },
      { property: "og:title", content: "Voxstream — Tocando agora" },
      { property: "og:description", content: "Ouça a Voxstream Web Rádio ao vivo. Programação, pedidos e o melhor da música." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Voxstream — Tocando agora" },
      { name: "twitter:description", content: "Ouça a Voxstream Web Rádio ao vivo. Programação, pedidos e o melhor da música." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6d33d2e1-4e0d-451e-9352-02cb7ba879f4/id-preview-6d1a386c--65e753d4-d3ce-42e5-9785-34e71df6c42b.lovable.app-1784924849915.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6d33d2e1-4e0d-451e-9352-02cb7ba879f4/id-preview-6d1a386c--65e753d4-d3ce-42e5-9785-34e71df6c42b.lovable.app-1784924849915.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    initPwa();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        {!isAdmin && <PublicNav />}
        <main className={isAdmin ? "" : "pb-40 md:pb-28"}>
          <Outlet />
        </main>
        {!isAdmin && <PersistentPlayer />}
        <Toaster theme="dark" />
      </PlayerProvider>
    </QueryClientProvider>
  );
}
