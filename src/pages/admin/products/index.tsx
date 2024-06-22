import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProductsAdminView from '@/components/views/admin/Products';
import productService from '@/services/product';

type PropTypes = {
  setToaster: any;
};

const PageAdminProducts = (props: PropTypes) => {
  const { setToaster } = props;
  const [products, setProducts] = useState([]);
  const session: any = useSession();

  const getAllProducts = async () => {
    try {
      if (session?.data?.accessToken) {
        const { data } = await productService.getAllProducts(session?.data?.accessToken);
        setProducts(data.data);
      } else {
        console.error('Access token is not available');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (session?.status === 'authenticated') {
      getAllProducts();
    }
  }, [session?.status]);

  return (
    <ProductsAdminView
      setToaster={setToaster}
      products={products}
    />
  );
};

export default PageAdminProducts;
