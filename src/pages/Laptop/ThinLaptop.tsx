import DealMain from "src/components/DealMain";
import "./laptop.scss";
import { useEffect, useState } from "react";
import ListProduct from "src/components/ListProduct/ListProduct";
import axios from "axios";
import { useAppSelector } from "src/hooks/useRedux";

const ThinLaptop = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);

  return (
    <div id="mongnhe" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/mongnhedes-1200x200.jpg"></DealMain>
        <ListProduct products={data} isSlide={false}></ListProduct>
      </div>
    </div>
  );
};

export default ThinLaptop;
