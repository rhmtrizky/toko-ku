import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

type PropTypes = {
  setUpdateCart: any;
  updateCart: any;
  qty: number;
  setQty: any;
  getProduct: any;
  cart: any;
  setCart: any;
  setToaster: any;
};

const ModalUpdateCart = (props: PropTypes) => {
  const { setUpdateCart, updateCart, qty, setQty, getProduct, cart, setCart, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdateCart = async () => {
    setIsLoading(true);
    let newCart = [];

    const existingItem = cart?.find((item: any) => item.id === updateCart.id);

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
          message: 'Success Update Product',
        });
        setIsLoading(false);
        setUpdateCart({});
      }
    } catch (error) {
      console.error('Error update cart:', error);
      setToaster({
        variant: 'error',
        message: 'Failed Update Product',
      });
      setUpdateCart({});
      setIsLoading(false);
    }
  };
  return (
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
          label={isLoading ? 'Loading...' : 'Update'}
          type="submit"
          onClick={(e: any) => handleUpdateCart()}
          className="bg-color-pink text-color-cream py-1 px-2 rounded"
        />
      </div>
    </Modal>
  );
};

export default ModalUpdateCart;
