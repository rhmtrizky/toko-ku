import CardProduct from '@/components/ui/Card';
import ResponsiveCarousel from '@/components/ui/Carousel';
import ModalDetailProduct from './ModalDetailProduct';
import { useState } from 'react';

type PropTypes = {
  gelangProducts: any;
  cincinProducts: any;
};

const ProductsView = (props: PropTypes) => {
  const { gelangProducts, cincinProducts } = props;
  const [detailProduct, setDetailProduct] = useState<any>({});
  return (
    <>
      <div className="w-full h-auto min-h-screen pb-10 flex flex-col gap-10 mt-20">
        <div className="flex flex-col gap-5">
          <ResponsiveCarousel />
          <CardProduct
            title={'BRACELET COLLECTION'}
            datas={gelangProducts}
            setDetailProduct={setDetailProduct}
          />
        </div>
        <div className="flex flex-col gap-5">
          <CardProduct
            title={'RING COLLECTION'}
            datas={cincinProducts}
            setDetailProduct={setDetailProduct}
          />
        </div>
      </div>
      {Object.keys(detailProduct).length > 0 && (
        <ModalDetailProduct
          detailProduct={detailProduct}
          setDetailProduct={setDetailProduct}
        />
      )}
    </>
  );
};

export default ProductsView;
