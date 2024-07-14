import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";
import Divider from "@components/ui/divider";
import { useStoreInfoQuery } from "src/api/queries/store.query";
import { useEffect } from "react";
// import CookieBar from '@components/common/cookie-bar';
// import { useAcceptCookies } from '@utils/use-accept-cookies';
// import Button from '@components/ui/button';
// import { useTranslation } from 'next-i18next';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  // const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  // const { t } = useTranslation('common');

  const { data } = useStoreInfoQuery();
  const response = data?.data;

  useEffect(()=>{
    console.log("data", data);
    
  },[])

  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
        ]}
        title={response?.name ? response?.name : "On Shop"}
        description="Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS."
        canonical="https://chawkbazar.vercel.app/"
        openGraph={{
          url: "https://chawkbazar.vercel.app",
          title: `${response?.name ? response?.name : "On Shop"}`,
          description:
            "Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.",
          images: [
            {
              url: "/assets/images/og-image-01.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: "/assets/images/og-image-02.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
          ],
        }}
      />
      <Header storeName={response?.name}/>
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      {/* <Footer /> */}
      <Divider className="mb-0" />
      <div className="w-full text-center h-16 flex justify-center items-center">
        <a href="https://www.onshophq.com">Powered by on shop</a>
      </div>
      <MobileNavigation />
      {/* <Search /> */}
      {/* <CookieBar
				title={t('text-cookies-title')}
				hide={acceptedCookies}
				action={
					<Button onClick={() => onAcceptCookies()} variant="slim">
						@ts-ignore
						{t('text-accept-cookies')}
					</Button>
				}
			/> */}
    </div>
  );
}
