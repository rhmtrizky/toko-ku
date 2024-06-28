import CardCartProduct from '@/components/ui/CardCartProduct';
import { useEffect } from 'react';

type PropTypes = {
  products: any;
  cart: any;
};

const CartPageView = (props: PropTypes) => {
  const { products, cart } = props;

  return (
    <div className="w-full h-auto min-h-screen my-20 pb-10 relative">
      <div className="w-full flex flex-col gap-4 justify-center items-center pt-5">
        {cart.map((item: any, index: any) => (
          <CardCartProduct
            key={index}
            item={item}
            products={products}
            index={index}
          />
        ))}
      </div>
      <div className="w-full bg-color-pink min-h-[100px] rounded-md text-color-primary px-4 py-2 fixed bottom-0 right-0 left-0 z-40">
        <h1 className="text-md font-bold">Summary</h1>
      </div>
    </div>
  );
};

export default CartPageView;
