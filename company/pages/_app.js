import { ApolloProvider } from "@apollo/client";
import UserProvider from "../context/userContext";
import NotificationProvider from "../context/notificationContext";
import client from "../apollo/ApolloClient";
import Head from "next/head";
import Notification from "../components/notification/Notification";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
          type="text/css"
        ></link>
      </Head>

      <ApolloProvider client={client}>
        <NotificationProvider>
          <UserProvider>
            <Notification />
            <Component {...pageProps} />
          </UserProvider>
        </NotificationProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
