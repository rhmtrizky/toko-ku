import Converter from '@/utils/Converter';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../Button';
import orderService from '@/services/order';
import { useSession } from 'next-auth/react';

type PropTypes = {
  item: any;
  products?: any;
  setModalPayOrder?: any;
  getCartProducts: (id: string) => any;
  setOrders?: any;
};

const CardOrders = (props: PropTypes) => {
  const { item, products, setModalPayOrder, getCartProducts, setOrders } = props;
  const [remainingTime, setRemainingTime] = useState<any>(null);
  const [detailOrder, setDetailOrder] = useState<any>({});
  const [price, setPrice] = useState(0);
  const { data: session }: any = useSession();

  const getCartImageProduct = () => {
    const firstItem = item?.items[0];
    if (firstItem) {
      const product = getCartProducts(firstItem.id);
      return product?.image || '/path/to/placeholder.png';
    }
    return '/path/to/placeholder.png';
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    item.items.forEach((item: any) => {
      const product = getCartProducts(item.id);
      if (product) {
        totalPrice += product.price * item.qty;
      }
    });
    return totalPrice;
  };

  useEffect(() => {
    setPrice(calculateTotalPrice());
  }, [item, products]);

  const PAYMENT_DURATION = 60 * 60; // 60 minutes in seconds

  const getDetailOrder = async (id: string) => {
    try {
      const { data } = await orderService.getDetailOrder(id, session?.accessToken);
      setDetailOrder(data.data);

      // Calculate remaining time in seconds based on createdAt
      const createdAt = new Date(data.data.created_at.seconds * 1000).getTime();

      const expirationTime = createdAt + PAYMENT_DURATION * 1000;

      const currentTime = new Date().getTime();
      const remainingTime = Math.floor((expirationTime - currentTime) / 1000);

      setRemainingTime(remainingTime);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const updateOrderAfterTimeIsOut = async (id: string) => {
    if (remainingTime === 0 && detailOrder.paymentProof === '') {
      const result = await orderService.updateOrder(id, { status: 'cancelled' }, session?.accessToken);

      if (result.status === 200) {
        const { data } = await orderService.getAllOrders(session?.accessToken);
        setOrders(data.data);
      } else {
        console.error('Failed to update order to be paid');
      }
    }
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
    if (item.id) {
      updateOrderAfterTimeIsOut(item.id);
    }
  }, [remainingTime, detailOrder]);

  useEffect(() => {
    getDetailOrder(item.id);
  }, [item]);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="w-[90%] h-full lg:min-h-[200px] md:min-h-[180px] sm:min-h-[165px] min-h-[165px] bg-color-cream rounded-md px-5 py-6 shadow-md grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 lg:text-[13px] md:text-[13px] sm:text-[12px] text-[12px]">
      <div className="w-full h-full flex justify-center items-start gap-3">
        <Image
          src={getCartImageProduct()}
          alt="placeholder"
          width={160}
          height={160}
          className="object-cover rounded-md max-h-[180px] lg:max-w-[160px] md:max-w-[120px] sm:max-w-[90px]  max-w-[90px]"
        />

        <div className="w-full h-full  flex flex-col justify-between">
          <div className="w-full h-full flex flex-col text-color-pink">
            <p className="font-semibold lg:flex md:hidden sm:hidden hidden">Order Id : </p>
            <div className=" w-full lg:hidden md:flex sm:flex flex justify-between">
              <p className="font-semibold">Order Id : </p>

              <div
                className={`flex flex-col gap-1 items-center rounded py-1 px-2 ${item.status === 'order' && 'bg-color-red'} ${item.status === 'paid' && 'bg-color-green'} ${item.status === 'packing' && 'bg-color-gray'} ${item.status === 'shipped' && 'bg-color-yellow'} ${item.status === 'done' && 'bg-color-blue'} ${
                  item.status === 'declined' && 'bg-color-red'
                } `}
              >
                <p className="text-color-pink font-semibold lg:flex md:hidden sm:hidden hidden">Status</p>
                <div className=" rounded text-color-primary text-xs">{item.status == 'order' ? <p>Unpaid</p> : <p>{item.status}</p>}</div>
              </div>
            </div>
            <p>{item.orderId}</p>

            <div className="text-color-pink">
              <p className="font-semibold">Items :</p>
              {item.items.map((a: any, index: number) => (
                <div
                  className="w-full"
                  key={index}
                >
                  <p>
                    {getCartProducts(a.id)?.name} ({a.qty})
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-color-pink font-bold">Total Price: {Converter(price)}</p>
          <div className="w-full h-full flex justify-end">
            {item.status === 'order' ? (
              <div className="flex flex-col items-center justify-center">
                {item.status === 'order' && remainingTime > 0 && <p className="text-color-red font-semibold lg:hidden md:flex sm:flex flex">{formatTime(remainingTime)}</p>}
                <Button
                  label="Pay Now"
                  type="button"
                  className="bg-color-blue text-color-primary py-2 px-2 rounded-md text-xs opacity-70 w-[90px] hover:opacity-90 lg:hidden md:flex sm:flex flex justify-center items-center"
                  onClick={() => setModalPayOrder(item.id)}
                />
              </div>
            ) : (
              <Button
                label="View Details"
                type="button"
                className="bg-color-blue text-color-primary py-2 px-2 rounded-md text-xs opacity-70 w-[110px] hover:opacity-90 lg:hidden md:flex sm:flex flex justify-center items-center"
                onClick={() => setModalPayOrder(item.id)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full lg:flex md:hidden sm:hidden hidden justify-between items-center lg:py-0 md:py-2 sm:py-2 py-2">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-color-pink font-semibold lg:flex md:hidden sm:hidden hidden">Status</p>
          <div className="bg-color-red py-1 px-2 rounded text-color-primary text-sm">{item.status == 'order' ? <p>Unpaid</p> : <p>{item.status}</p>}</div>
        </div>
        {item.status === 'order' ? (
          <div className="flex flex-col gap-1 items-center justify-center">
            {item.status === 'order' && remainingTime > 0 && <p className="text-color-red font-semibold lg:flex md:hidden sm:hidden hidden">{formatTime(remainingTime)}</p>}
            <Button
              label="Pay Now"
              type="button"
              className="bg-color-blue text-color-primary py-1 px-3 rounded-md text-sm opacity-70 w-[90px] hover:opacity-90"
              onClick={() => setModalPayOrder(item.id)}
            />
          </div>
        ) : (
          <Button
            label="See Details"
            type="button"
            className="bg-color-blue text-color-primary py-2 px-4 rounded-md text-sm opacity-70 w-[130px] hover:opacity-90"
            onClick={() => setModalPayOrder(item.id)}
          />
        )}
      </div>
    </div>
  );
};

export default CardOrders;
