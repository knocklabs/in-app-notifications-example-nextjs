import "@knocklabs/react/dist/index.css";
import { Box } from "@telegraph/layout";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "sonner";

import "../components/TabbedNotificationFeed/styles.css";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Box className={inter.className}>
      <Head>
        <title>React in-app notifications example | Powered by Knock</title>
        <meta
          name="description"
          content="In-app notification feed and toasts, powered by Knock"
        />
        <meta
          property="og:title"
          content="React in-app notifications example | Powered by Knock"
        />
        <meta
          property="og:description"
          content="In-app notification feed and toasts, powered by Knock"
        />
        <meta
          property="og:url"
          content="https://knock-in-app-notifications-react.vercel.app"
        />
        <meta name="twitter:handle" content="@knocklabs" />
        <meta name="twitter:site" content="@knocklabs" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </Box>
  );
}

export default MyApp;
