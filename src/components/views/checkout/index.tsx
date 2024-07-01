import Button from '@/components/ui/Button';
import CardCartProduct from '@/components/ui/CardCartProduct';
import InputUi from '@/components/ui/Input';
import orderService from '@/services/order';
import userService from '@/services/user';
import Converter from '@/utils/Converter';
import { Select, SelectItem } from '@nextui-org/react';
import { log } from 'console';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa';

type PropTypes = {
  products: any;
  cart: any;
  setToaster: any;
  setCart: any;
  profile: any;
  setProfile: any;
};

const CheckoutPageView = (props: PropTypes) => {
  const { products, cart, setToaster, setCart, profile, setProfile } = props;
  const session: any = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log(products);

  const getMainAddressIndex = () => {
    const addressIndex = profile?.data?.address?.findIndex((address: any) => address.isMain);
    return addressIndex !== -1 ? addressIndex : 0;
  };

  const [selectAddress, setSelectAddress] = useState(getMainAddressIndex());

  const getAddress = () => {
    return profile.data?.address[selectAddress];
  };

  const getCartProducts = (id: string) => {
    const product = products.find((product: any) => product.id === id);
    return product;
  };

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

  const randomId = () => {
    return 'BDD-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  useEffect(() => {
    setSelectAddress(getMainAddressIndex());
  }, [profile]);

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      orderId: randomId(),
      userId: profile.data.id,
      address: getAddress(),
      status: 'order',
      items: cart,
    };

    try {
      const result = await orderService.addOrder(data, session?.data?.accessToken);
      if (result.status === 200) {
        const data = await userService.updateProfile(profile.data.id, { carts: [] }, session.data?.accessToken);
        setProfile(data.data);
        const carts = await userService.getCart(session?.data?.accessToken);
        setCart(carts.data.data);
        setToaster({
          variant: 'success',
          message: 'Success Checkout',
        });
        router.push('/');
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      setToaster({
        variant: 'error',
        message: 'Failed Checkout',
      });
    }
  };

  return (
    <div className="w-full min-h-screen h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mt-20 gap-4 px-5 pb-5">
      <div className="w-full h-auto p-5 flex flex-col justify-start items-center gap-3 mt-5 rounded-md relative bg-color-cream">
        <h1 className="text-2xl font-bold mb-4 text-color-pink">Contact Information</h1>
        <form
          action=""
          className="flex flex-col justify-center items-center gap-3"
        >
          <div className="w-full">
            <label className="text-color-pink font-semibold">Fullname</label>
            <input
              type="text"
              name="fullname"
              defaultValue={profile?.data?.fullname}
              className="w-full py-2 px-3 shadow-md rounded-md text-color-dark text-md "
              style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
              required
            />
          </div>
          <div className="w-full">
            <label className="text-color-pink font-semibold">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={profile.data?.email}
              className="w-full py-2 px-3 shadow-md rounded-md text-color-dark text-md"
              style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
              required
              disabled
            />
          </div>
          <div className="w-full">
            <label className="text-color-pink font-semibold">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              defaultValue={profile?.data?.phoneNumber}
              className="w-full py-2 px-3 shadow-md rounded-md text-color-dark text-md"
              style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
              required
            />
          </div>
          <div className="w-full">
            <label className="text-color-pink font-semibold">Address</label>
            <select
              name="address"
              id="address"
              // defaultSelectedKeys={selectAddress ? [selectAddress.toString()] : []}
              value={selectAddress}
              className="text-color-dark text-md"
              style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#DDDDCF', width: '100%', height: '40px', border: 'none' }}
              onChange={(e) => setSelectAddress(parseInt(e.target.value))}
            >
              {profile?.data?.address?.map((address: any, index: number) => (
                <option
                  value={index.toString()}
                  key={index}
                  style={{ padding: '8px', borderBottom: '1px solid #ccc', border: 'none' }}
                  className="flex flex-col gap-2 h-auto"
                >
                  {`${address.recipient}, ${address.detailAddress}, ${address.note}`}
                  {/* <div>
                      <p>Recipient: {address.recipient}</p>
                      <p>Detail Address: {address.recipient}</p>
                      <p>Note : {address.note}</p>
                    </div> */}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className="w-full min-h-screen h-auto p-5 flex flex-col justify-start items-center gap-3 lg:mt-5 md:mt-5 sm:mt-0 mt-0 rounded-md relative bg-color-cream">
        <div className="w-full h-[600px] overflow-scroll flex-col justify-center items-center gap-3 lg:pb-20 md:pb-20 sm:pb-20 pb-20">
          {cart.map((item: any, index: number) => (
            <div
              className="w-full text-color-pink gap-3 shadow-md p-4 rounded-md mb-3"
              style={{ backgroundColor: '#DDDDCF' }}
              key={index}
            >
              <div className="flex gap-3 justify-start items center">
                <Image
                  src={getCartProducts(item.id)?.image}
                  alt={getCartProducts(item.id)?.name}
                  width={130}
                  height={110}
                  className="rounded-lg object-cover"
                />
                <div className="w-full">
                  <p className="lg:text-lg md:text-[15px] sm:text-[15px] text-[15px] font-semibold">{getCartProducts(item.id)?.name}</p>
                  <div className="lg:max-h-[70px] md:max-h-[60px] sm:max-h-[40px] max-h-[40px] lg:flex md:flex sm:hidden hidden overflow-auto">
                    {getCartProducts(item.id)?.description !== '' ? <p className="text-color-pink font-normal text-xs">{getCartProducts(item.id)?.description}</p> : <p className="text-color-pink font-normal text-sm italic">No description</p>}
                  </div>
                  <div className="lg:mt-[3px] md:mt-[3px] sm:mt-[-5px] mt-[-5px] mb-3 ">
                    <p className="text-color-pink lg:flex md:flex sm:flex flex">{getCartProducts(item.id)?.category}</p>
                    <h1 className=" font-semibold text-color-pink text-sm">{Converter(getCartProducts(item.id)?.price)}</h1>
                    <p className="text-sm">Qty: {item.qty}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-1/5 absolute bottom-0 bg-color-pink rouhnded-md p-3 text-color-primary flex flex-col gap-1">
          <h1 className=" font-semibold text-lg rounded-md ">Order Summary </h1>
          <div className="w-full flex justify-between items-center">
            <div className=" text-md">
              <p>Total Items : ({cart?.length})</p>
              <p>Total Quantity : ({getTotalItems()})</p>
              <p className="font-bold">Total Price : {Converter(getTotalPrice())}</p>
            </div>
            <Button
              label={isLoading ? 'Loading...' : 'Checkout'}
              type="submit"
              className="bg-color-cream text-color-red py-2 px-3 rounded-md mt-3"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageView;
