import "./globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <ClientThemeProvider>
          <main>{children}</main>
          <Toaster richColors />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
