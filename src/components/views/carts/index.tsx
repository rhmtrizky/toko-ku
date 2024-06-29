import Button from '@/components/ui/Button';
import CardCartProduct from '@/components/ui/CardCartProduct';
import Modal from '@/components/ui/Modal';
import userService from '@/services/user';
import Converter from '@/utils/Converter';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

type PropTypes = {
  products: any;
  cart: any;
  setToaster: any;
  setCart: any;
};

const CartPageView = (props: PropTypes) => {
  const { products, cart, setToaster, setCart } = props;
  const [updateCart, setUpdateCart] = useState<any>({});
  const [qty, setQty] = useState<number>(1);
  const session: any = useSession();

  const getTotalPrice = () => {
    const total = cart.reduce((acc: number, item: any) => {
      const product = products.find((product: any) => product.id === item.id);
      if (product) {
        return acc + product.price * item.qty;
      }
      return acc;
    }, 0);

    return total;
  };

  const getTotalItems = () => {
    const total = cart.reduce((acc: number, item: any) => {
      return acc + item.qty;
    }, 0);
    return total;
  };

  const getProduct = (id: string) => {
    const product = products.find((product: any) => product.id === updateCart.id);
    return product;
  };

  const handleUpdateCart = async () => {
    let newCart = [];

    const existingItem = cart?.find((item: any) => item.id === updateCart.id);
    console.log(existingItem, 'existingItem');

    if (existingItem) {
      newCart = cart.map((item: any) => {
        if (item.id === updateCart.id) {
          return { ...item, qty: qty };
        }
        return item;
      });
    } else {
      newCart = [
        ...(cart || []),
        {
          id: updateCart.id,
          qty: qty,
        },
      ];
    }
    try {
      const result = await userService.addToCart({ carts: newCart }, session?.data?.accessToken);

      if (result.status === 200) {
        const carts = await userService.getCart(session?.data?.accessToken);
        setCart(carts.data.data);
        setToaster({
          variant: 'success',
          message: 'Successfully Added Item To Cart',
        });
        setUpdateCart({});
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setToaster({
        variant: 'error',
        message: 'Failed to Add Item To Cart',
      });
      setUpdateCart({});
    }
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
    <div className="w-full h-auto min-h-screen my-20 pb-10 relative">
      <div className="w-full flex flex-col gap-4 justify-center items-center pt-5">
        {cart.map((item: any, index: any) => (
          <CardCartProduct
            key={index}
            item={item}
            products={products}
            setUpdateCart={setUpdateCart}
          />
        ))}
      </div>
      <div className="w-full bg-color-pink min-h-[100px] rounded-md px-4 py-2 fixed bottom-0 right-0 left-0 z-40 flex justify-center items-center shadow-t-lg">
        <div className="w-[85%] flex justify-between items-center">
          <div className="w-full text-color-cream text-lg font-semibold ">
            <h1>
              Total items: <span className="text-color-cream">({cart.length})</span>
            </h1>
            <h1>
              Total item quantity: <span className="text-color-cream">({getTotalItems()})</span>
            </h1>
          </div>
          <h1 className="text-color-primary font-semibold">Total: {Converter(getTotalPrice())}</h1>
        </div>
      </div>
      {Object.keys(updateCart).length > 0 && (
        <Modal onClose={() => setUpdateCart({})}>
          <div className="flex justify-start items-center gap-2">
            <Image
              src={getProduct(updateCart.id).image}
              alt={getProduct(updateCart.id).name}
              width="100"
              height="100"
            />
            <div className="flex flex-col justify-center items-start text-color-pink">
              <h1 className="font-semibold text-lg">{getProduct(updateCart.id)?.name}</h1>
              <p>{getProduct(updateCart.id)?.category}</p>
              <div className="flex gap-3 justify-evenly items-center bg-color-cream rounded-md text-color-pink py-1 w-[100px] font-semibold text-sm mt-2">
                <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
                  <FaMinus size={13} />
                </button>
                <p>{qty}</p>
                <button onClick={() => setQty(qty + 1)}>
                  <FaPlus size={13} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 mt-3">
            <Button
              label="Cancel"
              onClick={() => setUpdateCart({})}
              className="bg-color-cream text-color-pink py-1 px-2 rounded"
            />
            <Button
              label="Update"
              type="submit"
              onClick={() => handleUpdateCart()}
              className="bg-color-pink text-color-cream py-1 px-2 rounded"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CartPageView;
