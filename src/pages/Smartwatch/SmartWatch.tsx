import Banner from "./Banner";
import MenuTopSmartWatch from "./MenuTopSmartWatch";
import QuickLinkSmartWatch from "./QuickLinkSmartWatch";
import SmartWatchHotDeal from "./SmartWatchHotDeal";
import SmartWatchFashion from "./SmartWatchFashion";
import SmartWatchMultiUtility from "./SmartWatchMultiUtility";
import SmartWatchSports from "./SmartWatchSports";
import SmartWatchChildren from "./SmartWatchChildren";
import SmartWatchAccessory from "./SmartWatchAccessory";
import "./smartwatchhotdeal.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartwatchs } from "src/store/product/smartwatchSlice";

const SmartWatch = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang
  const [choose, setChoose] = useState<string>("");
  const { smartWatch } = useAppSelector((state) => state.smartwatch);
  useEffect(() => {
    dispatch(getSmartwatchs({ pageNumber: currentPage }));
  }, [currentPage, dispatch]);

  const handleSetChoose = (text: string) => {
    setChoose(text);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };
  return (
    <>
      <Banner />
      <QuickLinkSmartWatch handleSetChoose={handleSetChoose} />
      <MenuTopSmartWatch />
      <SmartWatchHotDeal />
      <SmartWatchFashion />
      <SmartWatchMultiUtility />
      <SmartWatchSports />
      <SmartWatchChildren />
      <SmartWatchAccessory />
    </>
  );
};
export default SmartWatch;
