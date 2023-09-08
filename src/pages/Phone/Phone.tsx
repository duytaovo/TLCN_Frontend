import BigBannerPhone from "./BigBannerPhone";
import QuickLinkPhone from "./QuickLinkPhone";
import ListPhone from "./ListPhone";
import { useState } from "react";
import FilterPhone from "./FilterPhone";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Trang điện thoại </title>
        <meta name="description" content="Trang điện thoại" />
      </Helmet>
      <BigBannerPhone />
      <FilterPhone handle={handle} />
      <QuickLinkPhone handleSetChoose={handleSetChoose}></QuickLinkPhone>
      <ListPhone choose={choose} isOpen={isOpen}></ListPhone>
    </div>
  );
};
export default Phone;
