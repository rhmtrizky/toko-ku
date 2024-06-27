import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Converter from '@/utils/Converter';
import Image from 'next/image';

type PropTypes = {
  detailProduct: any;
  setDetailProduct: any;
};

const ModalDetailProduct = (props: PropTypes) => {
  const { detailProduct, setDetailProduct } = props;

  return (
    <Modal onClose={() => setDetailProduct('')}>
      {/* <h1 className="text-md font-semibold mb-3">
        Detail Product <span className="text-color-red">{`"${detailProduct.name}"`}</span>?
      </h1> */}
      <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col w-auto h-auto gap-2">
        <div className="flex justify-center lg:items-start md:items-start sm:items-center items-center bg-color-pink">
          <Image
            width="550"
            height="550"
            src={detailProduct.image}
            alt={detailProduct.name}
            className="lg:w-[350px] lg:h-[450px] md:w-[350px] md:h-[450px] sm:w-[350px] sm:h-[180px] w-[350px] h-[180px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-between items-start px-3 w-[350px] gap-2">
          <div className="flex flex-col">
            <h1 className="Lg:text-3xl md:text-3xl sm:text-2xl text-2xl text-color-pink font-semibold">{detailProduct.name}</h1>
            <p className="text-color-pink font-normal">{Converter(detailProduct.price)}</p>
            <p className="text-color-pink font-normal">{detailProduct.category}</p>
            <div className="mt-5">
              <h3 className="text-color-pink font-normal">Description :</h3>
              <p className="text-color-pink font-normal text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, a. Natus at illum maiores rerum error eveniet nostrum, ex tempore quasi adipisci! Saepe nostrum autem dolor accusantium sit veniam ut! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, facilis distinctio explicabo aut doloremque nemo accusantium
                blanditiis ullam error deleniti sint reprehenderit atque provident sequi perferendis, at nam eaque est.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <Button
              label="Add to cart"
              type="button"
              className="bg-color-red text-color-primary py-2 px-3 rounded-md font-semibold w-full opacity-70 hover:opacity-90"
              // onClick={() => setDetailProduct('')}
            />
            <Button
              label="Add to favorite"
              type="button"
              className="bg-color-prinmary text-color-pink border-color-pink border-2 py-2 px-3 rounded-md font-semibold w-full opacity-70 hover:opacity-90"
              // onClick={() => setDetailProduct('')}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailProduct;
