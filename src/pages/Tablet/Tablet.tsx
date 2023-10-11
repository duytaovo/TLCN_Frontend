import BigBannerTablet from "./BigBannerTablet";
import ListTablet from "./ListTablet";
import QuickLinkTablet from "./QuickLinkTablet";
import { useState } from "react";
import FilterTablet from "./FilterTablet";
const Tablet = () => {
  const [choose, setChoose] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };
  const handleSetChoose = (text: string) => {
    setChoose(text);
  };
  return (
    <div style={{ backgroundColor: "" }} className="text-white/75">
      <BigBannerTablet />
      <FilterTablet handle={handle} />
      <QuickLinkTablet handleSetChoose={handleSetChoose} />
      <ListTablet choose={choose} isOpen={isOpen} />
    </div>
  );
};
export default Tablet;
