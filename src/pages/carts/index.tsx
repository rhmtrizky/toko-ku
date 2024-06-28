import CartPageView from '@/components/views/carts';
import productService from '@/services/product';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const CartsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const getAllProducts = async () => {
    try {
      const { data } = await productService.getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getCarts = async (token: string) => {
    try {
      const carts = await userService.getCart(token);
      setCart(carts.data.data);
    } catch (error) {
      console.log(error, 'failed get cart');
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      getCarts(session.data.accessToken);
    }
  }, [session]);
  return (
    <CartPageView
      products={products}
      cart={cart}
    />
  );
};

export default CartsPage;
