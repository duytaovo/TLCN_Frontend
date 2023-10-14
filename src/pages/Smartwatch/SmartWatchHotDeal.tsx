import axios from "axios";
import { useState, useEffect } from "react";
import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";

//?category=smartwatch
const SmartWatchHotDeal = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="dealsoc" className="blocklist">
        <div
          className="listcontent content__smartwatch"
          style={{ backgroundColor: "#fb6e2e" }}
        >
          <DealMain
            dealShock="Deal sốc"
            discount="giảm tới 49%"
            isDealMain={true}
          />
          <ListProduct products={products} isSlide={true} />
        </div>
      </div>
    </>
  );
};
export default SmartWatchHotDeal;
