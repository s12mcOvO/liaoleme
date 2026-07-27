"use client";

import { motion, useMotionValue, useReducedMotion, animate } from "motion/react";
import { useState, type ReactNode } from "react";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- 转盘：整个产品的灵魂 ---------- */

const SEGMENTS = ["撸", "不撸", "撸", "不撸", "撸", "不撸", "撸", "不撸"];

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: 100 + r * Math.sin(a), y: 100 - r * Math.cos(a) };
}

function wedgePath(i: number) {
  const p0 = polar(i * 45, 88);
  const p1 = polar((i + 1) * 45, 88);
  return `M100,100 L${p0.x.toFixed(2)},${p0.y.toFixed(2)} A88,88 0 0 1 ${p1.x.toFixed(2)},${p1.y.toFixed(2)} Z`;
}

function Wheel() {
  const rotation = useMotionValue(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const k = Math.floor(Math.random() * 8);
    const label = SEGMENTS[k];
    const current = rotation.get();
    const currentMod = ((current % 360) + 360) % 360;
    const targetMod = 360 - (k * 45 + 22.5);
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;
    const total = current + 360 * 6 + delta;

    if (reduce) {
      rotation.set(total);
      setSpinning(false);
      setResult(label);
      return;
    }
    animate(rotation, total, {
      duration: 4,
      ease: [0.12, 0.75, 0.18, 1],
      onComplete: () => {
        setSpinning(false);
        setResult(label);
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* 指针 */}
        <div className="absolute left-1/2 -top-2 z-10 -translate-x-1/2">
          <svg width="28" height="24" viewBox="0 0 28 24" aria-hidden="true">
            <path d="M14 24 L0 0 L28 0 Z" fill="var(--foreground)" />
          </svg>
        </div>

        <motion.div
          style={{ rotate: rotation }}
          className={spinning ? "" : "cursor-pointer"}
          onClick={spin}
          role="button"
          aria-label="转动转盘，随机决定今天撸不撸"
        >
          <svg width="340" height="340" viewBox="0 0 200 200" className="block h-auto w-[280px] md:w-[340px]">
            {SEGMENTS.map((s, i) => {
              const light = i % 2 === 0;
              const labelPos = polar(i * 45 + 22.5, 58);
              return (
                <g key={i}>
                  <path
                    d={wedgePath(i)}
                    fill={light ? "var(--foreground)" : "#151515"}
                    stroke="var(--background)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={s.length > 1 ? 13 : 16}
                    fontWeight="700"
                    fill={light ? "var(--background)" : "var(--foreground)"}
                  >
                    {s}
                  </text>
                </g>
              );
            })}
            <circle cx="100" cy="100" r="27" fill="var(--background)" stroke="var(--foreground)" strokeWidth="1.5" />
            <text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="15"
              fontWeight="700"
              fill="var(--foreground)"
            >
              {spinning ? "…" : "转"}
            </text>
          </svg>
        </motion.div>
      </div>

      <div className="mt-6 h-8 text-center" aria-live="polite">
        {result ? (
          <p className="text-sm font-semibold tracking-wide">
            天意：今天<span className="mx-1 text-base font-bold">{result}</span>
          </p>
        ) : (
          <p className="text-sm text-muted">{spinning ? "命运转动中…" : "点一下，让转盘替你决定"}</p>
        )}
      </div>
      <p className="mt-1 text-xs text-muted/70">结果随机，后果自负。</p>
    </div>
  );
}

/* ---------- 数据 ---------- */

const features = [
  { num: "01", title: "每日转盘", desc: "撸还是不撸，纠结的时候交给转盘。转出来什么就是什么，别讨价还价。" },
  { num: "02", title: "时间门控", desc: "只有晚上特定时间才能打卡。想白天装没事、晚上补一张好人卡？没门。" },
  { num: "03", title: "热力图", desc: "一整年的记录画成格子，颜色越深说明你越能扛。空白格，自己体会。" },
  { num: "04", title: "每晚提醒", desc: "到点推送，准时问你今天怎么样了。比你自律，也比你诚实。" },
  { num: "05", title: "毒鸡汤", desc: "每天一句扎心语录。鼓励没用的人，需要的是被现实抽一巴掌。" },
  { num: "06", title: "开发者工具", desc: "日志、数据库状态都能看。想折腾的，随便折腾。" },
];

const steps = [
  { num: "1", title: "打开应用", desc: "不用注册，不用登录，数据只存在你自己手机上。" },
  { num: "2", title: "转转盘", desc: "让命运替你做决定，然后照做。" },
  { num: "3", title: "晚上打卡", desc: "时间门控开了，如实记录，热力图替你记住。" },
];

function HeatmapGrid() {
  const cells = [];
  const levels = [0.05, 0.18, 0.35, 0.6, 0.9];
  for (let i = 0; i < 364; i++) {
    const seed = (i * 7919 + 104729) % 97;
    const level = seed < 40 ? 0 : seed < 60 ? 1 : seed < 76 ? 2 : seed < 89 ? 3 : 4;
    cells.push(
      <div
        key={i}
        className="aspect-square"
        style={{ background: `rgba(242, 242, 240, ${levels[level]})` }}
      />
    );
  }
  return <div className="grid grid-cols-[repeat(52,1fr)] gap-px">{cells}</div>;
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
          <a href="#features" className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block">
            功能
          </a>
          <a href="#data" className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block">
            记录
          </a>
          <a
            href="https://github.com/aoye666/liaoleme/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 active:scale-[0.97]"
          >
            下载
          </a>
        </div>
      </nav>

      {/* Hero：转盘开场 */}
      <section className="grid min-h-[100dvh] items-center gap-14 px-6 pt-24 pb-16 md:px-10 lg:grid-cols-[1fr_auto] lg:gap-24 lg:px-16 xl:px-24">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            撸还是不撸，
            <br />
            交给转盘。
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg"
          >
            录了么（原名撸了么），一个一本正经记录你今天撸没撸的黑白打卡应用。
            转盘替你做决定，时间门控防止作弊，热力图替你记住每一天。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex items-center gap-4"
          >
            <a
              href="https://github.com/aoye666/liaoleme/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground px-7 py-3 text-sm font-bold text-background transition-opacity hover:opacity-80 active:scale-[0.97]"
            >
              下载 APK
            </a>
            <a
              href="https://github.com/aoye666/liaoleme"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-7 py-3 text-sm font-medium transition-colors hover:border-foreground"
            >
              源码
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Wheel />
        </motion.div>
      </section>

      <main id="main">
        {/* 功能：大字报式清单 */}
        <section id="features" className="border-t border-border px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              一本正经的<span className="text-muted">六个功能</span>
            </h2>
          </Reveal>
          <div className="mt-16">
            {features.map((f, i) => (
              <Reveal key={f.num} delay={i * 0.04}>
                <div className="group grid gap-3 border-t border-border py-8 transition-colors first:border-t-0 md:grid-cols-[100px_280px_1fr] md:items-baseline md:gap-8 md:py-10">
                  <span className="font-mono text-sm text-muted">{f.num}</span>
                  <h3 className="text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {f.title}
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-muted md:text-base">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 热力图 */}
        <section id="data" className="border-t border-border px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">你扛了多少天，</h2>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-muted md:text-4xl">格子一清二楚。</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-muted md:text-base">
              像 GitHub 贡献图一样，把一整年的记录画成矩阵。颜色越深，说明那天你守住了。全部存在本地 SQLite，只有你自己看得到。
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-14 overflow-x-auto">
            <HeatmapGrid />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span>没扛住</span>
              {[0.05, 0.18, 0.35, 0.6, 0.9].map((o) => (
                <span key={o} className="inline-block h-3 w-3" style={{ background: `rgba(242,242,240,${o})` }} />
              ))}
              <span>扛住了</span>
            </div>
          </Reveal>
        </section>

        {/* 三步 */}
        <section className="border-t border-border px-6 py-28 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">三步，开始记录。</h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div>
                  <span className="font-mono text-6xl font-bold text-border md:text-7xl">{s.num}</span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border px-6 py-36 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
                从今天开始，
                <br />
                数清楚自己的日子。
              </h2>
              <p className="mt-5 text-muted">免费，不用注册，数据只在你的手机上。</p>
              <a
                href="https://github.com/aoye666/liaoleme/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-block bg-foreground px-9 py-4 text-sm font-bold text-background transition-opacity hover:opacity-80 active:scale-[0.97]"
              >
                下载 Android APK
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="text-sm font-bold">录了么</span>
          <span className="text-xs text-muted">原名撸了么 · 记录你今天撸没撸</span>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a
              href="https://github.com/aoye666/liaoleme"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://github.com/aoye666/liaoleme/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Releases
            </a>
          </div>
          <span className="text-xs text-muted/60">&copy; 2025 aoye666 · MIT</span>
        </div>
      </footer>
    </div>
  );
}
