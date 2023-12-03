import DealMain from "src/components/DealMain";
import "./laptop.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import { useAppSelector } from "src/hooks/useRedux";
import ProductCard from "src/components/ProductCard";
import Slider from "react-slick";

const MacBook = ({ handlePageChange, currentPage }: any) => {
  const { laptop } = useAppSelector((state) => state.laptop);

  return (
    <div id="macbook" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Bannermacbook-1200x200.jpg" />
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
      </div>
    </div>
  );
};

export default MacBook;

