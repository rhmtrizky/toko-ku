import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'boxicons/css/boxicons.min.css';
import Toaster from '@/components/ui/Toaster';
// import { PrimeReactProvider } from 'primereact/api';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      {/* <Toaster /> */}
    </SessionProvider>
  );
}
