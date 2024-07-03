import CardOrders from '@/components/ui/CardOrders';
import productService from '@/services/product';
import { useEffect, useState } from 'react';

type PropTypes = {
  orders: any;
};

const OrderMemberView = (props: PropTypes) => {
  const { orders } = props;
  console.log(orders);

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
    <div className="w-full h-auto min-h-screen mt-20 flex justify-center items-center">
      <div className="w-full flex flex-col gap-4 justify-center items-center pt-5 pb-20">
        {orders.map((item: any, index: number) => (
          <CardOrders
            item={item}
            key={index}
            products={products}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderMemberView;
