import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "src/components/Section";
import ProductCard from "src/components/ProductCard";
import Slick from "src/components/Slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import Slider from "react-slick";
import { useAppSelector } from "src/hooks/useRedux";
import { productService } from "src/services";

function RelatedProduct() {
  const initProductDetail: any = useAppSelector(
    (state) => state.products.productDetail.data
  );
  const { brand } = initProductDetail;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const res: any = await productService.queryProduct(
        ["brand", brand],
        ["category", "phukien"],
        ["_start", "0"],
        ["_limit", "10"]
      );
      setProducts(res.data);
    }
    getProducts();
  }, [brand]);
  return (
    <Section
      title="Phụ kiện thường mua cùng"
      styles="bg-white text-black/80"
      rightOption={<Link to="/accessory">Xem tất cả</Link>}
    >
      <div className="w-full text-black/80">
        <Slider
          slidesToShow={5}
          slidesToScroll={5}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {products?.map((product: any) => (
            <div className="w-full" key={product.title}>
              <div className="mx-4">
                <ProductCard key={product.title} {...product} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  );
}

export default RelatedProduct;
