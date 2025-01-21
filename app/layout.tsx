import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <ClientThemeProvider>
          <main>{children}</main>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
