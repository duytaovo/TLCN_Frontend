import { useState, useEffect } from "react";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
import Section from "src/components/Section/Section";
import { useAppSelector } from "src/hooks/useRedux";
import Pagination from "src/components/Pagination";
import useQueryConfig from "src/hooks/useQueryConfig";
import path from "src/constants/path";

const PromoSecond = () => {
  const [products, setProducts] = useState<[]>([]);
  const { query, slider, title, value } = useAppSelector(
    (state) => state.banner.promo.secondpromo
  );
  const queryConfig = useQueryConfig();

  // const dispatch = useAppDispatch();
  const { smartPhone } = useAppSelector((state) => state.smartphone);

  // useEffect(() => {
  //   dispatch(getSmartPhones(queryConfig));
  // }, []);

  return (
    <Section styles={""}>
      <>
        <p className="uppercase text-5xl py-10 font-bold text-textWhiteMain text-center w-full">
          {title}
        </p>
        <div className="w-full">
          <Slider
            slidesToShow={3}
            slidesToScroll={3}
            autoplay={true}
            autoplaySpeed={2000}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {slider.map((src, index) => (
              <div className="w-full" key={index}>
                <div className="mx-4">
                  <a href="https://google.com">
                    <img
                      src={src}
                      alt=""
                      className="w-full object-cover rounded-xl"
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full">
          <Slider
            slidesToShow={5}
            slidesToScroll={5}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {smartPhone.data?.map((product: any) => (
              <div
                className="w-full rounded-xl overflow-hidden"
                key={product.id}
              >
                <div className="mx-4  rounded-xl overflow-hidden">
                  <ProductCard product={product} category="smartphone" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <Pagination
          path={path.home}
          queryConfig={queryConfig}
          pageSize={smartPhone.totalPages}
        />
      </>
    </Section>
  );
};

export default PromoSecond;
