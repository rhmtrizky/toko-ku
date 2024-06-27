import DetailProductView from '@/components/views/products/detailProduct';
import productService from '@/services/product';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetailProductPage = () => {
  const { id } = useRouter().query;

  const [product, setProduct] = useState<any>({});

  const getDetailProduct = async (id: string) => {
    try {
      const { data } = await productService.getDetailProduct(id);
      setProduct(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  return <DetailProductView product={product} />;
};

export default DetailProductPage;
