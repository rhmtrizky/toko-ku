import DetailProductView from '@/components/views/products/detailProduct';
import productService from '@/services/product';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type PropTypes = {
  setToaster: any;
};

const DetailProductPage = (props: PropTypes) => {
  const { setToaster } = props;
  const { id } = useRouter().query;
  const session: any = useSession();
  const [product, setProduct] = useState<any>({});
  const [cart, setCart] = useState([]);

  const getDetailProduct = async (id: string) => {
    try {
      const { data } = await productService.getDetailProduct(id);
      setProduct(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  return (
    <DetailProductView
      product={product}
      productId={id}
      cart={cart}
      setToaster={setToaster}
    />
  );
};

export default DetailProductPage;
