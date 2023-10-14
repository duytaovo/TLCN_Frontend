import ProductCard from "src/components/ProductCard/ProductCard";
import "./laptop.scss";
import { useEffect, useState } from "react";
import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import axios from "axios";
const LapTopDeal = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=laptop")
      .then((res) => res.data)
      .then((datas) => {
        setData(datas);
      });
  }, []);
  return (
    <div className="blocklist" id="dealsoc">
      <div className="listcontent">
        <DealMain
          dealShock="Deal Sốc"
          discount="Giảm Tới 10.000.000đ"
          isDealMain={true}
        ></DealMain>
        <ListProduct products={data} isSlide={true}></ListProduct>
      </div>
    </div>
  );
};

export default LapTopDeal;
