import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { ThemeProvider } from "../components/ThemeProvider";
import CookieBanner from "../components/CookieBanner";
import { ChatbotProvider } from "../components/ChatbotProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider defaultTheme="system" storageKey="sparta-theme">
          <ChatbotProvider>
            <SiteHeader />
            <main>
              {children}
              <SiteFooter />
            </main>
            <CookieBanner />
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}