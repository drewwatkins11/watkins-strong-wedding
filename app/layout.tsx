import "@/styles/globals.css";
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

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>
        <main
          className={`${bambiFont.variable} ${yellowRabbitFont.variable} ${halloOysterFont.variable} ${quicksandFont.variable} ${montserratFont.variable} min-h-full text-xl text-black`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
