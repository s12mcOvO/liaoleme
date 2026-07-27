"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

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
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroEntry({
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
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  { title: "每日转盘", desc: "随机生成行动指令，告别选择困难。让命运替你决定今天该做什么。", wide: true },
  { title: "时间门控", desc: "仅在夜间特定时段开放打卡，从机制上杜绝补卡和虚假记录。", wide: false },
  { title: "热力图统计", desc: "GitHub 风格的年度贡献矩阵，用颜色深浅呈现坚持轨迹。", wide: false },
  { title: "每晚提醒", desc: "固定时间推送通知，帮你建立稳定的打卡生物钟。", wide: false },
  { title: "毒鸡汤激励", desc: "接入 Hitokoto 接口，每天一句扎心语录鞭策你前进。", wide: false },
  { title: "开发者工具", desc: "内置日志查看器和数据库面板，方便排查和调试。", wide: true },
];

const steps = [
  { num: "1", title: "打开应用", desc: "无需注册，无需登录，打开即用。所有数据存储在本地。" },
  { num: "2", title: "转动转盘", desc: "让随机转盘替你做出选择，执行它，等待夜间打卡窗口。" },
  { num: "3", title: "回顾轨迹", desc: "在热力图中看到自己的坚持，用数据证明自律的力量。" },
];

const techStack = [
  "Flutter", "SQLite", "fl_chart", "Hitokoto API",
  "shared_preferences", "local_notifications",
];

function HeatmapGrid() {
  const cells = [];
  for (let i = 0; i < 364; i++) {
    const seed = (i * 7919 + 104729) % 97;
    const level = seed < 35 ? 0 : seed < 55 ? 1 : seed < 72 ? 2 : seed < 87 ? 3 : 4;
    const colors = [
      "var(--surface)",
      "rgba(212, 135, 77, 0.2)",
      "rgba(212, 135, 77, 0.4)",
      "rgba(212, 135, 77, 0.65)",
      "rgba(212, 135, 77, 0.9)",
    ];
    cells.push(
      <div
        key={i}
        className="aspect-square"
        style={{ background: colors[level] }}
      />
    );
  }
  return (
    <div className="grid grid-cols-[repeat(52,1fr)] gap-px">
      {cells}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
      >
        跳到主要内容
      </a>

      {/* Nav - 64px, single line */}
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur-sm md:px-10">
        <span className="text-sm font-semibold tracking-tight">录了么</span>
        <div className="flex items-center gap-6">
          <a href="#features" className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block">
            功能
          </a>
          <a href="#how" className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block">
            使用
          </a>
          <a
            href="https://github.com/aoye666/liaoleme/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform active:scale-[0.97]"
          >
            下载
          </a>
        </div>
      </nav>

      {/* Hero - asymmetric split, left-aligned */}
      <section className="grid min-h-[100dvh] items-center gap-12 px-6 pt-24 pb-16 md:px-10 lg:grid-cols-[1fr_0.7fr] lg:gap-20 lg:px-16 xl:px-24">
        <div>
          <HeroEntry>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              每天记录一次，
              <br />
              证明你活过。
            </h1>
          </HeroEntry>
          <HeroEntry delay={0.12}>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
              转盘决定行动，时间门控杜绝作弊，热力图见证坚持。开源免费，无需注册。
            </p>
          </HeroEntry>
          <HeroEntry delay={0.24}>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://github.com/aoye666/liaoleme/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-px active:scale-[0.97]"
              >
                下载 APK
              </a>
              <a
                href="https://github.com/aoye666/liaoleme"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-muted"
              >
                源码
              </a>
            </div>
          </HeroEntry>
        </div>
        <HeroEntry delay={0.2} className="hidden lg:block">
          <img
            src="/images/hero.png"
            alt="一本打开的笔记本和一支笔，晨光在桌面投下几何阴影"
            className="h-auto w-full object-cover"
            loading="eager"
          />
        </HeroEntry>
      </section>

      <main id="main">
        {/* Features - bento grid, asymmetric */}
        <section id="features" className="border-t border-border px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">功能</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 0.05}
                className={f.wide ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <div className={`h-full bg-background p-8 transition-colors hover:bg-surface ${f.wide && i === 0 ? "bg-surface" : ""}`}>
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How it works - vertical stack, full-width */}
        <section id="how" className="border-t border-border px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">三步开始</h2>
          </Reveal>
          <div className="mt-12 space-y-0 divide-y divide-border">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="grid gap-4 py-8 md:grid-cols-[80px_1fr] md:gap-8">
                  <span className="font-mono text-3xl font-bold text-border">{s.num}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-muted">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Data - full-width heatmap with text above */}
        <section className="border-t border-border px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">数据不会说谎</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-muted">
              借鉴 GitHub 贡献图的可视化方式，用颜色深浅记录每一天的坚持。所有数据存储在本地 SQLite 中，完全属于你。
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-12 overflow-x-auto">
            <HeatmapGrid />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span>少</span>
              <span className="inline-block h-3 w-3" style={{ background: "var(--surface)" }} />
              <span className="inline-block h-3 w-3" style={{ background: "rgba(212,135,77,0.2)" }} />
              <span className="inline-block h-3 w-3" style={{ background: "rgba(212,135,77,0.4)" }} />
              <span className="inline-block h-3 w-3" style={{ background: "rgba(212,135,77,0.65)" }} />
              <span className="inline-block h-3 w-3" style={{ background: "rgba(212,135,77,0.9)" }} />
              <span>多</span>
            </div>
          </Reveal>
        </section>

        {/* Tech - horizontal scroll-snap */}
        <section className="border-t border-border px-6 py-24 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">技术栈</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="shrink-0 border border-border px-5 py-2.5 font-mono text-sm text-muted transition-colors hover:border-muted hover:text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CTA - left-aligned, inline */}
        <section className="border-t border-border px-6 py-32 md:px-10 lg:px-16 xl:px-24">
          <Reveal>
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                今天就开始。
              </h2>
              <p className="mt-4 text-muted">
                免注册，纯本地，MIT 开源。下载 APK，三分钟上手。
              </p>
              <a
                href="https://github.com/aoye666/liaoleme/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block bg-accent px-8 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-px active:scale-[0.97]"
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
          <span className="text-sm text-muted">录了么</span>
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
          <span className="text-xs text-muted/60">
            &copy; 2025 aoye666. MIT License.
          </span>
        </div>
      </footer>
    </div>
  );
}
