import OrderMemberView from '@/components/views/member/Orders';

type PropTypes = {
  orders: any[];
  setOrders: any;
  setToaster: any;
};

const MemberOrders = (props: PropTypes) => {
  const { orders, setOrders, setToaster } = props;

  return (
    <OrderMemberView
      orders={orders}
      setToaster={setToaster}
      setOrders={setOrders}
    />
  );
};

export default MemberOrders;
