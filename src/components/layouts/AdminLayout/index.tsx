import SideBar from '@/components/fragments/SideBar';

const SideBarItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: 'bxs-dashboard',
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
    <div className="flex ">
      <SideBar
        lists={SideBarItems}
        title="Admin Panel"
      />
      <div className="w-full px-10 py-7">{children}</div>
    </div>
  );
};

export default AdminLayout;
