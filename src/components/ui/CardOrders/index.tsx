import Converter from '@/utils/Converter';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../Button';

type PropTypes = {
  item: any;
  products?: any;
  setModalPayOrder?: any;
  getCartProducts: (id: string) => any;
};

const CardOrders = (props: PropTypes) => {
  const { item, products, setModalPayOrder, getCartProducts } = props;
  const [price, setPrice] = useState(0);

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
              <Button
                label="Pay Now"
                type="button"
                className="bg-color-blue text-color-primary py-2 px-2 rounded-md text-xs opacity-70 w-[90px] hover:opacity-90 lg:hidden md:flex sm:flex flex justify-center items-center"
                onClick={() => setModalPayOrder(item)}
              />
            ) : (
              <Button
                label="View Details"
                type="button"
                className="bg-color-blue text-color-primary py-2 px-2 rounded-md text-xs opacity-70 w-[110px] hover:opacity-90 lg:hidden md:flex sm:flex flex justify-center items-center"
                onClick={() => setModalPayOrder(item)}
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
          <Button
            label="Pay Now"
            type="button"
            className="bg-color-blue text-color-primary py-2 px-4 rounded-md text-sm opacity-70 w-[90px] hover:opacity-90"
            onClick={() => setModalPayOrder(item.id)}
          />
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
