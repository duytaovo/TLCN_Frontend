import DealMain from "src/components/DealMain/DealMain";
import ProductCard from "src/components/ProductCard";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";

const productTab = [
  "Nổi bật",
  "Dung lượng 10000mAh",
  "Dung lượng 20000mAh",
  "Dưới 300.000đ",
  "Xmobile",
];
const Pin = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://json.msang.repl.co/products?category=phukien&nameType=pin")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="pin" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline2-1200x150-3.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          <ListProduct products={products} isSlide={false}></ListProduct>
        </div>
      </div>
    </>
  );
};
export default Pin;
