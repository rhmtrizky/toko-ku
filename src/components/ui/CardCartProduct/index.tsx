import Converter from '@/utils/Converter';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Button from '../Button';
import { MdOutlineDeleteOutline } from 'react-icons/md';

type PropTypes = {
  item: any;
  products: any;
  setUpdateCart?: any;
  setDeleteCart?: any;
};

const CardCartProduct = (props: PropTypes) => {
  const { item, products, setUpdateCart, setDeleteCart } = props;
  const [qty, setQty] = useState(item.qty);
  const [price, setPrice] = useState(0);

  const getCartProducts = (id: string) => {
    const product = products.find((product: any) => product.id === id);
    return product;
  };

  useEffect(() => {
    if (getCartProducts(item.id)?.price) {
      setPrice(parseInt(getCartProducts(item.id)?.price, 10) * qty);
    }
  }, [item, products]);

  useEffect(() => {
    if (qty < 1) {
      setQty(1);
    } else if (getCartProducts(item.id)?.price) {
      setPrice(parseInt(getCartProducts(item.id)?.price, 10) * qty);
    }
  }, [qty, item]);

  useEffect(() => {
    setQty(item.qty);
    if (getCartProducts(item.id)?.price) {
      setPrice(parseInt(getCartProducts(item.id)?.price, 10) * item.qty);
    }
  }, [item]);

  return (
    <div className="w-[90%] h-full lg:min-h-[200px] md:min-h-[180px] sm:min-h-[165px] min-h-[165px] bg-color-cream rounded-md flex justify-center items-center px-4 py-4 shadow-md">
      <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col justify-center items-center gap-2 w-full h-full gap-2">
        <div className="w-full flex justify-center md:justify-around sm:justify-around justify-around items-center lg:gap-4 md:gap-4 sm:gap-1 gap-1">
          <div className="w-[50%] h-full">
            <Image
              src={getCartProducts(item.id)?.image}
              alt="placeholder"
              width={160}
              height={160}
              className="object-cover rounded-md min-h-[160px]"
            />
          </div>
          <div className="w-[50%] text-color-pink flex flex-col justify-center items-start gap-0">
            <div className="w-full flex justify-between items-start">
              <p className="lg:text-lg md:text-[15px] sm:text-[15px] text-[15px] font-semibold">{getCartProducts(item.id)?.name}</p>
              <button
                onClick={() => setDeleteCart(item)}
                className="text-color-pink font-semibold lg:hidden md:hidden sm:flex flex"
              >
                <MdOutlineDeleteOutline size={23} />
              </button>
            </div>
            <div className="lg:max-h-[70px] md:max-h-[60px] sm:max-h-[40px] max-h-[40px] lg:flex md:flex sm:hidden hidden overflow-auto">
              {getCartProducts(item.id)?.description !== '' ? <p className="text-color-pink font-normal text-xs">{getCartProducts(item.id)?.description}</p> : <p className="text-color-pink font-normal text-sm italic">No description</p>}
            </div>
            <div className="lg:mt-[3px] md:mt-[3px] sm:mt-[-5px] mt-[-5px] mb-3">
              <p className="text-color-pink lg:hidden md:flex sm:flex flex">{getCartProducts(item.id)?.category}</p>
              <h1 className=" font-semibold text-color-pink lg:hidden md:flex sm:flex flex text-sm">{Converter(price)}</h1>
            </div>
            <div className="lg:hidden md:hidden sm:flex flex gap-3 justify-evenly items-center bg-color-cream rounded-md text-color-pink py-1 w-[100px] font-semibold text-sm">
              <button onClick={() => setUpdateCart(item)}>
                <FaMinus size={13} />
              </button>
              <p>{qty}</p>
              <button onClick={() => setUpdateCart(item)}>
                <FaPlus size={13} />
              </button>
            </div>
          </div>

          <div className="lg:hidden md:flex sm:hidden hidden gap-3 justify-evenly items-center bg-color-cream rounded-md text-color-pink py-1 w-[120px] font-semibold text-sm">
            <button onClick={() => setUpdateCart(item)}>
              <FaMinus size={13} />
            </button>
            <p>{qty}</p>
            <button onClick={() => setUpdateCart(item)}>
              <FaPlus size={13} />
            </button>
          </div>
          <div className="lg:hidden md:flex sm:hidden hidden gap-3 justify-end items-center bg-color-cream rounded-md text-color-pink py-1 w-[80%] font-semibold text-sm">
            <div className="flex justify-end items-center gap-2 text-sm">
              <Button
                label="Update"
                type="button"
                onClick={() => setUpdateCart(item)}
                className="bg-color-pink text-color-cream py-1 px-2 rounded"
              />
              <Button
                label="Delete"
                onClick={() => setDeleteCart(item)}
                className="bg-color-pink text-color-cream py-1 px-2 rounded"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full lg:flex md:hidden sm:hidden hidden flex-col  text-color-pink justify-center items-center pl-5 gap-1">
          <h1 className=" font-semibold">Variant :</h1>
          <p>{getCartProducts(item.id)?.category}</p>
        </div>
        <div className="w-full h-full lg:flex md:hidden sm:hidden hidden flex-col  text-color-pink justify-center items-center pl-5 gap-1 ">
          <div className="flex gap-3 justify-evenly items-center bg-color-cream rounded-md text-color-pink py-1 w-[100px] font-semibold text-sm">
            <button onClick={() => setUpdateCart(item)}>
              <FaMinus size={13} />
            </button>
            <p>{qty}</p>
            <button onClick={() => setUpdateCart(item)}>
              <FaPlus size={13} />
            </button>
          </div>
        </div>
        <div className="w-full h-full lg:flex md:hidden sm:hidden hidden flex-col  text-color-pink justify-center items-center pl-5 gap-1 ">
          <h1 className=" font-semibold">{Converter(price)}</h1>
          <div className="flex justify-end items-center gap-2 text-sm">
            <Button
              label="Update"
              type="button"
              onClick={() => setUpdateCart(item)}
              className="bg-color-pink text-color-cream py-1 px-2 rounded"
            />
            <Button
              label="Delete"
              onClick={() => setDeleteCart(item)}
              className="bg-color-pink text-color-cream py-1 px-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCartProduct;
