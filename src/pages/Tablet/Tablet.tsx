import BigBannerTablet from "./BigBannerTablet";
import ListTablet from "./ListTablet";
import QuickLinkTablet from "./QuickLinkTablet";
import { useState } from "react";
import FilterTablet from "./FilterTablet";
const Tablet = () => {
  const [choose, setChoose] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };
  const handleSetChose = (text: string) => {
    setChoose(text);
  };
  return (
    <div style={{ backgroundColor: "" }} className="text-white/75">
      <BigBannerTablet></BigBannerTablet>
      <FilterTablet handle={handle}></FilterTablet>
      <QuickLinkTablet handleSetChose={handleSetChose}></QuickLinkTablet>
      <ListTablet chose={choose} isOpen={isOpen}></ListTablet>
    </div>
  );
};
export default Tablet;
