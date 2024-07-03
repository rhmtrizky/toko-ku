import CardOrders from '@/components/ui/CardOrders';
import productService from '@/services/product';
import { useEffect, useState } from 'react';
import ModalPayOrder from './ModalPayOrder';
import { Tabs, Tab } from '@nextui-org/react';

type PropTypes = {
  orders: any;
  setToaster: any;
  setOrders: any;
};

const OrderMemberView = (props: PropTypes) => {
  const { orders, setToaster, setOrders } = props;
  const [modalPayOrder, setModalPayOrder] = useState<string>('');

  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await productService.getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getCartProducts = (id: string) => {
    const product = products?.find((product: any) => product.id === id);
    return product;
  };

  const getOrdersUnpaid: any = () => {
    const order = orders?.filter((order: any) => order.status === 'order');
    return order;
  };
  const getOrdersPaid: any = () => {
    const order = orders?.filter((order: any) => order.status === 'paid');
    return order;
  };
  const getOrdersPacking: any = () => {
    const order = orders?.filter((order: any) => order.status === 'packing');
    return order;
  };
  const getOrdersShipped: any = () => {
    const order = orders?.filter((order: any) => order.status === 'shipped');
    return order;
  };
  const getOrdersDone: any = () => {
    const order = orders?.filter((order: any) => order.status === 'done');
    return order;
  };
  const getOrdersCancel: any = () => {
    const order = orders?.filter((order: any) => order.status === 'cancel' || order.status === 'declined');
    return order;
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="w-full h-auto min-h-screen mt-20 flex flex-col justify-center items-start">
      <Tabs
        aria-label="Options"
        className="w-full flex justify-center items-center mt-5"
      >
        <Tab
          key="unpaid"
          title="Unpaid"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersUnpaid().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="paid"
          title="Paid"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersPaid().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="packing"
          title="Packing"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersPacking().length !== 0 ? (
              getOrdersPacking().map((item: any, index: number) => (
                <CardOrders
                  item={item}
                  key={index}
                  products={products}
                  getCartProducts={getCartProducts}
                  setModalPayOrder={setModalPayOrder}
                />
              ))
            ) : (
              <h1 className="text-3xl font-bold text-red-500">No Order</h1>
            )}
          </div>
        </Tab>
        <Tab
          key="shipped"
          title="Shipped"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersShipped().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="done"
          title="Done"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersDone().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
        <Tab
          key="cancel"
          title="Cancel/Declined"
          className="w-full flex flex-col gap-4 justify-center items-center"
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4 justify-start items-center">
            {getOrdersCancel().map((item: any, index: number) => (
              <CardOrders
                item={item}
                key={index}
                products={products}
                getCartProducts={getCartProducts}
                setModalPayOrder={setModalPayOrder}
              />
            ))}
          </div>
        </Tab>
      </Tabs>

      {modalPayOrder !== '' && (
        <ModalPayOrder
          modalPayOrder={modalPayOrder}
          setModalPayOrder={setModalPayOrder}
          setToaster={setToaster}
          getCartProducts={getCartProducts}
          setOrders={setOrders}
        />
      )}
    </div>
  );
};

export default OrderMemberView;
