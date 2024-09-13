import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers/ThemeProvider/ThemeProvider";
import ScreenProvider from "@/components/Providers/ScreenProvider/ScreenProvider";
import SettingProvider from "@/components/Providers/SettingProvider/SettingProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Windows 11 Clone",
  description: "Copyright by minhtrifit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScreenProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SettingProvider>{children}</SettingProvider>
          </ThemeProvider>
        </ScreenProvider>
      </body>
    </html>
  );
}
