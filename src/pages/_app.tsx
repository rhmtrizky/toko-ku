import React, { useEffect, useState } from 'react';
import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'boxicons/css/boxicons.min.css';
import Toaster from '@/components/ui/Toaster';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/fragments/Navbar';
import { useRouter } from 'next/router';
import userService from '@/services/user';
import orderService from '@/services/order';
import Footer from '@/components/fragments/Footer';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <MainApp
        Component={Component}
        pageProps={pageProps}
      />
    </SessionProvider>
  );
};

const MainApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  const [toaster, setToaster] = useState<any>({});

  const router = useRouter();
  const excludedPaths = ['/auth', '/admin'];
  const showNavbar = !excludedPaths.some((path) => router.pathname.startsWith(path));

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState<any>([]);

  const { data: sessionData, status: sessionStatus }: any = useSession();

  const getCarts = async (token: string) => {
    try {
      const carts = await userService.getCart(token);
      setCart(carts.data.data);
    } catch (error) {
      console.log(error, 'failed get cart');
    }
  };

  const getSessionOrders = async (token: string) => {
    try {
      const { data } = await orderService.getAllOrders(token);

      const orders = data?.data?.filter((order: any) => {
        return order?.userId === sessionData?.user?.id;
      });

      setOrders(orders);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (sessionStatus === 'authenticated' && sessionData?.accessToken) {
      getCarts(sessionData.accessToken);
    }
  }, [sessionStatus, sessionData]);

  useEffect(() => {
    if (sessionStatus === 'authenticated' && sessionData?.accessToken) {
      getSessionOrders(sessionData.accessToken);
    }
  }, [sessionStatus, sessionData]);

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);

  return (
    <NextUIProvider>
      <div className="relative">
        {showNavbar && (
          <div className="fixed top-0 left-0 right-0 z-40">
            <Navbar
              cart={cart}
              orders={orders}
            />
          </div>
        )}
        <Component
          {...pageProps}
          setToaster={setToaster}
          setCart={setCart}
          cart={cart}
          orders={orders}
          setOrders={setOrders}
        />
        {/* <div className="absolute bottom-0 mt-20 bg-color-red">
          <Footer />
        </div> */}
      </div>
      {Object.keys(toaster).length > 0 && (
        <Toaster
          variant={toaster.variant}
          message={toaster.message}
          setToaster={setToaster}
        />
      )}
    </NextUIProvider>
  );
};

export default MyApp;
