import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import TableNextUi from '@/components/ui/TableNextUi';
import Converter from '@/utils/Converter';
import ModalUpdateStatusOrder from './ModalUpdateStatusOrder';

type PropTypes = {
  orders: any[];
  setToaster: any;
  products: any[];
  users: any;
};

const OrdersAdminView = (props: PropTypes) => {
  const { orders, setToaster, products, users } = props;
  const [updatedOrder, setUpdatedOrder] = useState<any>({});
  const [ordersData, setOrdersData] = useState<any>([]);

  const getProduct = (id: string) => {
    const product = products.find((product: any) => product.id === id);
    return product;
  };

  const getUser = (id: string) => {
    const user = users.find((user: any) => user.id === id);
    return user;
  };

  useEffect(() => {
    setOrdersData(orders);
  }, [orders]);

  const columns = [
    {
      title: 'No.',
      uid: 'index',
    },
    {
      title: 'Order ID',
      uid: 'orderId',
    },
    {
      title: 'Users',
      uid: 'users',
    },
    {
      title: 'Items',
      uid: 'items',
      style: { width: '200px' }, // Adjust the width as needed
    },
    {
      title: 'Total Items',
      uid: 'totalItems',
    },
    {
      title: 'Qty Orders',
      uid: 'qtyOrders',
    },
    {
      title: 'Total Price',
      uid: 'totalPrice',
    },
    {
      title: 'Address',
      uid: 'address',
      style: { width: '300px' }, // Adjust the width as needed
    },
    {
      title: 'Status',
      uid: 'status',
    },
    {
      title: 'Date/Time',
      uid: 'created_at',
    },
    {
      title: 'Actions',
      uid: 'actions',
    },
  ];

  const renderCellContent = (data: any, columnKey: any) => {
    switch (columnKey) {
      case 'index':
        return <p>{data.index + 1}</p>;
      case 'users':
        return (
          <ul>
            <li>
              <p>{getUser(data.userId)?.fullname}</p>
            </li>
          </ul>
        );
      case 'items':
        return (
          <ul className="w-[150px]">
            {data.items.map((item: any, idx: number) => (
              <li key={idx}>
                <p>
                  {getProduct(item.id)?.name} ({item.qty})
                </p>
              </li>
            ))}
          </ul>
        );
      case 'totalItems':
        return <p>{data.items.length}</p>;
      case 'qtyOrders':
        const qtyOrders = data.items.reduce((acc: number, item: any) => acc + item.qty, 0);
        return (
          <ul>
            <p>{qtyOrders}</p>
          </ul>
        );
      case 'totalPrice':
        const total = data?.items.reduce((acc: number, item: any) => {
          return acc + getProduct(item.id)?.price * item.qty;
        }, 0);

        return <p>{Converter(total)}</p>;
      case 'address':
        return (
          <div className="flex flex-col gap-1 w-[230px]">
            <p>
              <span className="font-bold">Recipient: </span>
              {data.address.recipient}
            </p>
            <p>
              <span className="font-bold">Detail Address: </span>
              {data.address.detailAddress}
            </p>
            <p>
              <span className="font-bold">Province: </span>
              {data.address.province}
            </p>
            <p>
              <span className="font-bold">City: </span>
              {data.address.city}
            </p>
            <p>
              <span className="font-bold">District: </span>
              {data.address.district}
            </p>
            <p>
              <span className="font-bold">Postal Code: </span>
              {data.address.postalCode}
            </p>
            <p>
              <span className="font-bold">Note: </span>
              {data.address.note}
            </p>
            <p>
              <span className="font-bold">Receiver Number: </span>
              {data.address.phoneNumber}
            </p>
          </div>
        );
      case 'status':
        return (
          <div
            className={`${data.status === 'order' && 'bg-color-orange'} ${data.status === 'paid' && 'bg-color-green'} ${data.status === 'packing' && 'bg-color-gray'} ${data.status === 'shipped' && 'bg-color-yellow'} ${data.status === 'done' && 'bg-color-blue'} ${
              data.status === 'declined' && 'bg-color-red'
            } text-color-primary font-semibold py-1 px-3 rounded-md`}
          >
            <p>{data.status}</p>
          </div>
        );
      case 'created_at':
        return <p>{new Date(data.created_at.seconds * 1000).toLocaleString()}</p>;
      case 'actions':
        return (
          <div className="flex gap-2 justify-center items-center">
            <Button
              label="Update"
              type="button"
              className="bg-color-blue text-color-primary py-1 px-3 rounded-md font-semibold"
              onClick={() => setUpdatedOrder(data)}
            />
          </div>
        );

      default:
        return data[columnKey];
    }
  };

  const processedData = ordersData?.map((order: any, index: any) => ({ ...order, index }));

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5">Orders Management</h1>
        <div>
          <TableNextUi
            data={processedData}
            columns={columns}
            renderCellContent={renderCellContent}
          />
        </div>
      </AdminLayout>
      {Object.keys(updatedOrder).length > 0 && (
        <ModalUpdateStatusOrder
          updatedOrder={updatedOrder}
          setUpdatedOrder={setUpdatedOrder}
          setOrdersData={setOrdersData}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default OrdersAdminView;
