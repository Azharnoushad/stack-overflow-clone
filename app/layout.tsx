import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
const inter = localFont({
  src: "../fonts/interVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: "../fonts/space-groteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500  700",
});
export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.className, inter.variable, spaceGrotesk.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
