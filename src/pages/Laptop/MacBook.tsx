import DealMain from "src/components/DealMain";
import "./laptop.scss";
import { useEffect, useState } from "react";
import ListProduct from "src/components/ListProduct/ListProduct";
import axios from "axios";
import { useAppSelector } from "src/hooks/useRedux";

const MacBook = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);

  return (
    <div id="macbook" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Bannermacbook-1200x200.jpg"></DealMain>
        <ListProduct category="" products={data} isSlide={false}></ListProduct>
      </div>
    </div>
  );
};

export default MacBook;
