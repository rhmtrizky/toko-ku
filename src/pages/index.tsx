import ProductsView from '@/components/views/products';
import productService from '@/services/product';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const gelangProducts = products.filter((product: any) => product.category === 'gelang');
  const cincinProducts = products.filter((product: any) => product.category === 'cincin');

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
    <ProductsView
      cincinProducts={cincinProducts}
      gelangProducts={gelangProducts}
    />
  );
}
