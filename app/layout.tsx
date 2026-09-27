import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electrocuted — Learn Electricity by Building",
  description: "A game-like interactive electricity learning lab."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}