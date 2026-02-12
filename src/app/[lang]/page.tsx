import { HomeHeroToday } from "@/components/HomeHeroToday";
import { isLang, type Lang } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { fetchIdols } from "@/lib/sheets";
import { attachDiffDays, pickToday, sortBySoonest, type IdolWithDiff } from "@/lib/birthday-filters";
import { t } from "@/lib/i18n";
import { daysSinceBirthdayJst } from "@/lib/birthday";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  if (!isLang(langParam)) notFound();
  const lang: Lang = langParam;

  let error: string | null = null;
  let todayList: ReturnType<typeof pickToday> = [];
  let yesterdayList: IdolWithDiff[] = [];
  let next30ListAll: ReturnType<typeof pickToday> = [];
  let allList: IdolWithDiff[] = [];

  try {
    const idols = await fetchIdols();
    // Optional: テスト用に日付を固定（JST基準）
    // 例: DEBUG_TODAY_JST=2026-02-10
    const debug = process.env.DEBUG_TODAY_JST;
    const now = debug ? new Date(`${debug}T00:00:00+09:00`) : new Date();

    const withDiff = sortBySoonest(attachDiffDays(idols, now));
    allList = withDiff;
    todayList = pickToday(withDiff);
    next30ListAll = withDiff.filter((x) => x.diffDays <= 30);

    // 直近3日（当日=0, 昨日=1, 一昨日=2）に誕生日を迎えたアイドル（JST基準）
    // 年跨ぎ（12月→1月）や 2/29（非うるう年は 3/1 扱い）も birthday.ts 側の実装で吸収する
    yesterdayList = idols
      .map((idol) => ({ idol, since: daysSinceBirthdayJst(idol.birthday_mmdd, now) }))
      .filter(({ since }) => Number.isFinite(since) && since >= 0 && since <= 2)
      .map(({ idol, since }) => ({ ...idol, diffDays: -since }))
      // 新しい順（今日→昨日→一昨日）
      .sort((a, b) => {
        if (a.diffDays !== b.diffDays) return b.diffDays - a.diffDays;
        const ak = (a.slug ?? a.id ?? "").toString();
        const bk = (b.slug ?? b.id ?? "").toString();
        return ak.localeCompare(bk);
      });
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const next30 = next30ListAll;

  return (
    <main>
      <HomeHeroToday
        lang={lang}
        allIdols={allList}
        todayIdols={todayList}
        yesterdayIdols={yesterdayList}
        next30Idols={next30}
        error={error}
      />
    </main>
  );
}

