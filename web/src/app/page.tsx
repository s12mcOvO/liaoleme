"use client";

import { motion, useMotionValue, useReducedMotion, animate } from "motion/react";
import { useState, useEffect, type ReactNode } from "react";
import {
  RevealUp,
  StaggerGroup,
  StaggerItem,
  HeroReveal,
} from "@/components/motion";

/* ---------- 数据 ---------- */

const features = [
  { num: "01", title: "每日转盘", desc: "抉择的瞬间，交给转盘。转出什么就是什么，无需多言。" },
  { num: "02", title: "时间门控", desc: "只在特定时刻开放记录。想提前预知结果？时机未到。" },
  { num: "03", title: "记忆矩阵", desc: "一整年的轨迹，化作格子图谱。深浅之间，看见自己的轨迹。" },
  { num: "04", title: "夜间叩问", desc: "到点轻推，准时问你今天的选择。比你更懂你的节奏。" },
  { num: "05", title: "清醒之语", desc: "每日一句醒世之言。在放纵边缘，拉你一把。" },
  { num: "06", title: "底层透明", desc: "数据库状态、日志一览无余。想看清本质，随时可以。" },
];

const steps = [
  { num: "1", title: "打开应用", desc: "无需注册，无需登录，数据只属于你的设备。" },
  { num: "2", title: "转转盘", desc: "让命运替你做决定，然后照做。" },
  { num: "3", title: "记录选择", desc: "时间到了，如实记录。记忆矩阵替你记住每一笔。" },
];

// 84 天模拟记录 (12 周)
function buildMockRecords() {
  const records: Record<string, "守心" | "放逐"> = {};
  const now = new Date();
  for (let i = 0; i < 84; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    // ~55% 守心, ~25% 放逐, ~20% 无记录
    const seed = (i * 7919 + 104729) % 97;
    if (seed < 55) records[key] = "守心";
    else if (seed < 80) records[key] = "放逐";
  }
  return records;
}

const mockRecords = buildMockRecords();

function HeatmapGrid() {
  const now = new Date();
  const daysToShow = 84;
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - daysToShow + 1);

  const startWeekday = (startDate.getDay() + 6) % 7; // 0=Mon
  const totalCells = startWeekday + daysToShow;
  const rowCount = Math.ceil(totalCells / 7);

  const weekLabels = ["一", "二", "三", "四", "五", "六", "日"];

  const cellColor = (record: "守心" | "放逐" | undefined) => {
    if (!record) return "#27272A"; // surfaceElevated
    if (record === "守心") return "#34D399"; // accent (emerald-400)
    return "#3F3F46"; // border (zinc-700)
  };

  const rows: React.ReactNode[] = [];

  // 星期标签行
  rows.push(
    <div key="labels" className="flex">
      <div style={{ width: 20 }} />
      {weekLabels.map((d) => (
        <div
          key={d}
          className="flex flex-1 items-center justify-center text-[10px] text-neutral-500"
        >
          {d}
        </div>
      ))}
    </div>,
  );

  for (let row = 0; row < rowCount; row++) {
    const cells: React.ReactNode[] = [];
    for (let col = 0; col < 7; col++) {
      const index = row * 7 + col - startWeekday;
      if (index < 0 || index >= daysToShow) {
        cells.push(<div key={col} style={{ width: 14, height: 14, margin: 2 }} />);
      } else {
        const d = new Date(startDate);
        d.setDate(d.getDate() + index);
        const key = d.toISOString().slice(0, 10);
        const record = mockRecords[key];
        cells.push(
          <div
            key={col}
            title={`${key}: ${record || "无记录"}`}
            className="transition-all duration-200 hover:brightness-125"
            style={{
              width: 14,
              height: 14,
              margin: 2,
              borderRadius: 2,
              background: cellColor(record),
            }}
          />,
        );
      }
    }
    rows.push(
      <div key={row} className="flex">
        <div style={{ width: 20 }} />
        {cells}
      </div>,
    );
  }

  return <div className="inline-flex flex-col gap-[2px]">{rows}</div>;
}

