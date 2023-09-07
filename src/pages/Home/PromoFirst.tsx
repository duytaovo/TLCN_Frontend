import { useState, useEffect } from "react";
import Slider from "react-slick";
import Section from "./Section";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
function PromoFirst() {
  const [products, setProducts] = useState<any>([]);
  const [banner, setBanner] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  useEffect(() => {
    async function getPromoProduct() {
      // const promo = await promoService.getPromo();
      // const { firstpromo } = promo;
      // setBanner(firstpromo.banner);
      // setTheme(firstpromo.theme);
      // const res = await productService.queryProduct([
      //   firstpromo.query,
      //   firstpromo.value,
      // ]);
      // setProducts(res);
    }
    getPromoProduct();
  }, []);
  return (
    <Section styles={`${theme} rounded-xl overflow-hidden`}>
      <>
        <img src={banner} className="w-full object-cover" />
        <div className="w-full">
          <Slider
            slidesToShow={5}
            slidesToScroll={5}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {products.map((product: any) => (
              <div className="w-full" key={product.title}>
                <div className="mx-4">
                  <ProductCard
                    key={product.title}
                    {...product}
                    data={product}
                  />
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

export default PromoFirst;
