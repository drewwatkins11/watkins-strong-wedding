import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Quicksand } from "next/font/google";

const bambiFont = localFont({
  src: "../styles/fonts/X_BAMBI.ttf",
  variable: "--font-bambi",
});

const quicksandFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${bambiFont.variable} ${quicksandFont.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
