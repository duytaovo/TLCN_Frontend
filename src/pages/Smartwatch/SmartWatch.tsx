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
const SmartWatch = () => {
  return (
    <>
      <Banner />
      <QuickLinkSmartWatch />
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
