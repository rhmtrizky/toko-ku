import SideBar from '@/components/fragments/SideBar';

const SideBarItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: 'bxs-dashboard',
  },

  {
    title: 'Orders',
    url: '/admin/orders',
    icon: 'bx-cart-add',
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: 'bx-cart-add',
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: 'bxs-group',
  },
  {
    title: 'My Account',
    url: '/member',
    icon: 'bxs-group',
  },
];

type PropTypes = {
  children: React.ReactNode;
};
const AdminLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <>
      <div className="flex lg:flex md:flex sm:hidden hidden">
        <SideBar
          lists={SideBarItems}
          title="Admin Panel"
          bgColor={'pink'}
        />
        <div className="ml-[20%] w-full px-10 py-7 h-auto min-h-screen">{children}</div>
      </div>
      <div className="w-full h-screen lg:hidden md:hidden sm:flex flex justify-center items-center">
        <h1>For admin panel, you can open in dekstop only</h1>
      </div>
    </>
  );
};

export default AdminLayout;
