import BigBannerLapTop from "./BigBannerLapTop";
import LapTopQuickLink from "./LapTopQuickLink";
import MenuTopLapTop from "./MenuTopLapTop";
import LapTopDeal from "./LapTopDeal";
import Gaming from "./Gaming";
import MacBook from "./MacBook";
import StudyLaptop from "./StudyLaptop";
import GraphicLaptop from "./GraphicLaptop";
import ThinLaptop from "./ThinLaptop";
import LuxuryLaptop from "./LuxuryLaptop";
import Office from "./Office";
import Trademark from "./Trademark";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { useEffect } from "react";
import { getAllProductByCategory } from "src/store/product/productsSlice";

const LapTop = () => {
  const dispatch = useAppDispatch();
  const category = "laptop";
  useEffect(() => {
    dispatch(getAllProductByCategory(category));
  }, [category]);

  return (
    <div>
      <Helmet>
        <title>Laptop </title>
        <meta name="description" content="Trang laptop" />
      </Helmet>
      <BigBannerLapTop />
      <LapTopQuickLink />
      <MenuTopLapTop />
      <LapTopDeal />
      <Gaming />
      <MacBook />
      <StudyLaptop />
      <GraphicLaptop />
      <ThinLaptop></ThinLaptop>
      <LuxuryLaptop></LuxuryLaptop>
      <Office></Office>
      <Trademark></Trademark>
    </div>
  );
};
export default LapTop;
