import { useState, useEffect } from "react";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";
import { productService, promoService } from "src/services";
import Section from "src/components/Section/Section";

const PromoFirst = () => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  useEffect(() => {
    async function getPromoProduct() {
      const promo = await promoService.getPromo();
      const { firstpromo } = promo.data;
      setBanner(firstpromo.banner);
      setTheme(firstpromo.theme);
      const res = await productService.queryProduct([
        firstpromo.query,
        firstpromo.value,
      ]);
      setProducts(res.data);
    }
    getPromoProduct();
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
            {products &&
              products?.map((product: any) => (
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
        <button className="outline-none text-2xl my-10 border bg-white/40  px-20 py-4 rounded-lg">
          Xem tất cả sản phẩm
        </button>
      </>
    </Section>
  );
};

export default PromoFirst;
