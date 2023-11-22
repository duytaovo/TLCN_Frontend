import { useState, useEffect } from "react";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
import Section from "src/components/Section/Section";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";
import useQueryConfig from "src/hooks/useQueryConfig";
import path from "src/constants/path";
import ListProduct from "src/components/ListProduct/ListProduct";
import { Pagination } from "antd";

const PromoFirst = () => {
  const { banner } = useAppSelector((state) => state.banner.promo.firstpromo);
  const dispatch = useAppDispatch();

  const { smartPhone } = useAppSelector((state) => state.smartphone);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang

  useEffect(() => {
    dispatch(getSmartPhones({ pageNumber: currentPage }));
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };
  return (
    <Section styles={`rounded-xl overflow-hidden `}>
      <>
        <div>
          <img src={banner} className="w-full object-cover" />
        </div>
        <div className="w-full mt-16 ">
          <ListProduct
            products={smartPhone?.data}
            isSlide={false}
            category={"smartphone"}
          />
          {/* <Slider
            slidesToShow={5}
            slidesToScroll={1}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {smartPhone &&
              smartPhone.data?.map((product: any) => (
                <div className="w-full" key={""}>
                  <div className="mx-4">
                    <ProductCard
                      key={product.id}
                      category="smartphone"
                      product={product}
                    />
                  </div>
                </div>
              ))}
          </Slider> */}
        </div>
        <div className="mb-5 bg-white m-auto w-fit text-white flex justify-center">
          <Pagination
            current={currentPage + 1}
            pageSize={pageSize}
            total={smartPhone?.totalElements}
            onChange={handlePageChange}
          />
        </div>
      </>
    </Section>
  );
};

export default PromoFirst;
