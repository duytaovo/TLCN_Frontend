import DealMain from "src/components/DealMain/DealMain";
import ProductCard from "src/components/ProductCard";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";
import axios from "axios";

const productTab = ["Nổi bật", "Chuột", "Bàn phím", "Tai nghe", "Webcam"];
const Gaming = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=accessory")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div
        id="gaming"
        className="blocklist"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline7-1200x138.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          <ListProduct products={products} isSlide={false}></ListProduct>
        </div>
      </div>
    </>
  );
};
export default Gaming;
