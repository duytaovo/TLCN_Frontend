import { useState, useEffect } from "react";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
import { productService, promoService } from "src/services";
import Section from "src/components/Section/Section";
import { useAppSelector } from "src/hooks/useRedux";
function PromoSecond() {
  const [products, setProducts] = useState<[]>([]);
  const { query, slider, theme, title, value } = useAppSelector(
    (state) => state.banner.promo.secondpromo
  );
  useEffect(() => {
    async function getPromoProduct() {
      const res = await productService.queryProduct([query, value], [], [], []);
      setProducts(res.data);
    }
    getPromoProduct();
  }, []);

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
            {products?.map((product: any) => (
              <div
                className="w-full rounded-xl overflow-hidden"
                key={product.title}
              >
                <div className="mx-4  rounded-xl overflow-hidden">
                  <ProductCard {...product} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <button className="outline-none text-2xl my-10 border bg-white/40 px-20 py-4 rounded-lg">
          Xem tất cả sản phẩm
        </button>
      </>
    </Section>
  );
}

export default PromoSecond;
