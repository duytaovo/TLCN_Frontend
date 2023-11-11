import ProductCard from "src/components/ProductCard/ProductCard";
import "./laptop.scss";
import { useEffect, useState } from "react";
import DealMain from "src/components/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import axios from "axios";
import { useAppSelector } from "src/hooks/useRedux";

const Gaming = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);
  return (
    <div id="gaming" className="blocklist">
      <div className="listcontent block__gaming">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/gamingdes-1200x200.jpg" />
        <ListProduct products={data} isSlide={false} category="" />
      </div>
    </div>
  );
};

export default Gaming;
