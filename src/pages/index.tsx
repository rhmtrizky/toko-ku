import ProductsView from '@/components/views/products';
import ProductBySearchView from '@/components/views/products/ProductBySearchPage';

type PropTypes = {
  products: any;
  searchProduct: any;
};

const Home = (props: PropTypes) => {
  const { products, searchProduct } = props;
  const gelangProducts = products.filter((product: any) => product.category === 'gelang');
  const cincinProducts = products.filter((product: any) => product.category === 'cincin');

  return (
    <>
      {searchProduct !== '' ? (
        <ProductBySearchView
          products={products}
          searchProduct={searchProduct}
        />
      ) : (
        <ProductsView
          cincinProducts={cincinProducts}
          gelangProducts={gelangProducts}
        />
      )}
    </>
  );
};
export default Home;
