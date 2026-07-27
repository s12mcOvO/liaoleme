"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  HeroReveal,
  RevealUp,
  RevealScale,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion";
import { Icon, type IconName } from "@/components/icons";

const features: { icon: IconName; title: string; desc: string }[] = [
  { icon: "wheel", title: "每日转盘", desc: "随机生成行动指令，告别选择困难，让命运替你决定今天该做什么。" },
  { icon: "lock", title: "时间门控", desc: "仅在夜间特定时段开放打卡，从机制上杜绝补卡和虚假记录。" },
  { icon: "chart", title: "热力图统计", desc: "GitHub 风格的年度贡献矩阵，用颜色深浅直观呈现你的坚持轨迹。" },
  { icon: "bell", title: "每晚提醒", desc: "固定时间推送通知，像闹钟一样帮你建立稳定的打卡生物钟。" },
  { icon: "quote", title: "毒鸡汤激励", desc: "接入 Hitokoto 接口，每天一句扎心语录，用现实鞭策你前进。" },
  { icon: "bug", title: "开发者工具", desc: "内置日志查看器和数据库状态面板，方便排查问题和调试应用。" },
];

const techStack = [
  { name: "Flutter", desc: "跨平台 UI 框架" },
  { name: "SQLite", desc: "本地数据持久化" },
  { name: "fl_chart", desc: "数据可视化图表" },
  { name: "Hitokoto API", desc: "一言文本服务" },
  { name: "shared_preferences", desc: "轻量键值存储" },
  { name: "local_notifications", desc: "系统级通知调度" },
];

const steps = [
  { num: "01", title: "打开应用", desc: "无需注册，无需登录，打开即用。所有数据存储在本地。" },
  { num: "02", title: "转动转盘", desc: "让随机转盘替你做出今天的选择，执行它，然后等待夜间打卡。" },
  { num: "03", title: "回顾轨迹", desc: "在热力图中看到自己的坚持，用数据证明自律的力量。" },
];

function HeatmapGrid() {
  const cells = [];
  for (let i = 0; i < 371; i++) {
    const seed = (i * 7919 + 104729) % 97;
    const level = seed < 30 ? 0 : seed < 50 ? 1 : seed < 70 ? 2 : seed < 85 ? 3 : 4;
    const opacity = level === 0 ? 0.06 : level * 0.22;
    cells.push(
      <div
        key={i}
        className="w-[10px] h-[10px] rounded-[2px]"
        style={{
          background:
            level === 0
              ? "rgba(255,255,255,0.06)"
              : `rgba(59, 130, 246, ${opacity})`,
        }}
      />
    );
  }
  return <div className="grid grid-cols-[repeat(53,10px)] gap-[3px]">{cells}</div>;
}

