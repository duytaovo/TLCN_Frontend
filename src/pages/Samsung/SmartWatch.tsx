import { useState, useEffect } from "react";
import ProductCard from "src/components/ProductCard";
import Section from "src/components/Section";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const SmartWatch = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const number = 25;
  useEffect(() => {
    axios
      .get(`https://json.msang.repl.co/products?brand=samsung&category=watch`)
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, [limit]);
  const handleClick = () => {
    setLimit(number);
  };
  return (
    <div>
      {/* <Helmet>
        <title>Trang đồng hồ thông minh</title>
        <meta name="description" content="Trang đồng hồ thông minh" />
      </Helmet> */}
      <Section styles="">
        <div className="w-full">
          <Slider
            slidesToShow={4}
            slidesToScroll={4}
            autoplay={true}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {products.map((product: any) => (
              <div className="w-full" key={product.title}>
                <div className="mx-4">
                  <ProductCard key={product.title} {...product} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Section>
    </div>
  );
};
export default SmartWatch;
