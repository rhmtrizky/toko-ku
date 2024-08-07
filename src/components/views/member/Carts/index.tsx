import CardCartProduct from '@/components/ui/CardCartProduct';
import Converter from '@/utils/Converter';
import { useEffect, useState } from 'react';
import ModalUpdateCart from './ModalUpdateCart';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import ModalDeleteCart from './ModalDeleteCart';
import PageCartEmpty from '@/components/ui/PageCartEmpty';

type PropTypes = {
  products: any;
  cart: any;
  setToaster: any;
  setCart: any;
};

const CartPageView = (props: PropTypes) => {
  const { products, cart, setToaster, setCart } = props;
  const [updateCart, setUpdateCart] = useState<any>({});
  const [deleteCart, setDeleteCart] = useState<any>({});
  const [qty, setQty] = useState<number>(1);

  const getTotalPrice = () => {
    const total = cart?.reduce((acc: number, item: any) => {
      const product = products.find((product: any) => product.id === item.id);
      if (product) {
        return acc + product.price * item.qty;
      }
      return acc;
    }, 0);

    return total;
  };

  const getTotalItems = () => {
    const total = cart?.reduce((acc: number, item: any) => {
      return acc + item.qty;
    }, 0);
    return total;
  };

  const getProduct = (id: string) => {
    const product = products.find((product: any) => product.id === updateCart.id);
    return product;
  };

  useEffect(() => {
    if (updateCart && updateCart.qty) {
      const parsedQty = parseInt(updateCart.qty);
      if (!isNaN(parsedQty)) {
        setQty(parsedQty);
      }
    }
  }, [updateCart]);

  return (
    <div className="w-full h-auto min-h-screen mt-20 pb-10 relative">
      {cart !== undefined && cart?.length !== 0 ? (
        <>
          <div className="w-full flex flex-col gap-4 justify-center items-center pt-5 pb-20">
            {cart?.map((item: any, index: any) => (
              <CardCartProduct
                key={index}
                item={item}
                products={products}
                setUpdateCart={setUpdateCart}
                setDeleteCart={setDeleteCart}
              />
            ))}
          </div>
          <div className="w-full bg-color-pink min-h-[100px] rounded-md px-4 py-4 fixed bottom-0 right-0 left-0 z-30 flex justify-center items-center shadow-t-lg">
            <div className="w-[85%] flex flex-row justify-between items-center">
              <div className="w-full text-color-primary font-semibold ">
                <h1>
                  Total items: <span className="text-color-primary">({cart?.length})</span>
                </h1>
                <h1>
                  Total item quantity: <span className="text-color-primary">({getTotalItems()})</span>
                </h1>
                <h1 className="text-color-primary font-semibold">Total: {Converter(getTotalPrice())}</h1>
              </div>

              <Link href={'/checkout'}>
                <Button
                  label="Checkout"
                  type="button"
                  className="bg-color-red text-color-primary py-2 px-4 rounded-md font-semibold opacity-[90%]"
                />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <PageCartEmpty />
      )}
      {Object.keys(updateCart).length > 0 && (
        <ModalUpdateCart
          setUpdateCart={setUpdateCart}
          updateCart={updateCart}
          qty={qty}
          setQty={setQty}
          getProduct={getProduct}
          cart={cart}
          setCart={setCart}
          setToaster={setToaster}
        />
      )}
      {Object.keys(deleteCart).length > 0 && (
        <ModalDeleteCart
          setDeleteCart={setDeleteCart}
          deleteCart={deleteCart}
          cart={cart}
          setCart={setCart}
          setToaster={setToaster}
        />
      )}
    </div>
  );
};

export default CartPageView;
