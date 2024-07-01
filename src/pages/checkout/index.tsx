import CheckoutPageView from '@/components/views/checkout';
import productService from '@/services/product';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type PropTypes = {
  setToaster: any;
  cart: any;
  setCart: any;
};

const CheckoutPage = (props: PropTypes) => {
  const { setToaster, cart, setCart } = props;
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState({});

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

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        try {
          const data = await userService.getProfile(session.data?.accessToken);
          setProfile(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProfile();
    }
  }, [session, profile]);

  return (
    <CheckoutPageView
      products={products}
      cart={cart}
      setToaster={setToaster}
      setCart={setCart}
      profile={profile}
      setProfile={setProfile}
    />
  );
};

export default CheckoutPage;
