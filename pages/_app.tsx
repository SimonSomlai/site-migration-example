import { Lato, Raleway, Crete_Round, Lora } from "@next/font/google";
import { useEffect } from "react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const crete_round = Crete_Round({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-crete-round",
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-crete-round",
});
import "src/styles/reset.scss";
import "src/styles/highlight.scss";
import "src/styles/shame.scss";

import "swiper/css";
import "swiper/css/navigation";
import "photoswipe/dist/photoswipe.css";

import { Layout } from "src/components/Layout";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <style jsx global>{`
        :root {
          --font-lato: ${lato.style.fontFamily};
          --font-raleway: ${raleway.style.fontFamily};
          --font-crete-round: ${crete_round.style.fontFamily};
          --font-lora: ${lora.style.fontFamily};
          --color-primary: #1982ae;
        }
      `}</style>
      <Component {...pageProps} />
    </Layout>
  );
}
