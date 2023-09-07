import { useState, useEffect } from "react";
import Slider from "react-slick";
import Section from "./Section";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
function PromoSecond() {
  const [images, setImages] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    async function getPromoProduct() {
      // const promo = await promoService.getPromo();
      // const { secondpromo } = promo;
      // setImages(secondpromo.slider);
      // setTitle(secondpromo.title);
      // setTheme(secondpromo.theme);
      // const res = await productService.queryProduct([
      //   secondpromo.query,
      //   secondpromo.value,
      // ]);
      // setProducts(res);
    }
    getPromoProduct();
  }, []);

  return (
    <Section styles={theme}>
      <>
        <p className="uppercase text-7xl py-10 font-bold text-white text-center w-full">
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
            {images.map((src, index) => (
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
        <button className="outline-none text-2xl my-10 border bg-white px-20 py-4 rounded-lg">
          Xem tất cả sản phẩm
        </button>
      </>
    </Section>
  );
}

export default PromoSecond;
