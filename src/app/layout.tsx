import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@components/header";
import Footer from "@components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Brainy - The Study Tool",
  description: "Brainy is a tool that can greatly improve your studying productivity.",
  metadataBase: new URL("https://justbrandonlim.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Brainy",
    type: "website",
    title: "Brainy - The Study Tool",
    description: "Brainy is a tool that can greatly improve your studying productivity.",
    locale: "en_SG",
    url: "/",
    images: [
      {
        url: "",
        alt: "Brainy",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en_SG" className="antialiased">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} overscroll-none text-sm font-inter p-5 flex flex-col min-h-screen gap-10 bg-pink-200 text-blue-800`}
      >
        <header>
          <Header />
        </header>
        <main className="flex flex-col grow">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
