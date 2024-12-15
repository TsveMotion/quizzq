import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizzQ",
  description: "Master Knowledge Through Quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
