import type { Metadata } from "next";
import { siteOrigin } from "../lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: "OFFDAYA | Holidays, stays & workations",
  description: "Explore Lakshadweep, Kashmir and Kerala stays with OFFDAYA.",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
