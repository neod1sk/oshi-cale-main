import type { Lang } from "@/lib/i18n";

function buildBirthdayPostText(opts: {
  lang: Lang;
  idolName: string;
  idolHashtag?: string;
}): string {
  const siteTag = opts.lang === "ko" ? "#오시캘" : "#推しカレ";
  const siteLine =
    opts.lang === "ko"
      ? "▶ #지하아이돌 생일 캘린더 「오시캘」\nhttps://oshi-cale-main.vercel.app/ko"
      : "▶ #韓国地下アイドル 誕生日カレンダー「推しカレ」\nhttps://oshi-cale-main.vercel.app/ja";
  const head =
    opts.lang === "ko"
      ? `오늘은 ${opts.idolName}님의 생일🎂\n다 같이 축하해요💖`
      : `今日は${opts.idolName}さんの誕生日🎂\nみんなでお祝いしよう💖`;
  const tail = siteTag;
  return `${head}\n\n${siteLine}\n\n${tail}`;
}

export function buildXIntentUrl(opts: {
  text: string;
  hashtags?: string[];
  url?: string;
}): string {
  const url = new URL("https://x.com/intent/tweet");
  url.searchParams.set("text", opts.text);
  if (opts.hashtags?.length) url.searchParams.set("hashtags", opts.hashtags.join(","));
  if (opts.url) url.searchParams.set("url", opts.url);
  return url.toString();
}

export function buildBirthdayXIntentUrl(opts: {
  lang: Lang;
  idolName: string;
  idolHashtag?: string;
  xUrl?: string;
  sourceUrl?: string;
}): string {
  const text = buildBirthdayPostText({
    lang: opts.lang,
    idolName: opts.idolName,
    idolHashtag: opts.idolHashtag,
  });
  return buildXIntentUrl({ text });
}

export function buildDetailHbdXIntentUrl(opts: {
  lang: Lang;
  idolName: string;
  idolHashtag?: string;
  xUrl?: string;
  sourceUrl?: string;
}): string {
  const text = buildBirthdayPostText({
    lang: opts.lang,
    idolName: opts.idolName,
    idolHashtag: opts.idolHashtag,
  });
  return buildXIntentUrl({ text });
}

