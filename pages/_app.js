import Head from "next/head";
import { NotificationContextProvider } from "../store/notification-context";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      {/* Layout to idelany komponent do renderowania Notifikacji, samo jego imię "layout" z definicji to wrapper dla wizalnego kontentu*/}
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
