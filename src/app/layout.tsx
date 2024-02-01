import type { Metadata } from "next";
import "./globals.sass";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Product Detail Page",
  description:
    "A NEXT.js coding solution for Frontend Mentor's challenge to create an ecommerce product detail page.",
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
