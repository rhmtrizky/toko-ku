import Link from 'next/link';
import { BsCart3 } from 'react-icons/bs';
import Button from '../Button';

const PageCartEmpty = () => {
  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center flex flex-col gap-5 mt-[-40px]">
      <div className="text-color-pink">
        <BsCart3 size={150} />
      </div>
      <h1 className="lg:text-xl md:text-xl sm:text-md text-md text-color-pink font-semibold">{'KERANJANG KAMU MASIH KOSING NIH:('}</h1>
      <Link href={'/'}>
        <Button
          label="Go to shopping.."
          type="button"
          className="bg-color-red text-color-primary py-2 px-4 rounded-md font-semibold opacity-[90%]"
        />
      </Link>
    </div>
  );
};

export default PageCartEmpty;
