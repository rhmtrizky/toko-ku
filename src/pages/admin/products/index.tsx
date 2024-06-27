import { useEffect, useState } from 'react';
import ProductsAdminView from '@/components/views/admin/Products';
import productService from '@/services/product';

type PropTypes = {
  setToaster: any;
};

const PageAdminProducts = (props: PropTypes) => {
  const { setToaster } = props;
  const [products, setProducts] = useState([]);

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

  return (
    <ProductsAdminView
      setToaster={setToaster}
      products={products}
    />
  );
};

export default PageAdminProducts;
