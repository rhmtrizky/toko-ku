import ProductsAdminView from '@/components/views/admin/Products';

type PropTypes = {
  setToaster: any;
  products: any;
};

const PageAdminProducts = (props: PropTypes) => {
  const { setToaster, products } = props;

  return (
    <ProductsAdminView
      setToaster={setToaster}
      products={products}
    />
  );
};

export default PageAdminProducts;
