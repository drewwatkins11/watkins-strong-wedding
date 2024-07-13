import "@/styles/globals.css";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

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
    <html lang="en" data-theme="autumn">
      <body>
        <main
          className={` ${halloOysterFont.variable} ${montserratFont.variable} min-h-full text-xl text-black font-sans font-montserrat`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
