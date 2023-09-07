import { useState, useEffect } from "react";
import "./smartwatchhotdeal.scss";
import DealMain from "src/components/DealMain/DealMain";
import ProductTab from "src/components/ProductTab/ProductTab";
import ListProduct from "src/components/ListProduct/ListProduct";
// const products = [
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
//   ProductCard,
// ];
const productTab = ["Nổi bật", "Loa Bluetooth", "JBL", "Harman Kardon", "Sony"];

const SmartWatchChildren = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://json.msang.repl.co/products?category=smartwatch")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="children" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Tre%CC%89em-1200x200.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          <ListProduct isSlide={false} products={products}></ListProduct>
        </div>
      </div>
    </>
  );
};
export default SmartWatchChildren;
