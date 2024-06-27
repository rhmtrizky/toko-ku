import { Input } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFavoriteBorder } from 'react-icons/md';
import { RiSearch2Line, RiShoppingBagLine } from 'react-icons/ri';
import SideBar from '../SideBar';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
  const { data } = useSession();
  const [sidebar, setSidebar] = useState(false);

  const SideBarItems = [
    {
      title: 'Home',
      url: '/',
      icon: 'bxs-dashboard',
    },
    {
      title: 'Products',
      url: '/products',
      icon: 'bx-cart-add',
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: 'bxs-group',
    },
    {
      title: 'Cart',
      url: '/cart',
      icon: 'bxs-group',
    },
    {
      title: 'Favorite',
      url: '/favorite',
      icon: 'bxs-group',
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'bxs-group',
    },
  ];

  return (
    <div className="relative">
      <div className="w-full h-20 flex items-center bg-color-primary">
        <div className="lg:flex md:hidden sm:hidden hidden w-full h-full">
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
        <div className="lg:hidden md:flex sm:flex flex justify-between w-full h-full items-center px-5">
          <button onClick={() => setSidebar(!sidebar)}>
            <GiHamburgerMenu size={23} />
          </button>
          <p className="text-color-pink font-semibold text-xl">LOGO TOKO</p>
        </div>
      </div>
      {sidebar && (
        <div className="lg:w-[0] md:w-[50%] sm:w-[70%] w-[70%] h-screen bg-color-primary absolute top-0 left-0 lg:hidden md:flex sm:flex flex bg-color-red">
          <SideBar
            lists={SideBarItems}
            title={`${data ? `Hallo, ${data?.user?.name?.split(' ')[0] || data?.user?.fullname?.split(' ')[0]}` : 'Please Login First...'}`}
            closeIcon={<IoClose />}
            onClick={() => setSidebar(!sidebar)}
            bgColor={'pink'}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
