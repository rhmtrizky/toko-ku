import React from 'react';
import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'boxicons/css/boxicons.min.css';
import Toaster from '@/components/ui/Toaster';
import { useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/fragments/Navbar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [toaster, setToaster] = useState<any>({});
  const router = useRouter();
  const excludedPaths = ['/auth', '/admin', '/member'];

  const showNavbar = !excludedPaths.some((path) => router.pathname.startsWith(path));

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);

  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        {showNavbar && <Navbar />}
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
      </NextUIProvider>
    </SessionProvider>
  );
}
