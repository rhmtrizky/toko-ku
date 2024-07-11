import CardProduct from '@/components/ui/Card';

type PropTypes = {
  products: any;
  searchProduct: any;
};

const ProductBySearchView = (props: PropTypes) => {
  const { products, searchProduct } = props;
  return (
    <div className="w-full min-h-screen h-auto pb-10 flex flex-col gap-10 mt-20">
      <div className="flex flex-col gap-5 mt-5">
        <CardProduct
          title={`Hasil Pencarian "${searchProduct}" `}
          datas={products}
          type="search"
        />
      </div>
    </div>
  );
};

export default ProductBySearchView;
