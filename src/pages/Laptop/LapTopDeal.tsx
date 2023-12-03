import Slider from "react-slick";
import "./laptop.scss";
import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import { useAppSelector } from "src/hooks/useRedux";
import ProductCard from "src/components/ProductCard";

const LapTopDeal = ({ handlePageChange, currentPage }: any) => {
  const { laptop } = useAppSelector((state) => state.laptop);
  return (
    <div className="blocklist" id="dealsoc">
      <div className="listcontent">
        <DealMain
          dealShock="Deal Sốc"
          discount="Giảm Tới 10.000.000đ"
          isDealMain={true}
        />
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
        {/* <ListProduct
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          category="laptop"
          products={laptop?.data}
          isSlide={false}
        /> */}
      </div>
    </div>
  );
};

export default LapTopDeal;

