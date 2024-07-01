import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SelectUi from '@/components/ui/Select';
import orderService from '@/services/order';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

type PropTypes = {
  updatedOrder: any;
  setUpdatedOrder: any;
  setOrdersData: any;
  setToaster: any;
};

const ModalUpdateStatusOrder = (props: PropTypes) => {
  const { updatedOrder, setUpdatedOrder, setOrdersData, setToaster } = props;

  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdateStatusOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = form.status.value;

    try {
      const result = await orderService.updateOrder(updatedOrder.id, { status: data }, session.data?.accessToken);

      if (result.status === 200) {
        setIsLoading(false);
        setUpdatedOrder({});
        const { data } = await orderService.getAllOrders(session.data?.accessToken);
        setOrdersData(data.data);
        setToaster({
          variant: 'success',
          message: 'Success Update Status Order',
        });
      }
    } catch (error) {
      setIsLoading(false);
      setUpdatedOrder({});
      setToaster({
        variant: 'error',
        message: 'Failed Update Status Order',
      });
    }
  };

  return (
    <Modal onClose={() => setUpdatedOrder({})}>
      <h1 className="text-lg font-semibold mb-5">Update Status Order</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleUpdateStatusOrder}
      >
        <SelectUi
          label="Status Order"
          name="status"
          defaultValue={updatedOrder.status}
          options={[
            { value: 'order', label: 'Order' },
            { value: 'paid', label: 'Paid' },
            { value: 'packing', label: 'Packing' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'done', label: 'Done' },
            { value: 'declined', label: 'Declined' },
          ]}
        />
        <Button
          label={isLoading ? 'Updating...' : 'Update'}
          type="submit"
          className="bg-color-blue text-color-primary py-2 px-1 rounded-md mt-3"
        />
      </form>
    </Modal>
  );
};

export default ModalUpdateStatusOrder;
