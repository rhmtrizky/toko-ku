import CardCartProduct from '@/components/ui/CardCartProduct';
import { useEffect } from 'react';

type PropTypes = {
  products: any;
  cart: any;
};

const CartPageView = (props: PropTypes) => {
  const { products, cart } = props;

  return (
    <div className="w-full h-auto min-h-screen flex  gap-3 justify-center items-center mt-20 pb-10">
      <div className="w-3/5 flex flex-col gap-4 justify-center items-center">
        {cart.map((item: any, index: any) => (
          <CardCartProduct
            key={index}
            item={item}
            products={products}
            index={index}
          />
        ))}
      </div>
      <div className="w-2/5 h-screen flex gap-3 justify-center items-start pt-2 px-5">
        <div className="w-full bg-color-cream min-h-[200px] rounded-md text-color-pink px-4 py-2">
          <h1 className="text-md font-bold">Summary</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPageView;
