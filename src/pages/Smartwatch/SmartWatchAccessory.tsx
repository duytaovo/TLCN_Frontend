import DealMain from "src/components/DealMain/DealMain";
import "./smartwatchhotdeal.scss";
import { useState, useEffect } from "react";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import axios from "axios";

const productTab = ["Nổi bật", "Loa Bluetooth", "JBL", "Harman Kardon", "Sony"];

const SmartWatchAccessory = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=watch")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="accessory" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Da%CC%82ydo%CC%82%CC%80ngho%CC%82%CC%80-1200x200.png"></DealMain>
          <ProductTab productTab={productTab} />
          <ListProduct isSlide={false} products={products} />
        </div>
      </div>
    </>
  );
};
export default SmartWatchAccessory;
