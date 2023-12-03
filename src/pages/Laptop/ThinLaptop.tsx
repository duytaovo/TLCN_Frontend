import DealMain from "src/components/DealMain";
import "./laptop.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import { useAppSelector } from "src/hooks/useRedux";
import ProductCard from "src/components/ProductCard";
import Slider from "react-slick";

const ThinLaptop = () => {
  const { laptop } = useAppSelector((state) => state.laptop);

  return (
    <div id="mongnhe" className="blocklist">
      <div className="listcontent">
        <Slider
          slidesToShow={5}
          slidesToScroll={1}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {laptop &&
            laptop?.data?.data?.map((product: any) => (
              <div className="w-full" key={""}>
                <div className="mx-4">
                  <ProductCard
                    docquyen
                    key={product.id}
                    category="smartphone"
                    product={product}
                  />
                </div>
              </div>
            ))}
        </Slider>
        {/* <ListProduct products={laptop?.data} isSlide={false}></ListProduct> */}
      </div>
    </div>
  );
};

export default ThinLaptop;

