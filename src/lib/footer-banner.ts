import type { Lang } from "@/lib/i18n";

export type FooterBannerConfig = {
  imageUrl: string;
  linkUrl: string;
  alt: string;
};

// NOTE: フッターバナー（外部リンク）はここだけを差し替えればOKなように、URLを集約しています。
export const footerBannerConfigByLang: Record<Lang, FooterBannerConfig> = {
  ja: {
    imageUrl:
      "https://assets.st-note.com/img/1770787818-nq9wT6rolLp0CkSmhIFZzi58.png",
    linkUrl: "https://oshichecker2.vercel.app/ja",
    alt: "韓国地下アイドル診断 推しチェッカー",
  },
  ko: {
    imageUrl:
      "https://assets.st-note.com/img/1770787818-BHEhOT3azXFtRyP8JAbjMovC.png",
    linkUrl: "https://oshichecker2.vercel.app/ko",
    alt: "한국 지하아이돌 입문 진단 오시체커",
  },
} as const;

export function getFooterBannerConfig(lang: Lang): FooterBannerConfig {
  return footerBannerConfigByLang[lang] ?? footerBannerConfigByLang.ja;
}
