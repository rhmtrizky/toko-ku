import CardOrders from '@/components/ui/CardOrders';
import productService from '@/services/product';
import { useEffect, useState } from 'react';
import ModalPayOrder from './ModalPayOrder';
import { Tabs, Tab } from '@nextui-org/react';
import orderService from '@/services/order';
import { useSession } from 'next-auth/react';

type PropTypes = {
  orders: any;
  setToaster: any;
  setOrders: any;
};

const OrderMemberView = (props: PropTypes) => {
  const { orders, setToaster, setOrders } = props;
  const [modalPayOrder, setModalPayOrder] = useState<string>('');
  const { data: session }: any = useSession();
  const [remainingTime, setRemainingTime] = useState<any>(null);
  const [detailOrder, setDetailOrder] = useState<any>({});

  console.log(detailOrder);

  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await productService.getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getCartProducts = (id: string) => {
    const product = products?.find((product: any) => product.id === id);
    return product;
  };

  const getOrdersUnpaid: any = () => {
    const order = orders?.filter((order: any) => order.status === 'order');
    return order;
  };
  const getOrdersPaid: any = () => {
    const order = orders?.filter((order: any) => order.status === 'paid');
    return order;
  };
  const getOrdersPacking: any = () => {
    const order = orders?.filter((order: any) => order.status === 'packing');
    return order;
  };
  const getOrdersShipped: any = () => {
    const order = orders?.filter((order: any) => order.status === 'shipped');
    return order;
  };
  const getOrdersDone: any = () => {
    const order = orders?.filter((order: any) => order.status === 'done');
    return order;
  };
  const getOrdersCancel: any = () => {
    const order = orders?.filter((order: any) => order.status === 'cancelled' || order.status === 'declined');
    return order;
  };

  const PAYMENT_DURATION = 60 * 60; // 60 minutes in seconds

  const getDetailOrder = async (id: string) => {
    try {
      const { data } = await orderService.getDetailOrder(id, session?.accessToken);
      setDetailOrder(data.data);
      // Calculate remaining time in seconds based on createdAt
      const createdAt = new Date(data.data.created_at.seconds * 1000).getTime();
      console.log(createdAt);

      const expirationTime = createdAt + PAYMENT_DURATION * 1000;
      console.log(expirationTime);

      const currentTime = new Date().getTime();
      const remainingTime = Math.floor((expirationTime - currentTime) / 1000);
      console.log(remainingTime);

      setRemainingTime(remainingTime);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime: any) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [remainingTime]);

  useEffect(() => {
    getDetailOrder(modalPayOrder);
  }, [modalPayOrder]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="w-full h-auto min-h-screen mt-20 flex flex-col justify-center items-start">
      <Tabs
        aria-label="Options"
        className="w-full flex justify-center items-center mt-5"
      >
        <Tab
          key="unpaid"
          title="Unpaid"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersUnpaid().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="paid"
          title="Paid"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersPaid().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="packing"
          title="Packing"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersPacking().length !== 0 ? (
              getOrdersPacking().map((item: any, index: number) => (
                <CardOrders
                  item={item}
                  key={index}
                  products={products}
                  getCartProducts={getCartProducts}
                  setModalPayOrder={setModalPayOrder}
                />
              ))
            ) : (
              <h1 className="text-3xl font-bold text-red-500">No Order</h1>
            )}
          </div>
        </Tab>
        <Tab
          key="shipped"
          title="Shipped"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersShipped().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="done"
          title="Done"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersDone().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="cancel"
          title="Cancel/Declined"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersCancel().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
      </Tabs>

      {modalPayOrder !== '' && (
        <ModalPayOrder
          modalPayOrder={modalPayOrder}
          setModalPayOrder={setModalPayOrder}
          setToaster={setToaster}
          getCartProducts={getCartProducts}
          setOrders={setOrders}
          getDetailOrder={getDetailOrder}
          detailOrder={detailOrder}
        />
      )}
    </div>
  );
};

export default OrderMemberView;
