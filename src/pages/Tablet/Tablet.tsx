import BigBannerTablet from "./BigBannerTablet";
import ListTablet from "./ListTablet";
import QuickLinkTablet from "./QuickLinkTablet";
import { useEffect, useState } from "react";
import FilterTablet from "./FilterTablet";
import { useAppDispatch } from "src/hooks/useRedux";
import { getAllProductByCategory } from "src/store/product/productsSlice";
const Tablet = () => {
  const [choose, setChoose] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductByCategory("tablet"));
  }, []);

  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };
  const handleSetChoose = (text: string) => {
    setChoose(text);
  };

  return (
    <div className="text-textWhiteMain">
      <BigBannerTablet />
      <FilterTablet handle={handle} />
      <QuickLinkTablet handleSetChoose={handleSetChoose} />
      <ListTablet choose={choose} isOpen={isOpen} />
    </div>
  );
};
export default Tablet;
