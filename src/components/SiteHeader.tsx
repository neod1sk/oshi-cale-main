import Link from "next/link";
import { Suspense } from "react";
import { HeaderNavLink } from "@/components/HeaderNavLink";
import { LanguageToggle } from "@/components/LanguageToggle";
import { t, type Lang } from "@/lib/i18n";

function LanguageToggleFallback({ lang }: { lang: Lang }) {
  return (
    <nav aria-label="Language" className="flex items-center gap-1">
      <Link
        href="/ja"
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          lang === "ja"
            ? "bg-zinc-900 text-white"
            : "text-zinc-700 hover:bg-zinc-900/5",
        ].join(" ")}
      >
        JP
      </Link>
      <Link
        href="/ko"
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          lang === "ko"
            ? "bg-zinc-900 text-white"
            : "text-zinc-700 hover:bg-zinc-900/5",
        ].join(" ")}
      >
        KR
      </Link>
    </nav>
  );
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const copy = t(lang);

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-black/5 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-5">
        <Link
          href={`/${lang}`}
          aria-label={lang === "ko" ? "홈으로 이동" : "トップページへ戻る"}
          className="block min-w-0 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
        >
          <div className="truncate text-sm font-semibold tracking-tight text-zinc-950">
            {copy.siteName}
          </div>
          <div className="truncate text-[11px] text-zinc-500">{copy.subtitle}</div>
        </Link>

        <div className="flex items-center gap-2">
          <HeaderNavLink lang={lang} />
          <Suspense fallback={<LanguageToggleFallback lang={lang} />}>
            <LanguageToggle lang={lang} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

