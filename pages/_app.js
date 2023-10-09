import '../styles/globals.css';
import 'remixicon/fonts/remixicon.css'

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Head from 'next/head';
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-256x256.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-384x384.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp