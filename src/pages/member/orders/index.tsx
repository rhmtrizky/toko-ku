import OrderMemberView from '@/components/views/member/Orders';
import orderService from '@/services/order';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MemberOrders = () => {
  const [orders, setOrders] = useState([]);
  const session: any = useSession();

  const getSessionOrders = async () => {
    try {
      if (session.data.accessToken) {
        const { data } = await orderService.getAllOrders(session.data?.accessToken);

        const orders = data?.data?.filter((order: any) => {
          return order?.userId === session?.data?.user?.id;
        });
        console.log(orders);

        setOrders(orders);
      } else {
        console.error('Access token is not available');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      getSessionOrders();
    }
  }, [session.status]);
  return <OrderMemberView orders={orders} />;
};

export default MemberOrders;
