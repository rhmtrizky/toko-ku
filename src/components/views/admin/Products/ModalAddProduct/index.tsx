import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { uploadFile } from '@/lib/firebase/service';
import productService from '@/services/product';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { BsUpload } from 'react-icons/bs';

type PropTypes = {
  setOpenModalAddProduct: any;
  setToaster: any;
  setProductsData: any;
};

const ModalAddProduct = (props: PropTypes) => {
  const { setOpenModalAddProduct, setToaster, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const session: any = useSession();

  const handleAddProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      category: formData.get('category'),
    };

    try {
      const result = await productService.addProducts(data, session.data?.accessToken);
      if (result.status === 200) {
        if (imageFile) {
          await handleImageUpload(imageFile, result.data.data.id);
        } else {
          setIsLoading(false);
          setOpenModalAddProduct(false);
          const { data } = await productService.getAllProducts(session.data?.accessToken);
          setProductsData(data.data);
          setToaster({
            variant: 'success',
            message: 'Success Add Product',
          });
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setOpenModalAddProduct(false);
      const { data } = await productService.getAllProducts(session.data?.accessToken);
      setProductsData(data.data);
      setToaster({
        variant: 'error',
        message: 'Succes Add Product, but failed to upload image (Size image should be less than 1MB)',
      });
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File, productId: string) => {
    setIsLoading(true);

    await uploadFile(
      productId,
      'products',
      'product image',
      file,
      (status: boolean, progressPercent: number) => {
        console.log(`Upload progress: ${progressPercent}%`);
      },
      async (status: boolean, downloadURL: string, e: any) => {
        if (status) {
          const data = {
            image: downloadURL,
          };
          const result = await productService.updateProduct(productId, data, session.data?.accessToken);
          if (result.status === 200) {
            const { data } = await productService.getAllProducts(session.data?.accessToken);
            setProductsData(data.data);
            setToaster({
              variant: 'success',
              message: 'Success Add Product',
            });
            setOpenModalAddProduct(false);
          } else {
            setToaster({
              variant: 'error',
              message: 'Failed to update product with image',
            });
          }
        } else {
          setToaster({
            variant: 'error',
            message: 'Size image should be less than 1MB',
          });
          setIsLoading(false);
          e.target[0].value = '';
        }
      }
    );
  };

  return (
    <Modal onClose={() => setOpenModalAddProduct(true)}>
      <h1 className="text-2xl font-semibold mb-3">Add Product</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleAddProduct}
      >
        <Input
          label="Product Name"
          type="text"
          name="name"
          placeholder="Input product name"
        />
        <Input
          label="Price"
          type="number"
          name="price"
          placeholder="Input price"
        />

        <Select
          label="Category"
          className="w-full border-2 border-color-gray px-3 py-2 rounded-md bg-color-input"
          name="category"
          options={[
            { value: '', label: 'Choose Category' },
            { value: 'kalung', label: 'Kalung' },
            { value: 'gelang', label: 'Gelang' },
            { value: 'cincin', label: 'Cincin' },
          ]}
        />
        <Input
          label="Stock"
          type="number"
          name="stock"
          placeholder="Input stock"
        />
        <div className="relative w-full h-40 flex flex-col justify-center items-center">
          {imageFile ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="image"
                width={150}
                height={120}
              />
              <p className="text-center text-sm p-1 bg-color-gray rounded-md">{imageFile.name}</p>
            </div>
          ) : (
            <>
              <BsUpload
                size={40}
                className="text-color-gray2 font-bold"
              />
              <Button
                label="Upload Image"
                type="button"
                className="bg-color-gray text-color-dark py-2 px-3 rounded-md mt-3 text-sm"
              >
                Upload Image
              </Button>
              <div className="text-xs flex justify-center flex-col items-center text-center mt-2">
                <p>
                  Maximum image size is <b>1 MB</b>
                </p>
                <p>
                  Accepted formats: <b>.jpg, .jpeg, .png</b>
                </p>
              </div>
              <input
                className="absolute bg-color-gray z-0 bottom-0 left-0 w-full h-full opacity-0"
                type="file"
                name="image"
                onChange={(e: any) => setImageFile(e.target.files[0])}
              />
            </>
          )}
        </div>
        <div className="flex justify-end w-full bg-color-primary gap-3">
          <Button
            label={'Cancel'}
            className="bg-color-primary text-color-dark py-1 px-3 rounded-md mt-3 border-2 border-color-gray"
            disabled={isLoading}
            onClick={() => setOpenModalAddProduct(false)}
          />
          <Button
            label={isLoading ? 'Uploading...' : 'Submit'}
            type="submit"
            className="bg-color-blue text-color-primary py-1 px-3 rounded-md mt-3"
            disabled={isLoading}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
