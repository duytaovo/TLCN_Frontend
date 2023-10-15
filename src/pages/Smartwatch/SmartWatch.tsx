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
import { useAppDispatch } from "src/hooks/useRedux";
import { getAllProductByCategory } from "src/store/product/productsSlice";

const SmartWatch = () => {
  const [choose, setChoose] = useState<string>("");
  const handleSetChoose = (text: string) => {
    setChoose(text);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductByCategory("smartwatch"));
  }, []);
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
