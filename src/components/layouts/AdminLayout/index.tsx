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
];

type PropTypes = {
  children: React.ReactNode;
};
const AdminLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div>
      <SideBar lists={SideBarItems} />
      {children}
    </div>
  );
};

export default AdminLayout;
