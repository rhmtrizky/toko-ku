import DetailProductView from '@/components/views/products/detailProduct';
import productService from '@/services/product';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type PropTypes = {
  setToaster: any;
  cart: any;
  setCart: any;
};

const DetailProductPage = (props: PropTypes) => {
  const { setToaster, cart, setCart } = props;
  const { id } = useRouter().query;
  const [product, setProduct] = useState<any>({});
  console.log(id);

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

  return (
    <DetailProductView
      product={product}
      productId={id}
      cart={cart}
      setToaster={setToaster}
      setCart={setCart}
    />
  );
};

export default DetailProductPage;
