import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { uploadFile } from '@/lib/firebase/service';
import productService from '@/services/product';
// import { Image } from 'antd';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { BsUpload } from 'react-icons/bs';

type PropTypes = {
  updatedProduct: any;
  setUpdatedProduct: any;
  setProductsData: any;
  setToaster: any;
};

const ModalUpdateProduct = (props: PropTypes) => {
  const { updatedProduct, setToaster, setProductsData, setUpdatedProduct } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const session: any = useSession();

  const handleUpdateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      price: form.price.value,
      stock: form.stock.value,
      category: form.category.value,
    };

    try {
      const result = await productService.updateProduct(updatedProduct.id, data, session.data?.accessToken);

      if (result.status == 200) {
        await handleImageUpload(imageFile, updatedProduct.id);
        setIsLoading(false);
        setUpdatedProduct({});
        const { data } = await productService.getAllProducts(session.data?.accessToken);
        setProductsData(data.data);
        setToaster({
          variant: 'success',
          message: 'Success Update Product',
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsLoading(false);
      setUpdatedProduct({});
      setToaster({
        variant: 'error',
        message: 'Failed Update Product',
      });
    }
  };

  const handleImageUpload = async (file: File | null, productId: string) => {
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
            setUpdatedProduct({});
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
        }
      }
    );
  };
  return (
    <Modal onClose={() => setUpdatedProduct({})}>
      <h1 className="text-2xl font-semibold mb-3">Update User</h1>
      <form
        className="flex flex-col gap-2"
        action=""
        onSubmit={handleUpdateProduct}
      >
        <Input
          label="Title"
          type="name"
          name="name"
          defaultValue={updatedProduct.name}
        />
        <Input
          label="Price"
          type="price"
          name="price"
          defaultValue={updatedProduct.price}
        />
        <Input
          label="Stock"
          type="stock"
          name="stock"
          placeholder="stock"
          defaultValue={updatedProduct.stock}
        />
        <Select
          label="Category"
          className="w-full border-2 border-color-gray px-3 py-2 rounded-md bg-color-input"
          name="category"
          defaultValue={updatedProduct.category}
          options={[
            { value: '', label: 'Choose Category' },
            { value: 'kalung', label: 'Kalung' },
            { value: 'gelang', label: 'Gelang' },
            { value: 'cincin', label: 'Cincin' },
          ]}
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
                label="Change Image"
                type="button"
                className="bg-color-gray text-color-dark py-2 px-3 rounded-md mt-3 text-sm"
              />

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
                onChange={(e: any) => setImageFile(e.target?.files[0] || null)}
              />
            </>
          )}
        </div>
        <Button
          label={isLoading ? 'Updating...' : 'Update'}
          type="submit"
          className="bg-color-blue text-color-primary py-2 px-1 rounded-md mt-3"
        />
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
