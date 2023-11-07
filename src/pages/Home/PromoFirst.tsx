import { useState, useEffect } from "react";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
import { productService } from "src/services";
import Section from "src/components/Section/Section";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";
import Pagination from "src/components/Pagination";
import useQueryConfig from "src/hooks/useQueryConfig";
import path from "src/constants/path";

const PromoFirst = () => {
  const { banner } = useAppSelector((state) => state.banner.promo.firstpromo);
  const dispatch = useAppDispatch();
  const queryConfig = useQueryConfig();

  const { smartPhone } = useAppSelector((state) => state.smartphone);
  useEffect(() => {
    dispatch(getSmartPhones(queryConfig));
  }, []);
  return (
    <Section styles={`rounded-xl overflow-hidden `}>
      <>
        <div>
          <img src={banner} className="w-full object-cover" />
        </div>
        <div className="w-full mt-16 ">
          <Slider
            slidesToShow={5}
            slidesToScroll={5}
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
          </Slider>
        </div>
        <Pagination
          path={path.home}
          queryConfig={queryConfig}
          pageSize={smartPhone.totalElements}
        />
      </>
    </Section>
  );
};

export default PromoFirst;
