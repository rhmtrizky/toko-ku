import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import OrdersAdminView from '@/components/views/admin/Orders';
import orderService from '@/services/order';
import productService from '@/services/product';
import userService from '@/services/user';

type PropTypes = {
  setToaster: any;
};

const PageAdminUsers = (props: PropTypes) => {
  const { setToaster } = props;
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const session: any = useSession();

  const getAllOrders = async () => {
    try {
      if (session.data.accessToken) {
        const { data } = await orderService.getAllOrders(session.data?.accessToken);

        setOrders(data.data);
      } else {
        console.error('Access token is not available');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await productService.getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getAllUsers = async () => {
    try {
      if (session.data.accessToken) {
        const { data } = await userService.getAllUsers(session.data?.accessToken);
        setUsers(data.data);
      } else {
        console.error('Access token is not available');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      getAllOrders();
    }
  }, [session.status]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.status === 'authenticated') {
      getAllUsers();
    }
  }, [session.status]);
  return (
    <OrdersAdminView
      setToaster={setToaster}
      orders={orders}
      products={products}
      users={users}
    />
  );
};

export default PageAdminUsers;
