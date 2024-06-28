import Image from 'next/image';

type PropTypes = {
  item: any;
  products: any;
  index: any;
};

const CardCartProduct = (props: PropTypes) => {
  const { item, index, products } = props;
  const getCartProducts = (id: string) => {
    const product = products.find((product: any) => product.id === id);
    return product;
  };

  return (
    <div
      className="w-[550px] h-full min-h-[150px] bg-color-cream rounded-md flex justify-center items-center px-2 py-2"
      key={index}
    >
      <div className="w-1/3 h-full flex justify-center ">
        <Image
          src={getCartProducts(item.id)?.image}
          alt="placeholder"
          width={120}
          height={100}
          className="object-cover rounded-md"
        />
      </div>
      <div className="w-2/3 h-full text-color-pink flex flex-col justify-center items-start gap-1">
        <p className="text-md font-semibold">{getCartProducts(item.id)?.name}</p>
        <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eveniet, est libero delectus quidem consequuntur ullam in quasi dolorum assumenda commodi illum, possimus, id eum mollitia dolore! Recusandae, animi fugit!</p>
        <button>{item.qty}</button>
      </div>
    </div>
  );
};

export default CardCartProduct;
