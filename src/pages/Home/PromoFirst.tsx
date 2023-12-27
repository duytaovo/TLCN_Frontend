import { useState, useEffect } from "react";

import Section from "src/components/Section/Section";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";
import ListProduct from "src/components/ListProduct/ListProduct";
import { Pagination } from "antd";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
import Skeleton from "src/components/Skeleton";

const PromoFirst = () => {
  const { banner } = useAppSelector((state) => state.banner.promo.firstpromo);
  const { value } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  console.log(value);
  const { smartPhone } = useAppSelector<any>((state) => state.smartphone);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang

  useEffect(() => {
    const body = {
      slug: "smartphone",
      // brandId: [0],
      // characteristicId: [0],
      // priceFrom: 0,
      // priceTo: 0,
      // specialFeatures: [""],
      // smartphoneType: [""],
      // ram: [""],
      // storageCapacity: [""],
      // charging: [""],
      // screen: [""],
    };
    dispatch(
      getSmartPhones({
        body: body,
        params: { pageNumber: currentPage, pageSize: 10 },
      }),
    );
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
          {/* <ListProduct
            products={smartPhone?.data}
            isSlide={false}
            category={"smartphone"}
          /> */}
          {value < 100 ? (
            <div style={{ display: "flex", gap: 20, paddingTop: 2 }}>
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
            </div>
          ) : (
            <Slider
              slidesToShow={5}
              slidesToScroll={1}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
            >
              {smartPhone &&
                smartPhone?.data?.data?.map((product: any) => (
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
          )}
        </div>
      </>
    </Section>
  );
};

export default PromoFirst;

