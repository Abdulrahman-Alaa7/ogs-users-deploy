import { Inter as FontSans } from "next/font/google";
import { Norican } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { cn } from "../../lib/utils";
import { Toaster } from "../../components/ui/sonner";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Provider } from "../utils/Provider";
import Header from "../../components/PublicComponents/Header";
import { AppStorage } from "../utils/AppContext";
import Footer from "../../components/PublicComponents/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const norican = Norican({
  subsets: ["latin", "latin-ext"],
  variable: "--font-norican",
  weight: "400",
});

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={`${locale === "ar" ? `rtl` : `ltr`}`}
      suppressHydrationWarning={true}
    >
      <body
        className={cn(
          `${
            locale === "ar" ? `!font-cairo` : `!font-sans`
          } min-h-screen dark:bg-background  antialiased`,
          fontSans.variable,
          norican.variable,
          cairo.variable
        )}
      >
        <Provider>
          <NextIntlClientProvider messages={messages}>
            <AppStorage>
              <Header />
              {children}
              <Footer />
            </AppStorage>
          </NextIntlClientProvider>
          <Toaster position="bottom-center" richColors />
        </Provider>
      </body>
    </html>
  );
}
