import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/reduxProvider";
import OverlayProvider from "@/context/overlayContext";
import Overlay from "@/components/Overlay";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ReduxProvider>
          <OverlayProvider>
            {children}
            <Overlay />
            <Toaster
              toastOptions={{
                style: {
                  fontSize: "16px",
                },
              }}
            />
          </OverlayProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
