import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import PageCartEmpty from '@/components/ui/PageCartEmpty';
import orderService from '@/services/order';
import productService from '@/services/product';
import userService from '@/services/user';
import Converter from '@/utils/Converter';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { ImHappy } from 'react-icons/im';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { RiErrorWarningLine } from 'react-icons/ri';

type PropTypes = {
  products: any;
  cart: any;
  setToaster: any;
  setCart: any;
  profile: any;
  setProfile: any;
  setProducts: any;
  setOrders: any;
};

const CheckoutPageView = (props: PropTypes) => {
  const { products, cart, setToaster, setCart, profile, setProfile, setProducts, setOrders } = props;
  const session: any = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [alertToPayOrder, setAlertToPayOrder] = useState(false);

  const getMainAddressIndex = () => {
    const addressIndex = profile?.data?.address?.findIndex((address: any) => address.isMain);
    return addressIndex !== -1 ? addressIndex : undefined;
  };

  const [selectAddress, setSelectAddress] = useState(getMainAddressIndex());

  const getAddress = () => {
    return profile?.data?.address ? profile.data.address[selectAddress] : null;
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

  const stockDecrement = () => {
    cart.forEach(async (item: any) => {
      const product = getCartProducts(item.id);
      if (product) {
        const { data } = await productService.updateProduct(product.id, { stock: product.stock - item.qty }, session.data?.accessToken);
        setProducts(data.data.data);
      }
    });
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
        const dataProfile = await userService.updateProfile(profile.data.id, { carts: [] }, session.data?.accessToken);
        setProfile(dataProfile.data);
        const carts = await userService.getCart(session?.data?.accessToken);
        setCart(carts.data.data);
        stockDecrement();
        const orders = await orderService.getAllOrders(session?.data?.accessToken);
        setOrders(orders.data.data);

        setToaster({
          variant: 'success',
          message: 'Success Checkout',
        });
        setAlertToPayOrder(true);

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
    <div className="w-full h-auto min-h-screen flex justify-center items-center">
      {cart !== undefined && cart?.length !== 0 ? (
        <div className="w-full min-h-screen h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mt-20 gap-4 px-5 pb-5">
          <div className="w-full h-auto p-7 flex flex-col justify-start items-center gap-3 mt-5 rounded-md relative bg-color-cream">
            <h1 className="text-2xl font-bold mb-4 text-color-pink">Contact Information</h1>
            <form
              action=""
              className="w-full flex flex-col justify-center items-center gap-3"
            >
              <div className="w-full">
                <label className="text-color-pink font-semibold">Fullname</label>
                <input
                  type="text"
                  name="fullname"
                  defaultValue={profile?.data?.fullname}
                  className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md "
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
                  className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
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
                  className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
                  style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-color-pink font-semibold">Address</label>
                <select
                  name="address"
                  id="address"
                  value={selectAddress}
                  className="text-color-red text-md"
                  style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#DDDDCF', width: '100%', height: '40px', border: 'none' }}
                  onChange={(e) => setSelectAddress(parseInt(e.target.value))}
                  required
                >
                  {profile?.data?.address?.map((address: any, index: number) => (
                    <option
                      value={index.toString()}
                      key={index}
                      style={{ padding: '8px', borderBottom: '1px solid #ccc', border: 'none' }}
                      className="flex flex-col gap-2 h-auto"
                    >
                      {`${address.recipient}, ${address.detailAddress}, ${address.province}, ${address.city}, ${address.district}, ${address.postalCode}, ${address.note}`}
                    </option>
                  ))}
                </select>
              </div>
              {selectAddress === undefined && (
                <p className="text-color-red text-sm flex justify-start items-center gap-1 w-full">
                  <span>
                    <RiErrorWarningLine size={20} />
                  </span>
                  Please set your address first at your profile
                </p>
              )}
              <div className="w-full">
                <label className="text-color-pink font-semibold">Receiver Name</label>
                <input
                  type="text"
                  name="recipient"
                  defaultValue={getAddress()?.recipient}
                  className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
                  style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
                  required
                  disabled
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <div className="w-full">
                  <label className="text-color-pink font-semibold">Province</label>
                  <input
                    type="text"
                    name="province"
                    defaultValue={getAddress()?.province}
                    className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
                    style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
                    required
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="text-color-pink font-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={getAddress()?.city}
                    className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
                    style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
                    required
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="text-color-pink font-semibold">District</label>
                  <input
                    type="text"
                    name="district"
                    defaultValue={getAddress()?.city}
                    className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
                    style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
                    required
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="text-color-pink font-semibold">Receiver Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    defaultValue={getAddress()?.phoneNumber}
                    className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
                    style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
                    required
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="w-full min-h-screen h-auto p-5 flex flex-col justify-start items-center gap-3 lg:mt-5 md:mt-5 sm:mt-0 mt-0 rounded-md relative bg-color-cream">
            <div className="w-full h-[600px] overflow-scroll flex-col justify-center items-center gap-3 lg:pb-20 md:pb-20 sm:pb-20 pb-20">
              <h1 className="text-color-pink font-semibold mb-3 text-xl">YOUR ORDER</h1>
              {cart.map((item: any, index: number) => (
                <div
                  className="w-full text-color-pink gap-3 shadow-md p-4 rounded-md mb-3"
                  style={{ backgroundColor: '#DDDDCF' }}
                  key={index}
                >
                  <div className="flex gap-3 justify-start items-center">
                    <Image
                      src={getCartProducts(item.id)?.image}
                      alt={getCartProducts(item.id)?.name}
                      width={130}
                      height={130}
                      className="rounded-lg object-cover lg:h-[170px] lg:w-[170px] md:h-[170px] md:w-[170px] sm:h-[130px] sm:w-[130px] h-[130px] w-[130px]"
                    />
                    <div className="w-full">
                      <p className="lg:text-lg md:text-[15px] sm:text-[15px] text-[15px] font-semibold">{getCartProducts(item.id)?.name}</p>
                      <div className="lg:max-h-[70px] md:max-h-[60px] sm:max-h-[50px] max-h-[50px] lg:flex md:flex sm:hidden hidden overflow-auto">
                        {getCartProducts(item.id)?.description !== '' ? <p className="text-color-pink font-normal text-xs">{getCartProducts(item.id)?.description}</p> : <p className="text-color-pink font-normal text-sm italic">No description</p>}
                      </div>
                      <div className="lg:mt-[3px] md:mt-[3px] sm:mt-[0px] mt-[0px] mb-3 ">
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
                {selectAddress !== undefined && selectAddress !== null ? (
                  <div>
                    <Button
                      label={isLoading ? 'Loading...' : 'Checkout'}
                      type="submit"
                      className="bg-color-cream text-color-red py-2 px-3 rounded-md font-semibold"
                      onClick={handleCheckout}
                    />
                  </div>
                ) : (
                  <Button
                    label={isLoading ? 'Loading...' : 'Checkout'}
                    type="submit"
                    className="bg-color-cream text-color-red py-2 px-3 rounded-md opacity-50 font-semibold"
                    onClick={handleCheckout}
                    disabled
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageCartEmpty />
      )}
      {alertToPayOrder && (
        <Modal onClose={() => setAlertToPayOrder(true)}>
          <div className="flex justify-center items-center text-color-pink flex-col gap-2 max-w-[370px]">
            <IoCheckmarkDoneCircleSharp size={80} />
            <h1 className="font-semibold text-lg text-center flex flex-col">
              Yeayy, success checkout items. <span className="text-color-red">Next step is payment items !!</span>
            </h1>
            <div className="flex flex-col w-full gap-4 mt-2">
              <Button
                label="Go to payment"
                type="button"
                className="bg-color-red text-color-primary border-color-pink border-2 py-2 px-3 rounded-md font-semibold w-full opacity-70 hover:opacity-90"
                onClick={() => {
                  setAlertToPayOrder(false);
                  router.push('/member/orders');
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CheckoutPageView;
