import DealMain from "src/components/DealMain/DealMain";
import "./smartwatchhotdeal.scss";
import { useState, useEffect } from "react";
import ProductTab from "src/components/ProductTab/ProductTab";
import ListProduct from "src/components/ListProduct/ListProduct";
import axios from "axios";

const productTab = ["Nổi bật", "Loa Bluetooth", "JBL", "Harman Kardon", "Sony"];

const SmartWatchFashion = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=watch")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="fashion" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Tho%CC%9B%CC%80itrang-1200x200.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          <ListProduct isSlide={false} products={products}></ListProduct>
        </div>
      </div>
    </>
  );
};
export default SmartWatchFashion;
