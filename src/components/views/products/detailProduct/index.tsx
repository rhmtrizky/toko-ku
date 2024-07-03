import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import userService from '@/services/user';
import Converter from '@/utils/Converter';
import { set } from 'firebase/database';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ImHappy } from 'react-icons/im';

type PropTypes = {
  product: any;
  productId: any;
  cart: any;
  setToaster: any;
  setCart: any;
};

const DetailProductView = (props: PropTypes) => {
  const { product, productId, cart, setToaster, setCart } = props;
  const { status, data: session }: any = useSession();
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [alertGoToCart, setAlertGoToCart] = useState(false);

  useEffect(() => {
    if (product?.price) {
      setPrice(parseInt(product.price, 10) * qty);
    }
  }, [product, qty]);

  useEffect(() => {
    if (qty < 1) {
      setQty(1);
    } else if (product?.price) {
      setPrice(parseInt(product.price, 10) * qty);
    }
  }, [qty, product]);

  const handleAddToCart = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    let newCart = [];

    const existingItem = cart?.find((item: any) => item.id === productId);

    if (existingItem) {
      newCart = cart.map((item: any) => {
        if (item.id === productId) {
          return { ...item, qty: item.qty + qty };
        }
        return item;
      });
    } else {
      newCart = [
        ...(cart || []),
        {
          id: productId,
          qty: qty,
        },
      ];
    }

    try {
      const result = await userService.addToCart({ carts: newCart }, session?.accessToken);
      if (result.status === 200) {
        const carts = await userService.getCart(session?.accessToken);
        console.log(carts);
        setCart(carts?.data?.data);
        setAlertGoToCart(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsLoading(false);
      setToaster({
        variant: 'error',
        message: 'Failed Added Item To Cart',
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen mt-10">
      <div className="flex justify-center items-center gap-5">
        <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col w-auto h-auto lg:gap-20 md:gap-20 sm:gap-5 gap-5 mb-10 ">
          <div className="flex justify-center lg:items-start md:items-start sm:items-center items-center h-full">
            <Image
              width="550"
              height="550"
              src={product?.image}
              alt={product?.name}
              className="lg:w-450px] lg:h-[450px] md:w-[350px] md:h-[450px] sm:w-[350px] sm:h-[220px] w-[350px] h-[220px] object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center items-start px-3 w-[350px] gap-5">
            <div className="flex flex-col gap-5">
              <h1 className="Lg:text-3xl md:text-3xl sm:text-2xl text-2xl text-color-pink font-semibold">{product?.name}</h1>
              <div className="text-color-pink font-normal text-sm flex flex-col gap-1">
                {product?.description !== '' ? <p>{product?.description}</p> : <p className="text-color-pink font-normal text-sm italic">No description</p>}
                <p>RATING | 314 Terjual</p>
              </div>

              <p className="text-color-pink font-bold text-lg">{Converter(price)}</p>
              <div className="flex gap-3 justify-evenly items-center bg-color-cream rounded-md text-color-pink py-1 w-[100px] font-semibold text-sm">
                <button onClick={() => setQty(qty - 1)}>
                  <FaMinus size={13} />
                </button>
                <p>{qty}</p>
                <button onClick={() => setQty(qty + 1)}>
                  <FaPlus size={13} />
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 mt-2">
              <Button
                label={isLoading ? 'Loading...' : 'Add to cart'}
                type={status === 'unauthenticated' ? 'button' : 'submit'}
                className="bg-color-red text-color-primary py-2 px-3 rounded-md font-semibold w-full opacity-70 hover:opacity-90"
                onClick={(e: any) => (status === 'unauthenticated' ? router.push(`/auth/login?callbackUrl=${router.asPath}`) : handleAddToCart(e))}
              />
              <Button
                label="Add to favorite"
                type="button"
                className="bg-color-prinmary text-color-pink border-color-pink border-2 py-2 px-3 rounded-md font-semibold w-full opacity-70 hover:opacity-90"
                // onClick={() => setproduct('')}
              />
            </div>
          </div>
        </div>
      </div>
      {alertGoToCart && (
        <Modal onClose={() => setAlertGoToCart(false)}>
          <div className="flex justify-center items-center text-color-pink flex-col gap-2">
            <ImHappy size={80} />
            <h1 className="font-semibold text-lg ">Yeayy, success add product to your cart !!</h1>
            <div className="flex flex-col w-full gap-4 mt-2">
              <Button
                label={'Go to Cart'}
                type={status === 'unauthenticated' ? 'button' : 'submit'}
                className="bg-color-red text-color-primary py-2 px-3 rounded-md font-semibold w-full opacity-70 hover:opacity-90"
                onClick={() => router.push('/member/cart')}
              />
              <Button
                label="Get Others Product"
                type="button"
                className="bg-color-prinmary text-color-pink border-color-pink border-2 py-2 px-3 rounded-md font-semibold w-full opacity-70 hover:opacity-90"
                onClick={() => setAlertGoToCart(false)}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DetailProductView;