function DeviceMockup() {
  return (
    <div className="relative mx-auto w-[280px]">
      <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-b from-blue-500/20 to-cyan-500/10 blur-2xl" />
      <div className="relative rounded-[36px] border border-white/10 bg-zinc-900 p-3 shadow-2xl shadow-blue-500/10">
        <div className="rounded-[28px] bg-black p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-medium text-zinc-400">录了么</span>
            <span className="text-[10px] text-zinc-600 font-mono">21:47</span>
          </div>
          <div className="text-center mb-6">
            <p className="text-[11px] text-zinc-500 mb-2">今日转盘结果</p>
            <div className="relative w-32 h-32 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/30" />
              <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #3b82f6, #06b6d4, #3b82f6)",
                    opacity: 0.15,
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">跑步</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-8 rounded-lg bg-blue-500/90 flex items-center justify-center">
              <span className="text-xs font-medium text-white">完成打卡</span>
            </div>
            <div className="h-8 rounded-lg border border-white/10 flex items-center justify-center">
              <span className="text-xs text-zinc-400">查看统计</span>
            </div>
          </div>
          <p className="text-center text-[10px] text-zinc-600 italic">
            &ldquo;你只是看起来很努力。&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <div className="noise-overlay min-h-screen bg-background text-foreground">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        跳到主要内容
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <span className="text-sm font-bold text-white">录</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">录了么</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-zinc-400 transition-colors hover:text-white">功能</a>
            <a href="#how" className="text-sm text-zinc-400 transition-colors hover:text-white">使用方式</a>
            <a href="#tech" className="text-sm text-zinc-400 transition-colors hover:text-white">技术栈</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/aoye666/liaoleme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <Icon name="github" className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://github.com/aoye666/liaoleme/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-lg px-4 py-2 text-sm font-medium"
            >
              下载 APK
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
        {/* Background elements */}
        <div className="grid-pattern absolute inset-0" />
        <div className="orb h-[500px] w-[500px] -top-40 -right-40 bg-blue-600/30" style={{ animationDelay: "0s" }} />
        <div className="orb h-[400px] w-[400px] bottom-0 -left-40 bg-cyan-600/20" style={{ animationDelay: "-3s" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center">
          {/* Left: Copy */}
          <div>
            <HeroReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-zinc-400">v1.2.2 已发布，开源免费</span>
              </div>
            </HeroReveal>

            <HeroReveal delay={0.1}>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                用黑白的方式
                <br />
                <span className="gradient-text">记录你的自律</span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.2}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
                每日转盘决定行动，时间门控杜绝作弊，热力图见证坚持。Flutter 构建，纯本地存储，无需注册。
              </p>
            </HeroReveal>

            <HeroReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/aoye666/liaoleme/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
                >
                  <Icon name="download" className="h-4 w-4" />
                  免费下载
                </a>
                <a
                  href="https://github.com/aoye666/liaoleme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
                >
                  <Icon name="github" className="h-4 w-4" />
                  查看源码
                </a>
              </div>
            </HeroReveal>

            <HeroReveal delay={0.4}>
              <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-zinc-500">开源免费</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-zinc-500">需要注册</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">MIT</p>
                  <p className="text-xs text-zinc-500">开源协议</p>
                </div>
              </div>
            </HeroReveal>
          </div>

          {/* Right: Device mockup */}
          <HeroReveal delay={0.3} className="hidden lg:block">
            <DeviceMockup />
          </HeroReveal>
        </div>
      </section>

      <main id="main">
        {/* Features - Bento Grid */}
        <section id="features" className="relative py-32">
          <div className="mx-auto max-w-6xl px-6">
            <RevealUp>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                为自律而生的<span className="gradient-text">六大能力</span>
              </h2>
            </RevealUp>
            <RevealUp delay={0.1}>
              <p className="mt-4 max-w-lg text-zinc-400">
                每一个功能都围绕一个目标：让你真正坚持下去。
              </p>
            </RevealUp>

            <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <StaggerItem
                  key={f.title}
                  className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
                >
                  <div className="glass-card group h-full rounded-2xl p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                      <Icon name={f.icon} className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="relative py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6">
            <RevealUp>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                三步开始
              </h2>
            </RevealUp>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {steps.map((s, i) => (
                <RevealUp key={s.num} delay={i * 0.1}>
                  <div className="relative">
                    <span className="font-mono text-5xl font-bold text-white/5">{s.num}</span>
                    <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                    {i < 2 && (
                      <div className="absolute top-8 -right-4 hidden h-px w-8 bg-gradient-to-r from-white/20 to-transparent md:block" />
                    )}
                  </div>
                </RevealUp>
              ))}
            </div>
          </div>
        </section>

        {/* Heatmap / Data section */}
        <section className="py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <RevealScale>
                <div className="glass-card rounded-2xl p-8 overflow-x-auto">
                  <p className="mb-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">年度打卡热力图</p>
                  <HeatmapGrid />
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-600">
                    <span>少</span>
                    <div className="h-2.5 w-2.5 rounded-[2px] bg-white/5" />
                    <div className="h-2.5 w-2.5 rounded-[2px] bg-blue-500/22" />
                    <div className="h-2.5 w-2.5 rounded-[2px] bg-blue-500/44" />
                    <div className="h-2.5 w-2.5 rounded-[2px] bg-blue-500/66" />
                    <div className="h-2.5 w-2.5 rounded-[2px] bg-blue-500/88" />
                    <span>多</span>
                  </div>
                </div>
              </RevealScale>

              <div>
                <RevealUp>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    数据不会说谎
                  </h2>
                </RevealUp>
                <RevealUp delay={0.1}>
                  <p className="mt-4 text-zinc-400 leading-relaxed">
                    借鉴 GitHub 贡献图的可视化方式，用颜色深浅记录每一天的坚持。无需联网，所有数据存储在本地 SQLite 数据库中，完全属于你。
                  </p>
                </RevealUp>
                <RevealUp delay={0.2}>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <p className="text-xl font-bold gradient-text">365 天</p>
                      <p className="mt-1 text-xs text-zinc-500">年度完整记录</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <p className="text-xl font-bold gradient-text">本地存储</p>
                      <p className="mt-1 text-xs text-zinc-500">数据完全私有</p>
                    </div>
                  </div>
                </RevealUp>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="py-32">
          <div className="mx-auto max-w-6xl px-6">
            <RevealUp>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">技术栈</h2>
            </RevealUp>
            <RevealUp delay={0.1}>
              <p className="mt-4 text-zinc-400">
                基于成熟的开源技术构建，稳定可靠。
              </p>
            </RevealUp>

            <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((t) => (
                <StaggerItem key={t.name}>
                  <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="orb h-[400px] w-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600/20" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <RevealUp>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                今天就开始
                <span className="gradient-text">你的记录</span>
              </h2>
            </RevealUp>
            <RevealUp delay={0.1}>
              <p className="mx-auto mt-6 max-w-md text-zinc-400">
                免注册，纯本地，完全免费。下载 APK，三分钟上手。
              </p>
            </RevealUp>
            <RevealUp delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://github.com/aoye666/liaoleme/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary glow-accent flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold"
                >
                  <Icon name="download" className="h-4 w-4" />
                  下载 Android APK
                </a>
                <a
                  href="https://github.com/aoye666/liaoleme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-medium"
                >
                  <Icon name="github" className="h-4 w-4" />
                  Star on GitHub
                </a>
              </div>
            </RevealUp>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500">
              <span className="text-[10px] font-bold text-white">录</span>
            </div>
            <span className="text-sm text-zinc-500">录了么</span>
          </div>
          <p className="text-xs text-zinc-600">
            &copy; 2025 aoye666. MIT License. Built with Next.js &amp; Flutter.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aoye666/liaoleme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <Icon name="github" className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/aoye666/liaoleme/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 transition-colors hover:text-white"
            >
              Releases
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
