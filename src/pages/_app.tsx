import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'boxicons/css/boxicons.min.css';
// import { PrimeReactProvider } from 'primereact/api';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* <PrimeReactProvider> */}
      <Component {...pageProps} />
      {/* </PrimeReactProvider> */}
    </SessionProvider>
  );
}
