import { Input } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { FiUser } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';
import { RiSearch2Line, RiShoppingBagLine } from 'react-icons/ri';

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="w-full h-20 flex items-center bg-color-primary">
      <div className="flex w-1/2 h-full">
        <div className="flex w-1/4 h-full items-center justify-center">
          <p className="text-color-pink font-semibold text-xl">LOGO TOKO</p>
        </div>
        <div className="flex w-3/4 h-full items-center justify-evenly items-center px-5 text-color-pink font-normal text-[15px]">
          <p>HOME</p>
          <p>PRODUCTS</p>
          <p>CATEGORIES</p>
        </div>
      </div>
      <div className="flex w-1/2 justify-end items-center h-full px-7 gap-5">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search your product..."
            className=" text-color-pink w-80"
            variant="underlined"
            color="danger"
            style={{ backgroundColor: 'transparent' }}
          />
          <div className="absolute top-2 right-2 text-color-pink">
            <RiSearch2Line size={23} />
          </div>
        </div>
        <div className="flex gap-3 items-center text-color-pink">
          <MdFavoriteBorder size={23} />
          <RiShoppingBagLine size={23} />
          <FiUser size={23} />
          {data &&
            (!data?.user?.hasOwnProperty('fullname') ? (
              <p className="font-semibold text-sm">
                Hallo, <span className="font-bold text-color-pink">{data?.user?.name?.split(' ')[0]}</span>
              </p>
            ) : (
              <p className="font-semibold text-sm">
                Hallo, <span className="font-bold text-color-pink">{data?.user?.fullname?.split(' ')[0]}</span>
              </p>
            ))}
        </div>

        {/* <button
          className="bg-color-primary text-color-dark font-semibold py-1 px-3 rounded-md"
          onClick={() => (data ? signOut() : signIn())}
        >
          {data ? 'Log Out' : 'Log In'}
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
