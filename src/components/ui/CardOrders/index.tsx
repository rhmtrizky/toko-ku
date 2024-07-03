import Converter from '@/utils/Converter';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Button from '../Button';
import { MdOutlineDeleteOutline } from 'react-icons/md';

type PropTypes = {
  item: any;
  products?: any;
  setUpdateCart?: any;
  setDeleteCart?: any;
};

const CardOrders = (props: PropTypes) => {
  const { item, products, setUpdateCart, setDeleteCart } = props;
  const [qty, setQty] = useState(item.qty);
  const [price, setPrice] = useState(0);

  const getCartProducts = (id: string) => {
    const product = products?.find((product: any) => product.id === id);
    return product;
  };

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
    <div className="w-[90%] h-full lg:min-h-[200px] md:min-h-[180px] sm:min-h-[165px] min-h-[165px] bg-color-cream rounded-md px-10 py-2 shadow-md flex justify-center items-center gap-2">
      <div className="w-[15%] flex justify-center items-center h-full">
        <Image
          src={getCartImageProduct()}
          alt="placeholder"
          width={160}
          height={160}
          className="object-cover rounded-md h-[170px]"
        />
      </div>

      <div className="w-[85%] h-full">
        <p>Order Id : {item.orderId}</p>

        {item.items.map((a: any, index: number) => (
          <div
            className="w-full"
            key={index}
          >
            <div className="w-[60%] text-color-pink">
              <p>
                {getCartProducts(a.id)?.name} ({a.qty})
              </p>
            </div>
          </div>
        ))}
        <p>Total Price: {Converter(price)}</p>
      </div>
    </div>
  );
};

export default CardOrders;
