import DealMain from "src/components/DealMain";
import "./laptop.scss";
import { useEffect, useState } from "react";
import ListProduct from "src/components/ListProduct/ListProduct";
// const products = [
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
//     ProductCard,
// ];
const MacBook = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://json.msang.repl.co/products?category=laptop")
      .then((res) => res.json())
      .then((datas) => {
        setData(datas);
      });
  }, []);
  return (
    <div id="macbook" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Bannermacbook-1200x200.jpg"></DealMain>
        <ListProduct products={data} isSlide={false}></ListProduct>
      </div>
    </div>
  );
};

export default MacBook;
