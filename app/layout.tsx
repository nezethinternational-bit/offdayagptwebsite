import { DM_Sans, Montserrat } from 'next/font/google';
import type { Metadata } from "next";
import { siteOrigin } from "../lib/site-url";
import "./globals.css";

const bodyFont = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });
const headingFont = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: "OFFDAYA | Holidays, stays & workations",
  description: "Explore Lakshadweep, Kashmir and Kerala stays with OFFDAYA.",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={bodyFont.variable + ' ' + headingFont.variable}><body className="antialiased">{children}</body></html>;
}
