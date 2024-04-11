import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'boxicons/css/boxicons.min.css';
import Toaster from '@/components/ui/Toaster';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [toaster, setToaster] = useState<any>({});

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);

  return (
    <SessionProvider session={session}>
      <Component
        {...pageProps}
        setToaster={setToaster}
      />
      {Object.keys(toaster).length > 0 && (
        <Toaster
          variant={toaster.variant}
          message={toaster.message}
          setTouster={setToaster}
        />
      )}
    </SessionProvider>
  );
}
