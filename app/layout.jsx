import Header from "@/components/site/Header";
import SmoothScrollProvider from "@/components/shared/animation/SmoothScrollProvider";
import "./globals.css";

export const metadata = {
  title: "Ochi Inspired Studio",
  description:
    "A Next.js 16 + Tailwind site inspired by the public Ochi.design homepage experience."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ochi-bg text-ochi-ink antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          <div id="top" className="relative min-h-screen overflow-x-clip">
            <Header />
            <main>{children}</main>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
