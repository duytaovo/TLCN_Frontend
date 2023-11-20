import "./listproduct.scss";
import ProductCard from "../ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideProduct from "../SlideProduct/SlideProduct";

type Props = {
  isSlide: boolean;
  products: any;
  category?: string;
};
const ListProduct = ({ isSlide, products, category }: Props) => {
  console.log(products);
  return (
    <>
      {isSlide ? (
        <div className="">
          <SlideProduct products={products} />
        </div>
      ) : (
        <div className="">
          <div className="mt-6 grid grid-cols-6 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products?.data &&
              products?.data?.map((product: any, index: number) => (
                <div className="col-span-1" key={product.id}>
                  <ProductCard product={product} category={category} />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* <a className="listcontent__btn">Xem tất cả sản phẩm</a> */}
    </>
  );
};
export default ListProduct;