/* ---------- App 图标 ---------- */

function AppIcon({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#10b981" />
      <text x="64" y="88" fontFamily="system-ui, -apple-system, sans-serif" fontSize="72" fontWeight="800" fill="#fff" textAnchor="middle">L</text>
    </svg>
  );
}

/* ---------- 手机演示界面 ---------- */

function PhoneDemo() {
  const [checked, setChecked] = useState<"放逐" | "守心" | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const wheelRotation = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (checked && !spinning) {
      const t = setTimeout(() => setShowResult(true), 100);
      return () => clearTimeout(t);
    }
    setShowResult(false);
  }, [checked, spinning]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setChecked(null);
    setShowResult(false);
    const k = Math.floor(Math.random() * 2);
    const labels: ("放逐" | "守心")[] = ["放逐", "守心"];
    const label = labels[k];
    const current = wheelRotation.get();
    const currentMod = ((current % 360) + 360) % 360;
    const targetMod = 360 - (k * 180 + 90);
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;
    const total = current + 360 * 5 + delta;

    if (reduce) {
      wheelRotation.set(total);
      setSpinning(false);
      setChecked(label);
      return;
    }
    animate(wheelRotation, total, {
      duration: 3.5,
      ease: [0.12, 0.75, 0.18, 1],
      onComplete: () => {
        setSpinning(false);
        setChecked(label);
      },
    });
  };

  // ---- SVG 图标组件 ----
  const SignalIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-neutral-800">
      <rect x="1" y="10" width="2.5" height="5" rx="0.5" />
      <rect x="4.5" y="7.5" width="2.5" height="7.5" rx="0.5" />
      <rect x="8" y="5" width="2.5" height="10" rx="0.5" />
      <rect x="11.5" y="2.5" width="2.5" height="12.5" rx="0.5" />
    </svg>
  );

  const WifiIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-neutral-800">
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );

  const BatteryIcon = () => (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      <rect x="0.75" y="0.75" width="14.5" height="10.5" rx="2.25" stroke="currentColor" strokeWidth="1.2" className="text-neutral-800" />
      <rect x="2" y="2" width="11" height="8" rx="1" fill="currentColor" className="text-neutral-800" />
      <rect x="15" y="3.75" width="1.5" height="4.5" rx="0.5" fill="currentColor" className="text-neutral-800" />
    </svg>
  );

  return (
    <div className="mx-auto w-[300px]">
      {/* 手机外壳 */}
      <div className="rounded-[2.5rem] border-[6px] border-neutral-700 bg-neutral-100 shadow-2xl overflow-hidden">
        {/* 状态栏 */}
        <div className="flex items-center justify-between bg-white px-6 py-2.5 text-[11px] font-semibold text-neutral-800">
          <span>18:44</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* 顶部导航 */}
        <div className="flex items-center justify-between bg-white px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <span className="text-base font-extrabold text-white">L</span>
            </div>
            <span className="text-[15px] font-bold text-neutral-800">录了么</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 4 4-6"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
        </div>

        {/* 每日一言 */}
        <div className="mx-4 mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><path d="M12 3L14 9L21 10L15 15L17 21L12 18L7 21L9 15L3 10L10 9Z"/></svg>
            </div>
            <span className="text-xs font-semibold text-emerald-500">每日一言</span>
          </div>
          <p className="mt-3 text-[15px] font-medium leading-relaxed text-neutral-700">
            一天不撸，十天不慌
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-neutral-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span>本地</span>
          </div>
        </div>

        {/* 今日打卡 */}
        <div className="px-4 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-800">今日打卡</span>
            <div className="h-[3px] w-6 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* 转盘 */}
        <div className="flex flex-col items-center pt-2 pb-4">
          <div className="relative">
            {/* 指针 */}
            <div className="absolute left-1/2 -top-3 z-10 -translate-x-1/2">
              <svg width="24" height="20" viewBox="0 0 24 20">
                <path d="M12 20 L0 0 L24 0 Z" fill="#a3a3a3" />
              </svg>
            </div>
            <motion.div
              style={{ rotate: wheelRotation }}
              className={spinning ? "" : "cursor-pointer"}
              onClick={spin}
            >
              <svg width="220" height="220" viewBox="0 0 200 200" className="block h-auto w-[200px]">
                <circle cx="100" cy="100" r="90" fill="#e5e5e5" />
                <path d="M100,100 L100,10 A90,90 0 0,1 100,190 Z" fill="#d4d4d4" />
                <text x="68" y="100" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="700" fill="#737373">守心</text>
                <text x="135" y="100" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="700" fill="#a3a3a3">放逐</text>
                <circle cx="100" cy="100" r="24" fill="white" stroke="#e5e5e5" strokeWidth="1.5" />
                <text x="100" y="100" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill="#a3a3a3">
                  {spinning ? "…" : "转"}
                </text>
              </svg>
            </motion.div>
          </div>
          <p className="mt-3 text-xs text-neutral-300">今日已打卡</p>
          {showResult && checked && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
              <span className="text-xs font-medium text-emerald-600">已记录: {checked}</span>
            </motion.div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-3 px-4 pb-5">
          <button
            onClick={() => setChecked("守心")}
            className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${checked === "守心" ? "bg-emerald-200 text-emerald-700 shadow-sm shadow-emerald-200/50" : "bg-emerald-100 text-emerald-600 active:scale-[0.97]"}`}
          >
            守心
          </button>
          <button
            onClick={() => setChecked("放逐")}
            className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${checked === "放逐" ? "bg-white text-neutral-800 shadow-sm shadow-neutral-200" : "bg-white text-neutral-400 active:scale-[0.97]"}`}
          >
            放逐
          </button>
        </div>

        {/* 次数记录 */}
        <div className="px-5 pb-5">
          <span className="text-[11px] text-neutral-300">次数记录</span>
          <div className="mt-1 h-1 w-full rounded-full bg-neutral-100" />
        </div>
      </div>
    </div>
  );
}

