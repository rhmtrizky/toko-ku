import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import productService from '@/services/product';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

type PropTypes = {
  setDeleteCart: any;
  deleteCart: any;
  setToaster: any;
  cart: any;
  setCart: any;
};

const ModalDeleteCart = (props: PropTypes) => {
  const { deleteCart, setToaster, setDeleteCart, cart, setCart } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  console.log(deleteCart);

  const handleDeleteCart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    let newCart = [];
    newCart = cart.filter((item: { id: string }) => item.id !== deleteCart.id);

    try {
      const result = await userService.addToCart({ carts: newCart }, session?.data?.accessToken);

      if (result.status === 200) {
        const carts = await userService.getCart(session?.data?.accessToken);
        setCart(carts.data.data);
        setToaster({
          variant: 'success',
          message: 'Success Delete Product',
        });
        setIsLoading(false);
        setDeleteCart({});
      }
    } catch (error) {
      console.error('Error delete cart:', error);
      setToaster({
        variant: 'error',
        message: 'Failed Delete Product',
      });
      setDeleteCart({});
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeleteCart({})}>
      <h1 className="text-md font-semibold mb-3 text-color-pink">Are you sure to delete this item?</h1>
      <div className="flex justify-end gap-3 mt-5">
        <Button
          label="Cancel"
          type="button"
          onClick={() => setDeleteCart({})}
          className="bg-color-cream text-color-red py-1 px-3 rounded-md font-semibold"
        />
        <Button
          label={isLoading ? 'Deleting' : 'Delete'}
          type="button"
          onClick={handleDeleteCart}
          className="bg-color-red text-color-primary py-1 px-3 rounded-md font-semibold opacity-[75%]"
        />
      </div>
    </Modal>
  );
};

export default ModalDeleteCart;
