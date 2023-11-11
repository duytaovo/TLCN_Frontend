import "./listproduct.scss";
import ProductCard from "../ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideProduct from "../SlideProduct/SlideProduct";
import { ListSmartPhone } from "src/types/allProductsType.interface";

type Props = {
  isSlide: boolean;
  products: any;
  category?: string;
};
const ListProduct = ({ isSlide, products, category }: Props) => {
  return (
    <>
      {isSlide ? (
        <div className="slideproduct">
          <SlideProduct products={products} />
        </div>
      ) : (
        <div className="listproduct">
          {products?.map((product: ListSmartPhone, index: number) => (
            <div key={index}>
              <ProductCard product={product} category={category} />
            </div>
          ))}
        </div>
      )}

      {/* <a className="listcontent__btn">Xem tất cả sản phẩm</a> */}
    </>
  );
};
export default ListProduct;
