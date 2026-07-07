import type { ReactNode } from "react";

export const metadata = {
  title: "Retailor Tech Tools",
  description: "Internal tools for Retailor Tech",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}