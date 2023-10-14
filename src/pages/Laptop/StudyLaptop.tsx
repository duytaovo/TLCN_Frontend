import DealMain from "src/components/DealMain";
import "./laptop.scss";
import { useEffect, useState } from "react";
import ListProduct from "src/components/ListProduct/ListProduct";
import axios from "axios";

const StudyLaptop = () => {
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
    <div id="hoctap" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Hoctapvanphong-1200x200.jpg"></DealMain>
        <ListProduct products={data} isSlide={false}></ListProduct>
      </div>
    </div>
  );
};

export default StudyLaptop;
