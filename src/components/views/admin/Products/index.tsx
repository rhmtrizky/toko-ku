import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
// import TableUi from '@/components/ui/TableUi';
// import { Image, Space } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';

import ModalAddProduct from './ModalAddProduct';
import ModalUpdateProduct from './ModalUpdateProduct';
import ModalDeleteproduct from './ModalDeleteProduct';
import TableNextUi from '@/components/ui/TableNextUi';
import Image from 'next/image';

type PropTypes = {
  products: any[];
  setToaster: any;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [openModalAddProduct, setOpenModalAddProduct] = useState<any>(false);
  const [updatedProduct, setUpdatedProduct] = useState<any>({});
  const [deletedProduct, setDeletedProduct] = useState<any>({});
  const [productsData, setProductsData] = useState<any>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const columns = [
    {
      title: 'No.',
      uid: 'index',
    },
    {
      title: 'Image',
      uid: 'image',
    },
    {
      title: 'Name',
      uid: 'name',
    },
    {
      title: 'Price',
      uid: 'price',
    },
    {
      title: 'Category',
      uid: 'category',
    },
    {
      title: 'Stock',
      uid: 'stock',
    },
    {
      title: 'Actions',
      uid: 'actions',
    },
  ];

  const renderCellContent = (data: any, columnKey: any) => {
    switch (columnKey) {
      case 'index': {
        return <p>{data.index + 1}</p>;
      }
      case 'image':
        return (
          <Image
            src={data.image}
            alt="image"
            width={70}
            height={70}
          />
        );
      case 'actions':
        return (
          <div className="flex gap-2 justify-center items-center">
            <Button
              label="Update"
              type="button"
              className="bg-color-blue text-color-primary py-1 px-3 rounded-md font-semibold"
              onClick={() => setUpdatedProduct(data)}
            />
            <Button
              label="Delete"
              type="button"
              className="bg-color-red text-color-primary py-1 px-3 rounded-md font-semibold"
              onClick={() => setDeletedProduct(data)}
            />
          </div>
        );
      default:
        return data[columnKey];
    }
  };

  const processedData = productsData.map((product: any, index: any) => ({ ...product, index }));

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5">Products Management</h1>
        <div>
          <Button
            label="Add Product"
            type="button"
            className="bg-color-blue text-color-primary py-1 px-3 rounded-md font-semibold text-sm mb-4"
            onClick={() => setOpenModalAddProduct(true)}
          >
            Add Product
          </Button>
          <TableNextUi
            data={processedData}
            columns={columns}
            renderCellContent={renderCellContent}
          />
        </div>
      </AdminLayout>
      {openModalAddProduct && (
        <ModalAddProduct
          setOpenModalAddProduct={setOpenModalAddProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}

      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
          setProductsData={setProductsData}
          setToaster={setToaster}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteproduct
          deletedProduct={deletedProduct}
          setDeletedProduct={setDeletedProduct}
          setProductsData={setProductsData}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default ProductsAdminView;
