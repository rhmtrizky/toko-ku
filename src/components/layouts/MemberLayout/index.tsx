const SideBarItems = [
  {
    title: 'Dashboard',
    url: '/member',
    icon: 'bxs-dashboard',
  },
  {
    title: 'Orders',
    url: '/member/orders',
    icon: 'bxs-package',
  },
  {
    title: 'Profiles',
    url: '/member/profile',
    icon: 'bxs-user',
  },
];

type PropTypes = {
  children: React.ReactNode;
};
const MemberLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div className="flex ">
      <div className=" w-full px-10 py-7 h-auto min-h-screen">{children}</div>
    </div>
  );
};

export default MemberLayout;
