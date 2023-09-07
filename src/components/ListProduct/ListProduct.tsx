import "./listproduct.scss";
import ProductCard from "../ProductCard";
import Slick from "../Slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import SlideProduct from "../SlideProduct/SlideProduct";
import { IPhoneDocument } from "src/types/allProductsType.interface";

type Props = {
  isSlide: boolean;
  products: any[];
};
const ListProduct = (props: Props) => {
  const isSlide = props.isSlide;
  const products = props.products;

  return (
    <>
      {isSlide ? (
        <div className="slideproduct">
          <SlideProduct products={products}></SlideProduct>
        </div>
      ) : (
        <div className="listproduct">
          {products.map((product: any, index: number) => (
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
