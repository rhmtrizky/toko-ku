import ProductsView from '@/components/views/products';
import productService from '@/services/product';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const kalungProducts = products.filter((product: any) => product.category === 'kalung');
  const cincinProducts = products.filter((product: any) => product.category === 'cincin');

  const getAllProducts = async () => {
    try {
      const { data } = await productService.getAllProducts();
      setProducts(data.data);
      console.log(data.data);
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
      kalungProducts={kalungProducts}
    />
  );
}
