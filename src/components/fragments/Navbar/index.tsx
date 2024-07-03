import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { FiPackage, FiUser } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFavoriteBorder } from 'react-icons/md';
import { RiSearch2Line, RiShoppingBagLine } from 'react-icons/ri';
import SideBar from '../SideBar';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

type PropTypes = {
  cart: any;
  orders: any;
};

const Navbar = (props: PropTypes) => {
  const { cart, orders } = props;
  const { data, status }: any = useSession();
  const [sidebar, setSidebar] = useState(false);

  const filterOrdersUnpaid = orders.filter((order: any) => order.status === 'order');

  const SideBarItems = [
    {
      title: 'Home',
      url: '/',
      icon: 'bxs-dashboard',
    },
    {
      title: 'Products',
      url: '/product',
      icon: 'bx-cart-add',
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: 'bxs-group',
    },
    {
      title: 'Cart',
      url: '/member/cart',
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
      <div className="w-full h-20 flex items-center bg-color-cream">
        <div className="lg:flex md:hidden sm:hidden hidden w-full h-full">
          <div className="flex w-1/2 h-full">
            <Link
              href={'/'}
              className="flex w-1/4 h-full items-center justify-center"
            >
              <p className="text-color-red font-semibold text-xl cursor-pointer">LOGO TOKO</p>
            </Link>
            <div className="flex w-3/4 h-full items-center justify-evenly items-center px-5 text-color-red font-normal text-[14px]">
              <Link href={'/'}>
                <p>HOME</p>
              </Link>
              <p>PRODUCTS</p>
              <p>CATEGORIES</p>
            </div>
          </div>
          <div className="flex w-1/2 justify-end items-center h-full px-7 gap-5">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search your product..."
                className=" text-color-red w-80"
                variant="underlined"
                color="danger"
                style={{ backgroundColor: 'transparent' }}
              />
              <div className="absolute top-2 right-2 text-color-red">
                <RiSearch2Line size={20} />
              </div>
            </div>
            <div className="flex gap-1 items-center text-color-red">
              <MdFavoriteBorder size={20} />

              <Link
                href={'/member/cart'}
                className="w-[35px] h-[40px] relative flex flex-col gap-4 justify-center items-center"
              >
                {cart?.length !== 0 && cart !== undefined ? <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">{cart?.length}</p> : <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">0</p>}

                <RiShoppingBagLine size={20} />
              </Link>
              <Link
                href={'/member/orders'}
                className="w-[35px] h-[40px] relative flex flex-col gap-4 justify-center items-center"
              >
                {filterOrdersUnpaid?.length !== 0 && filterOrdersUnpaid !== undefined ? (
                  <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">{filterOrdersUnpaid?.length}</p>
                ) : (
                  <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">0</p>
                )}

                <FiPackage size={20} />
              </Link>
              <Dropdown>
                <DropdownTrigger>
                  <button style={{ outline: 'none' }}>
                    <FiUser size={20} />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">
                    <Link href={'/member/profile'}>My Profile</Link>
                  </DropdownItem>

                  <DropdownItem key="copy">{status === 'authenticated' ? <button onClick={() => signOut()}>Logout</button> : <button onClick={() => signIn()}>Login</button>}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {data &&
                (!data?.user?.hasOwnProperty('fullname') ? (
                  <p className="font-semibold text-sm">
                    Hallo, <span className="font-bold text-color-red">{data?.user?.name?.split(' ')[0]}</span>
                  </p>
                ) : (
                  <p className="font-semibold text-sm">
                    Hallo, <span className="font-bold text-color-red">{data?.user?.fullname?.split(' ')[0]}</span>
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
          <div className="flex gap-3 items-center">
            <button onClick={() => setSidebar(!sidebar)}>
              <GiHamburgerMenu size={20} />
            </button>
            <Link href={'/'}>
              <p className="text-color-red font-semibold text-lg cursor-pointer">LOGO TOKO</p>
            </Link>
          </div>
          <div className="flex lg:gap-3 md:gap-3 sm:gap-1 gap-1 items-center text-color-red">
            <MdFavoriteBorder size={20} />
            <Link
              href={'/member/cart'}
              className="w-[35px] h-[40px] relative flex flex-col gap-4 justify-center items-center"
            >
              {cart?.length !== 0 && cart !== undefined ? <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">{cart?.length}</p> : <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">0</p>}

              <RiShoppingBagLine size={20} />
            </Link>

            <Link
              href={'/member/orders'}
              className="w-[35px] h-[40px] relative flex flex-col gap-4 justify-center items-center"
            >
              {filterOrdersUnpaid?.length !== 0 && filterOrdersUnpaid !== undefined ? (
                <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">{filterOrdersUnpaid?.length}</p>
              ) : (
                <p className="absolute top-0 right-0 bg-color-pink rounded-lg w-[18px] text-color-primary flex justify-center text-sm">0</p>
              )}

              <FiPackage size={20} />
            </Link>
            <Dropdown>
              <DropdownTrigger>
                <button style={{ outline: 'none' }}>
                  <FiUser size={20} />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <Link href={'/member/profile'}>My Profile</Link>
                </DropdownItem>

                <DropdownItem key="copy">{status === 'authenticated' ? <button onClick={() => signOut()}>Logout</button> : <button onClick={() => signIn()}>Login</button>}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* {data &&
              (!data?.user?.hasOwnProperty('fullname') ? (
                <p className="font-semibold text-sm">
                  Hallo, <span className="font-bold text-color-red">{data?.user?.name?.split(' ')[0]}</span>
                </p>
              ) : (
                <p className="font-semibold text-sm">
                  Hallo, <span className="font-bold text-color-red">{data?.user?.fullname?.split(' ')[0]}</span>
                </p>
              ))} */}
          </div>
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
