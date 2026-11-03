import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OFFDAYA | Holidays, stays & workations",
  description: "Your calendar deserves better views. Explore Lakshadweep, Kashmir and Kerala stays with OFFDAYA.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
