import "@/styles/globals.css";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import StateProvider from "./state-provider";

const halloOysterFont = localFont({
  src: "../styles/fonts/halloOyster.otf",
  variable: "--font-oyster",
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
    <StateProvider>
      <html lang="en" data-theme="autumn">
        <body>
          <main
            className={` ${halloOysterFont.variable} ${montserratFont.variable} min-h-full text-xl text-black font-sans`}
          >
            {children}
          </main>
        </body>
      </html>
    </StateProvider>
  );
}
