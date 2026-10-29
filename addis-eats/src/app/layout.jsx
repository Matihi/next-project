import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/context/providers";
import "./globals.css";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — food delivery in Addis Ababa",
  },
  description:
    "Order authentic Ethiopian food. Delivery across Addis Ababa, paid with TeleBirr.",
  openGraph: {
    title: "Addis Eats",
    description:
      "Order authentic Ethiopian food. Delivery across Addis Ababa, paid with TeleBirr.",
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` h-full antialiased ${playfairDisplay.variable} `}
    >
      <body className="min-h-full  grid grid-rows-[auto_1fr_auto]">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
