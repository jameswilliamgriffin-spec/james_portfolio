import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "James Griffin | Portfolio Coming Soon",
  description:
    "A designer, educator and digital product builder exploring people, technology and interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
