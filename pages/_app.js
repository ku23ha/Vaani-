import '../styles/globals.css'
import Head from "next/head";
import setup from "../setup";
import {wrapper} from "../store/store";
import {UserProvider} from "@auth0/nextjs-auth0";
import useTheme from "../common/hooks/useTheme";

import { MyContextProvider } from "../contexts/MyContext";

function MyApp({ Component, pageProps }) {

  useTheme();

  return <>
    <Head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
      <link rel="icon" href="/favicon-96x96.png" type="image/png"/>
      <link rel="manifest" href="/site.webmanifest" type="application/manifest+json"/>
      <link rel="icon" href="/web-app-manifest-192x192.png" type="image/png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>
        {setup.projectName}
      </title>
    </Head>

    <UserProvider>
        <MyContextProvider>
            <Component {...pageProps} />
        </MyContextProvider>
    </UserProvider>
  </>
}


export default wrapper.withRedux(MyApp)
