import BigBannerPhone from "./BigBannerPhone";
import QuickLinkPhone from "./QuickLinkPhone";
import ListPhone from "./ListPhone";
import { useState } from "react";
import FilterPhone from "./FilterPhone";
const Phone = () => {
  const [choose, setChoose] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };
  const handleSetChoose = (text: string) => {
    setChoose(text);
  };
  return (
    <div className="text-white/70">
      <BigBannerPhone />
      <FilterPhone handle={handle} />
      <QuickLinkPhone handleSetChoose={handleSetChoose}></QuickLinkPhone>
      <ListPhone choose={choose} isOpen={isOpen}></ListPhone>
    </div>
  );
};
export default Phone;
