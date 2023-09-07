import ProductCard from "../ProductCard";
import Slider from "react-slick";
import Slick from "../Slick";
import "./slideproduct.scss";
import { IPhoneDocument } from "src/types/allProductsType.interface";

interface Props {
  products: any[];
}
const SlideProduct = (props: Props) => {
  const products = props.products;
  return (
    <div className="slidebar">
      <div className="w-full">
        <Slider
          slidesToShow={5}
          slidesToScroll={5}
          //   nextArrow={<NextArrow />}
          //   prevArrow={<PrevArrow />}
        >
          {products.map((product: any) => (
            <div className="w-full" key={product.title}>
              <div className="mx-4">
                <ProductCard key={product.title} {...product} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default SlideProduct;
