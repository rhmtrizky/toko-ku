import Converter from '@/utils/Converter';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

type PropTypes = {
  item: any;
  products: any;
  index: any;
};

const CardCartProduct = (props: PropTypes) => {
  const { item, index, products } = props;
  const getCartProducts = (id: string) => {
    const product = products.find((product: any) => product.id === id);
    return product;
  };

  const [qty, setQty] = useState(item.qty);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (getCartProducts(item.id)?.price) {
      setPrice(parseInt(getCartProducts(item.id)?.price, 10) * qty);
    }
  }, [item, qty]);

  useEffect(() => {
    if (qty < 1) {
      setQty(1);
    } else if (getCartProducts(item.id)?.price) {
      setPrice(parseInt(getCartProducts(item.id)?.price, 10) * qty);
    }
  }, [qty, item]);

  return (
    <div
      className="w-[90%] h-full lg:min-h-[200px] md:min-h-[180px] sm:min-h-[165px] min-h-[165px] bg-color-cream rounded-md flex justify-center items-center px-10 py-2"
      key={index}
    >
      <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col justify-center items-center gap-2 w-full h-full gap-2">
        <div className="w-full flex justify-center md:justify-around sm:justify-around justify-around items-center lg:gap-4 md:gap-4 sm:gap-4 gap-4">
          <div className="w-[40%] h-full">
            <Image
              src={getCartProducts(item.id)?.image}
              alt="placeholder"
              width={160}
              height={160}
              className="object-cover rounded-md max-h-[160px]"
            />
          </div>
          <div className="w-[60%] text-color-pink flex flex-col justify-center items-start gap-1">
            <p className="lg:text-lg md:text-[15px] sm:text-[15px] text-[15px] font-semibold">{getCartProducts(item.id)?.name}</p>
            <p className="text-xs lg:flex md:hidden sm:hidden hidden max">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam itaque.</p>
            <p className="text-color-pink lg:hidden md:flex sm:flex flex">{getCartProducts(item.id)?.category}</p>
            <h1 className=" font-semibold text-color-pink lg:hidden md:flex sm:flex flex">{Converter(price)}</h1>
            <div className="lg:hidden md:hidden sm:flex flex gap-3 justify-evenly items-center bg-color-cream rounded-md text-color-pink py-1 w-[100px] font-semibold text-sm">
              <button onClick={() => setQty(qty - 1)}>
                <FaMinus size={13} />
              </button>
              <p>{qty}</p>
              <button onClick={() => setQty(qty + 1)}>
                <FaPlus size={13} />
              </button>
            </div>
          </div>

          <div className="lg:hidden md:flex sm:hidden hidden gap-3 justify-evenly items-center bg-color-cream rounded-md text-color-pink py-1 w-[120px] font-semibold text-sm">
            <button onClick={() => setQty(qty - 1)}>
              <FaMinus size={13} />
            </button>
            <p>{qty}</p>
            <button onClick={() => setQty(qty + 1)}>
              <FaPlus size={13} />
            </button>
          </div>
          <div className="lg:hidden md:flex sm:hidden hidden gap-3 justify-end items-center bg-color-cream rounded-md text-color-pink py-1 w-[80%] font-semibold text-sm">
            <button onClick={() => setQty(qty - 1)}>Update</button>
            <button onClick={() => setQty(qty + 1)}>Delete</button>
          </div>
        </div>
        <div className="w-full h-full lg:flex md:hidden sm:hidden hidden flex-col  text-color-pink justify-center items-center pl-5 gap-1 ">
          <h1 className=" font-semibold">Variant :</h1>
          <p>{getCartProducts(item.id)?.category}</p>
        </div>
        <div className="w-full h-full lg:flex md:hidden sm:hidden hidden flex-col  text-color-pink justify-center items-center pl-5 gap-1 ">
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
        <div className="w-full h-full lg:flex md:hidden sm:hidden hidden flex-col  text-color-pink justify-center items-center pl-5 gap-1 ">
          <h1 className=" font-semibold">{Converter(price)}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardCartProduct;
