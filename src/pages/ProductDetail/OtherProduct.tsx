import { useState, useEffect, useRef } from "react";
import { X } from "react-bootstrap-icons";
import Section from "src/components/Section";
import ProductCard from "src/components/ProductCard";
import Slick from "src/components/Slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useAppSelector } from "src/hooks/useRedux";
import { productService } from "src/services";

function OtherProduct() {
  const initProductDetail: any = useAppSelector(
    (state) => state.products.productDetail.data
  );
  const { brand } = initProductDetail;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const res: any = await productService.queryProduct(
        ["brand", brand],
        ["category", "dienthoai"],
        ["_start", "1"],
        ["_limit", "10"]
      );
      setProducts(res);
    }
    getProducts();
  }, [brand]);

  const tags = [
    "iPhone",
    "6 GB",
    "128 GB",
    "Chụp ảnh, quay phim",
    "iPhone 13 (Mini, Pro, Pro Max)",
  ];

  return (
    <Section title="Xem thêm điện thoại khác" styles="bg-white text-black/80">
      <>
        <div className="overflow-scroll flex gap-2 no-scrollbar text-black/80">
          {tags.map((tag, index) => {
            return (
              <button
                className="border border-gray-300 rounded-full w-max px-8 py-4 text-gray-700 text-xl"
                key={index}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div className="w-full">
          <Slider
            slidesToShow={5}
            slidesToScroll={5}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {/* {products.map((product) => (
              <div className="w-full" key={product.title}>
                <div className="mx-4">
                  <ProductCard key={product.title} {...product} />
                </div>
              </div>
            ))} */}
          </Slider>
        </div>
      </>
    </Section>
  );
}

export default OtherProduct;
