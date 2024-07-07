import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { uploadFile } from '@/lib/firebase/service';
import orderService from '@/services/order';
import Converter from '@/utils/Converter';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import briLogo from '../../../../../../public/bri-logo.png';
import { RiErrorWarningLine } from 'react-icons/ri';

type PropTypes = {
  modalPayOrder: any;
  setModalPayOrder: any;
  setToaster: any;
  getCartProducts: (id: string) => any;
  setOrders: any;
  getDetailOrder: (id: string) => any;
  detailOrder: any;
};

const ModalPayOrder = (props: PropTypes) => {
  const { modalPayOrder, setModalPayOrder, setToaster, getCartProducts, setOrders, getDetailOrder, detailOrder } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { data: session }: any = useSession();
  const [price, setPrice] = useState(0);

  console.log(imageFile);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    detailOrder?.items?.forEach((item: any) => {
      const product = getCartProducts(item.id);
      if (product) {
        totalPrice += product.price * item.qty;
      }
    });
    return totalPrice;
  };

  useEffect(() => {
    getDetailOrder(modalPayOrder);
  }, [modalPayOrder]);

  useEffect(() => {
    setPrice(calculateTotalPrice());
  }, [detailOrder]);

  const handlePayOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = { status: 'paid' };

    try {
      if (imageFile) {
        const result = await orderService.updateOrder(modalPayOrder, data, session?.accessToken);
        console.log(result);
        if (result.status === 200 && imageFile) {
          await handleImageUpload(imageFile);
        } else {
          updateOrderSuccess(result);
        }
      } else {
        setToaster({
          variant: 'error',
          message: 'Please upload payment proof first!.',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      setToaster({
        variant: 'error',
        message: 'Failed to update order. Please try again.',
      });
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    await uploadFile(
      modalPayOrder,
      'orders',
      'payment',
      file,
      (status: boolean, progressPercent: number) => {
        console.log(`Upload progress: ${progressPercent}%`);
      },
      async (status: boolean, downloadURL: string, e: any) => {
        if (status) {
          try {
            const data = { paymentProof: downloadURL };
            const result = await orderService.updateOrder(modalPayOrder, data, session?.accessToken);
            updateOrderSuccess(result);
          } catch (error) {
            console.error('Error updating order with payment proof:', error);
            setToaster({
              variant: 'error',
              message: 'Successfully added product, but failed to upload image. Size should be less than 1MB.',
            });
            setIsLoading(false);
          }
        } else {
          setToaster({
            variant: 'error',
            message: 'Size of image should be less than 1MB.',
          });
          setIsLoading(false);
          e.target[0].value = '';
        }
      }
    );
  };

  const updateOrderSuccess = async (result: any) => {
    if (result.status === 200) {
      const { data } = await orderService.getAllOrders(session?.accessToken);
      setOrders(data.data);
      setToaster({
        variant: 'success',
        message: 'Successfully updated order to be paid.',
      });
      setModalPayOrder('');
    } else {
      setToaster({
        variant: 'error',
        message: 'Failed to update order to be paid.',
      });
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setModalPayOrder('')}>
      <form
        className="flex flex-col gap-2"
        onSubmit={handlePayOrder}
      >
        <div className="w-full flex flex-col">
          <label className="text-color-red font-semibold">Order Id</label>
          <input
            type="fullname"
            name="fullname"
            defaultValue={detailOrder?.orderId}
            className="w-full py-2 px-3  bg-color-cream shadow-md rounded-md text-color-red"
            style={{ outline: 'none' }}
            disabled
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="text-color-red font-semibold">Your Order Items</label>
          {detailOrder?.items?.map((item: any, index: number) => (
            <div
              className=" text-color-pink gap-3 shadow-md p-4 rounded-md mb-3 max-w-[700px]"
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
        <div className="w-full">
          <label className="text-color-pink font-semibold">Receiver Name</label>
          <input
            type="text"
            name="recipient"
            defaultValue={detailOrder?.address?.recipient}
            className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
            style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
            required
            disabled
          />
        </div>
        <div className="w-full">
          <label className="text-color-pink font-semibold">Receiver Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            defaultValue={detailOrder?.address?.phoneNumber}
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
              defaultValue={detailOrder?.address?.province}
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
              defaultValue={detailOrder?.address?.city}
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
              defaultValue={detailOrder?.address?.city}
              className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
              style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
              required
              disabled
            />
          </div>
          <div className="w-full">
            <label className="text-color-pink font-semibold">Postal Code</label>
            <input
              type="number"
              name="phoneNumber"
              defaultValue={detailOrder?.address?.postalCode}
              className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
              style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
              required
              disabled
            />
          </div>
        </div>
        <div className="w-full">
          <label className="text-color-pink font-semibold">Detail Address</label>
          <input
            type="text"
            name="recipient"
            defaultValue={detailOrder?.address?.detailAddress}
            className="w-full py-2 px-3 shadow-md rounded-md text-color-red text-md"
            style={{ outline: 'none', backgroundColor: '#DDDDCF' }}
            required
            disabled
          />
        </div>
        <div className=" w-full h-full py-2 px-2 border-2 border-color-gray rounded-md mt-2  flex justify-between items-center">
          <h1 className="text-color-dark font-semibold">
            The amount you have to pay : <span className="text-color-red font-bold">{Converter(price)}</span>
          </h1>
          {/* <span className="text-color-red font-bold">{formatTime(remainingTime)}</span> */}
        </div>
        <div className="relative w-full h-full py-2 flex flex-col justify-center items-start px-2 border-2 border-color-gray rounded-md mt-2">
          <h1 className="text-color-dark font-semibold">Rekening Account</h1>
          <div className="flex justify-center items-center gap-2 text-color-dark mt-2">
            <Image
              src={briLogo}
              width={70}
              height={70}
              alt="BRI"
            />
            <p>57745438864 - Bead Diary</p>
          </div>
          <div className="flex justify-center items-center gap-2 text-color-red mt-2">
            <RiErrorWarningLine size={20} />
            <p className="text-color-red text-sm">Please to be attention, Bead Diary only have one Bank Account.</p>
          </div>
        </div>
        <div className="flex flex-col mt-1">
          <h1 className="text-color-dark font-semibold">Upload Bukti Transfer</h1>

          <div className="relative w-full h-full py-2 flex flex-col justify-center items-center border-2 border-color-gray rounded-md mt-2">
            {imageFile ? (
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  src={URL.createObjectURL(imageFile)}
                  alt="image"
                  width={150}
                  height={120}
                />
                <p className="text-center text-sm p-1 bg-color-gray rounded-md">{imageFile.name}</p>
              </div>
            ) : (
              <>
                <BsUpload
                  size={40}
                  className="text-color-gray2 font-bold"
                />
                <Button
                  label="Upload Image"
                  type="button"
                  className="bg-color-gray text-color-dark py-2 px-3 rounded-md mt-3 text-sm"
                >
                  Upload Image
                </Button>
                <div className="text-xs flex justify-center flex-col items-center text-center mt-2">
                  <p>
                    Maximum image size is <b>1 MB</b>
                  </p>
                  <p>
                    Accepted formats: <b>.jpg, .jpeg, .png</b>
                  </p>
                </div>
                <input
                  className="absolute bg-color-gray z-0 bottom-0 left-0 w-full h-full opacity-0"
                  type="file"
                  name="image"
                  onChange={(e: any) => setImageFile(e.target.files[0])}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end w-full gap-3">
          <Button
            label={'Cancel'}
            className=" text-color-dark py-1 px-3 rounded-md mt-3 border-2 border-color-gray"
            disabled={isLoading}
            onClick={() => setModalPayOrder('')}
          />
          {imageFile !== null ? (
            <Button
              label={isLoading ? 'Uploading...' : 'Submit'}
              type="submit"
              className="bg-color-blue text-color-primary py-1 px-3 rounded-md mt-3"
              disabled={isLoading}
            />
          ) : (
            <Button
              label={isLoading ? 'Uploading...' : 'Submit'}
              type="button"
              className="bg-color-blue text-color-primary py-1 px-3 rounded-md mt-3 opacity-70"
              disabled
            />
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalPayOrder;
