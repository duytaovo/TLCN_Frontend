import "./listproduct.scss";
import ProductCard from "../ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideProduct from "../SlideProduct/SlideProduct";

type Props = {
  isSlide: boolean;
  products: any;
};
const ListProduct = ({ isSlide, products }: Props) => {
  return (
    <>
      {isSlide ? (
        <div className="slideproduct">
          <SlideProduct products={products} />
        </div>
      ) : (
        <div className="listproduct">
          {products?.map((product: any, index: number) => (
            <div key={index}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      )}

      <a className="listcontent__btn">Xem tất cả sản phẩm</a>
    </>
  );
};
export default ListProduct;
