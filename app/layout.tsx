import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "sonner";
import { ModelProvider } from "@/components/providers/modalProvider";
import { EdgeStoreProvider } from '../lib/edgestore';
export const metadata: Metadata = {
  title: 'NoteBook',
  description: 'Generated by Next.js',
  icons: {
    icon: [
      {
        url: "/notebook.svg",
        href: "/notebook.svg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ConvexClientProvider>
        <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="bottom-center"/>
            <ModelProvider />
            {children}
          </ThemeProvider>
        </EdgeStoreProvider>
      </ConvexClientProvider>
      </body>
    </html>
  );
}
