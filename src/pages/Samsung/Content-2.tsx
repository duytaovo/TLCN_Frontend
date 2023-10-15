import "./content-2.scss";
import { useState, useEffect } from "react";
import ProductCard from "src/components/ProductCard";
import Section from "src/components/Section";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";

import Dienthoai from "./Dienthoai";
import Maytinhbang from "./Maytinhbang";
import SmartWatch from "./SmartWatch";
import Phukien from "./Phukien";
import axios from "axios";

const Content2 = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const number = 25;
  useEffect(() => {
    axios
      .get(`https://json.msang.repl.co/products?brand=samsung`)
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, [limit]);
  const handleClick = () => {
    setLimit(number);
  };
  return (
    <div className="samsung">
      <div className="content-2 text-white">
        <div className="pl-40 pr-40 container-c2-top text-textWhiteMain">
          <h1 className="text-textWhiteMain">Danh Mục Sản Phẩm</h1>
          <div>
            <a href="#dien-thoai" className="scrollTo">
              <img src="https://cdn.tgdd.vn/2021/11/campaign/Frame21-119x141.png" />
            </a>
            <a href="#may-tinh-bang" className="scrollTo">
              <img src="https://cdn.tgdd.vn/2021/11/campaign/Frame22-163x141.png" />
            </a>
            <a href="#dong-ho-thong-minh" className="scrollTo">
              <img src="https://cdn.tgdd.vn/2021/11/campaign/Frame23-235x141.png" />
            </a>
            <a href="#phu-kien" className="scrollTo">
              <img src="https://cdn.tgdd.vn/2021/11/campaign/Frame24-101x141.png" />
            </a>
          </div>
          <h1>Sản phẩm mới</h1>
          <div className="boxNew">
            <div className="item">
              <img src="https://cdn.tgdd.vn/2022/05/campaign/M53-368x368.png" />
              <h1>Samsung Galaxy M5 5G</h1>
              <a
                href="/dtdd/samsung-galaxy-m53"
                className="button medium white"
              >
                Mua ngay
              </a>
            </div>
            <div className="item">
              <img src="https://cdn.tgdd.vn/2022/05/campaign/A73-368x368-1.png" />
              <h1>Samsung Galaxy A73 5G</h1>
              <a
                href="/dtdd/samsung-galaxy-a73"
                className="button medium white"
              >
                Mua ngay
              </a>
            </div>
            <div className="item">
              <img src="https://cdn.tgdd.vn/2022/05/campaign/A33-368x368-1.png" />
              <h1>Samsung Galaxy A33 5G</h1>
              <a
                href="/dtdd/samsung-galaxy-a33"
                className="button medium white"
              >
                Mua ngay
              </a>
            </div>
            <div className="item">
              <img src="https://cdn.tgdd.vn/2022/05/campaign/S22-368x368.png" />
              <h1>Samsung Galaxy S22 Ultra</h1>
              <a
                href="/dtdd/samsung-galaxy-s22-ultra"
                className="button medium white"
              >
                Mua ngay
              </a>
            </div>
          </div>
          <h1>Khuyến mãi nổi bật</h1>
          <div>
            <Section styles="">
              <div className="w-full ">
                <Slider
                  slidesToShow={5}
                  slidesToScroll={5}
                  nextArrow={<NextArrow />}
                  prevArrow={<PrevArrow />}
                >
                  {products.map((product: any) => (
                    <div className="w-full" key={product.title}>
                      <div className="mx-8">
                        <ProductCard key={product.title} {...product} />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </Section>
          </div>
          <h1 id="dien-thoai">Điện thoại</h1>
          <div>
            <Dienthoai />
          </div>
          <h1 id="may-tinh-bang">Máy tính bảng</h1>
          <div>
            <Maytinhbang />
          </div>
          <h1 id="dong-ho-thong-minh">Đồng hồ thông minh</h1>
          <div>
            <SmartWatch />
          </div>
          <h1 id="phu-kien">Phụ kiện</h1>
          <div>
            <Phukien />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Content2;
