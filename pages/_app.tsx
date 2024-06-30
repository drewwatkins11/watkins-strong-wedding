import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Quicksand, Montserrat } from "next/font/google";

const bambiFont = localFont({
  src: "../styles/fonts/X_BAMBI.ttf",
  variable: "--font-bambi",
});

const yellowRabbitFont = localFont({
  src: "../styles/fonts/yellowRabbit.otf",
  variable: "--font-rabbit",
});

const halloOysterFont = localFont({
  src: "../styles/fonts/halloOyster.otf",
  variable: "--font-oyster",
});

const quicksandFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${bambiFont.variable} ${yellowRabbitFont.variable} ${halloOysterFont.variable} ${quicksandFont.variable} ${montserratFont.variable} text-black`}
    >
      <Component {...pageProps} />
    </main>
  );
}