/* ---------- ScrollToTop ---------- */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-foreground active:scale-95"
      aria-label="回到顶部"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg>
    </motion.button>
  );
}

/* ---------- 页面 ---------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        跳到主要内容
      </a>

      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/90 px-6 backdrop-blur-sm md:px-10">
        <span className="text-sm font-bold tracking-tight">录了么</span>
        <div className="flex items-center gap-6">
          <a href="#features" className="nav-link hidden text-sm text-muted transition-colors hover:text-foreground sm:block">
            功能
          </a>
          <a href="#data" className="nav-link hidden text-sm text-muted transition-colors hover:text-foreground sm:block">
            记录
          </a>
          <a
            href="https://github.com/aoye666/liaoleme/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 active:scale-[0.97]"
          >
            获取
          </a>
        </div>
      </nav>

      <main id="main">
        {/* Hero：图标 + 文案 */}
        <section className="flex min-h-[100dvh] items-center justify-center px-6 pt-24 pb-16 md:px-10 lg:px-16 xl:px-24">
          <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* 左侧文案 */}
            <div>
              <HeroReveal>
                <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                  一念放逐，
                  <br />
                  一念守心。
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.12}>
                <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
                  一念之间，记录你的每日抉择。
                  转盘替你做决定，时间门控守护真实，记忆矩阵替你记住每一日。
                </p>
              </HeroReveal>
              <HeroReveal delay={0.24}>
                <div className="mt-9 flex items-center gap-4">
                  <a
                    href="https://github.com/aoye666/liaoleme/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-foreground px-7 py-3 text-sm font-bold text-background transition-opacity hover:opacity-80 active:scale-[0.97]"
                  >
                    获取 APK
                  </a>
                  <a
                    href="https://github.com/aoye666/liaoleme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border px-7 py-3 text-sm font-medium transition-colors hover:border-foreground"
                  >
                    源码
                  </a>
                </div>
              </HeroReveal>
            </div>

            {/* 右侧 App 图标 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* 浅绿浮起底光 */}
                <div className="absolute inset-0 -m-8 rounded-[2.5rem] bg-emerald-500/10 blur-3xl" />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AppIcon size={160} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 演示区域 */}
        <section className="border-t border-border px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <RevealUp>
            <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
              打开看看
            </h2>
            <p className="mt-3 text-center text-muted">简洁到无需说明。</p>
          </RevealUp>
          <RevealUp delay={0.15} className="mt-16">
            <PhoneDemo />
          </RevealUp>
        </section>

        {/* 功能：大字报式清单 */}
        <section id="features" className="border-t border-border px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <RevealUp>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              一本正经的<span className="text-muted">六个功能</span>
            </h2>
          </RevealUp>
          <div className="mt-16">
            <StaggerGroup>
              {features.map((f) => (
                <StaggerItem key={f.num}>
                  <div className="group relative grid gap-3 border-t border-border py-8 transition-colors first:border-t-0 md:grid-cols-[100px_280px_1fr] md:items-baseline md:gap-8 md:py-10">
                    {/* 左侧 emerald 装饰线 */}
                    <div className="absolute inset-y-0 left-0 w-0 bg-emerald-500/20 transition-all duration-500 group-hover:w-full md:w-0 md:group-hover:w-full" />
                    <span className="relative font-mono text-sm text-muted">{f.num}</span>
                    <h3 className="relative text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                      {f.title}
                    </h3>
                    <p className="relative max-w-[52ch] text-sm leading-relaxed text-muted md:text-base">{f.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* 热力图 */}
        <section id="data" className="border-t border-border px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <RevealUp>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">轨迹深浅，</h2>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-muted md:text-4xl">一目了然。</p>
          </RevealUp>
          <RevealUp delay={0.1}>
            <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-muted md:text-base">
              像年轮一样，把一整年的选择画成矩阵。深浅交织，轨迹自有答案。全部存在本地，只有你能看见。
            </p>
          </RevealUp>
          <RevealUp delay={0.15} className="mt-14 overflow-x-auto">
            <HeatmapGrid />
          </RevealUp>
          <RevealUp delay={0.2}>
            <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
              <span>放逐</span>
              <span className="inline-block h-3 w-3 rounded-[2px]" style={{ background: "#3F3F46" }} />
              <span className="inline-block h-3 w-3 rounded-[2px]" style={{ background: "#34D399" }} />
              <span>守心</span>
            </div>
          </RevealUp>
        </section>

        {/* 三步 */}
        <section className="border-t border-border px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <RevealUp>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">三步，开始记录。</h2>
          </RevealUp>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            <StaggerGroup>
              {steps.map((s) => (
                <StaggerItem key={s.num}>
                  <div>
                    <span className="font-mono text-6xl font-bold text-emerald-500/40 md:text-7xl">{s.num}</span>
                    <h3 className="mt-4 text-xl font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border px-6 py-36 md:px-10 lg:px-16 xl:px-24">
          <RevealUp>
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
                从今天开始，
                <br />
                看清自己的轨迹。
              </h2>
              <p className="mt-5 text-muted">无需注册，数据只属于你。</p>
              <a
                href="https://github.com/aoye666/liaoleme/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-block bg-foreground px-9 py-4 text-sm font-bold text-background transition-all hover:opacity-80 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] active:scale-[0.97]"
              >
                获取 Android APK
              </a>
            </div>
          </RevealUp>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="text-sm font-bold">录了么</span>
          <span className="text-xs text-muted">原名撸了么 · 记录你的每日抉择</span>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a
              href="https://github.com/aoye666/liaoleme"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link relative transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://github.com/aoye666/liaoleme/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link relative transition-colors hover:text-foreground"
            >
              Releases
            </a>
          </div>
          <span className="text-xs text-muted/60">&copy; 2025 aoye666 · MIT</span>
        </div>
      </footer>

      {/* ScrollToTop */}
      <ScrollToTop />
    </div>
  );
}
