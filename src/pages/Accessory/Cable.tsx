import DealMain from "src/components/DealMain/DealMain";
import ProductCard from "src/components/ProductCard";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";

const productTab: string[] = [
  "Nổi bật",
  "Cáp Lightning",
  "Adapter sạc Type-C",
  "Adapter sạc USB",
  "Cáp Type-C",
];
const Cable = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://json.msang.repl.co/products?category=phukien&nameType=cap")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="cable" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline3-1200x150.png" />
          <ProductTab productTab={productTab} />
          <ListProduct products={products} isSlide={false} />
        </div>
      </div>
    </>
  );
};
export default Cable;
