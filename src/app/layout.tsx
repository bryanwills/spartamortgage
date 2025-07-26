import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { ThemeProvider } from "../components/ThemeProvider";
import CookieBanner from "../components/CookieBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider defaultTheme="system" storageKey="sparta-theme">
          <SiteHeader />
          <main className="min-h-[80vh] bg-white dark:bg-gray-950 transition-colors duration-300">
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}