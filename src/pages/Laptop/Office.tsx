import axios from "axios";
import "./laptop.scss";
import { useEffect, useState } from "react";
import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const Office = () => {
  const { laptop } = useAppSelector((state) => state.laptop);

  return (
    <div id="office" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2022/05/banner/banner-phan-mem-1200x200-1200x200.png"></DealMain>
        {/* <ListProduct category="" products={laptop?.data} isSlide={false} /> */}
      </div>
    </div>
  );
};

export default Office;
