import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import productService from '@/services/product';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

type PropTypes = {
  deletedProduct: any;
  setDeletedProduct: any;
  setProductsData: any;
  setToaster: any;
};

const ModalDeleteproduct = (props: PropTypes) => {
  const { deletedProduct, setToaster, setProductsData, setDeletedProduct } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleDeleteProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await productService.deleteProduct(deletedProduct.id, session.data?.accessToken);
      if (result.status == 200) {
        setIsLoading(false);
        setDeletedProduct({});
        const { data } = await productService.getAllProducts();
        setProductsData(data.data);
        setToaster({
          variant: 'success',
          message: 'Success Delete Product',
        });
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      setDeletedProduct({});
      setToaster({
        variant: 'error',
        message: 'Failed Delete Product',
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct('')}>
      <h1 className="text-md font-semibold mb-3">
        Are you sure to delete <span className="text-color-red">{`"${deletedProduct.name}"`}</span>?
      </h1>
      <div className="flex justify-end gap-3 mt-5">
        <Button
          label="Cancel"
          type="button"
          onClick={() => setDeletedProduct({})}
          className="bg-color-gray text-color-dark py-1 px-3 rounded-md font-semibold"
        />
        <Button
          label={isLoading ? 'Deleting' : 'Delete'}
          type="button"
          onClick={handleDeleteProduct}
          className="bg-color-red text-color-primary py-1 px-3 rounded-md font-semibold"
        />
      </div>
    </Modal>
  );
};

export default ModalDeleteproduct;
