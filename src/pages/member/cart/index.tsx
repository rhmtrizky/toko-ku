import CartPageView from '@/components/views/member/Carts';
import productService from '@/services/product';
import { useEffect, useState } from 'react';

type PropTypes = {
  setToaster: any;
  cart: any;
  setCart: any;
};

const CartsPage = (props: PropTypes) => {
  const { setToaster, cart, setCart } = props;
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
    <CartPageView
      products={products}
      cart={cart}
      setToaster={setToaster}
      setCart={setCart}
    />
  );
};

export default CartsPage;
