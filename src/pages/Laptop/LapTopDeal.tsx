import ProductCard from "src/components/ProductCard/ProductCard";
import "./laptop.scss";
import { useEffect, useState } from "react";
import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getLaptop } from "src/store/product/laptopSlice ";
import { unwrapResult } from "@reduxjs/toolkit";
const LapTopDeal = () => {
  const { laptop } = useAppSelector((state) => state.laptop);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại

  return (
    <div className="blocklist" id="dealsoc">
      <div className="listcontent">
        <DealMain
          dealShock="Deal Sốc"
          discount="Giảm Tới 10.000.000đ"
          isDealMain={true}
        />
        <ListProduct products={laptop?.data?.data} isSlide={false} />
      </div>
    </div>
  );
};

export default LapTopDeal;
