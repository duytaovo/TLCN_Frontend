import DealMain from "src/components/DealMain/DealMain";
import ProductCard from "src/components/ProductCard";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";
const products = [
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
];
const productTab = [
  "Nổi bật",
  "Khóa điện tử",
  "Ổ cắm thông minh",
  "TV Box",
  "Rounter",
];
const SmartHome = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://json.msang.repl.co/products?category=accessory")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="smarthome" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline6-1200x150.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          <ListProduct products={products} isSlide={false}></ListProduct>
        </div>
      </div>
    </>
  );
};
export default SmartHome;
