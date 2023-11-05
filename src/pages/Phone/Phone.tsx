import BigBannerPhone from "./BigBannerPhone";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FilterPhone from "./FilterPhone";
import QuickLinkPhone from "./QuickLinkPhone";
import ListPhone from "./ListPhone";
import { useAppDispatch } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";

const Phone = () => {
  const [choose, setChoose] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSmartPhones(""));
  }, []);

  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };

  const handleSetChoose = (text: string) => {
    setChoose(text);
  };
  return (
    <div className="text-textWhiteMain">
      <Helmet>
        <title>Trang điện thoại </title>
        <meta name="description" content="Trang điện thoại" />
      </Helmet>
      <BigBannerPhone />
      <FilterPhone handle={handle} />
      <QuickLinkPhone handleSetChoose={handleSetChoose} />
      <ListPhone choose={choose} isOpen={isOpen} />
    </div>
  );
};
export default Phone;
