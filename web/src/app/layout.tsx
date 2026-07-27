import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liaoleme.aoye666.github.io"),
  title: {
    default: "录了么 - 一本正经的自控打卡应用",
    template: "%s | 录了么",
  },
  description:
    "录了么（原名撸了么），一个一本正经记录你今天撸没撸的黑白打卡应用。转盘替你决定，时间门控防止作弊，热力图替你记住每一天。Flutter 构建，开源免费，无需注册。",
  keywords: [
    "录了么",
    "撸了么",
    "自控",
    "戒色",
    "打卡",
    "自律",
    "每日记录",
    "Flutter",
    "Android",
    "习惯追踪",
  ],
  authors: [{ name: "aoye666", url: "https://github.com/aoye666" }],
  creator: "aoye666",
  publisher: "aoye666",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "录了么 - 一本正经的自控打卡应用",
    description:
      "录了么（原名撸了么），记录你今天撸没撸的黑白打卡应用。转盘决定、时间门控、热力图统计、毒鸡汤激励。",
    type: "website",
    locale: "zh_CN",
    siteName: "录了么",
    url: "https://liaoleme.aoye666.github.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "录了么 - 一本正经的自控打卡应用",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "录了么 - 一本正经的自控打卡应用",
    description: "记录你今天撸没撸的黑白打卡应用",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://liaoleme.aoye666.github.io",
  },
  verification: {
    other: {
      "msvalidate.01": "7B98E673AC8B2BC131FD06B2C13B8E59",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
