import BigBannerPhone from "./BigBannerPhone";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FilterPhone from "./FilterPhone";
import QuickLinkPhone from "./QuickLinkPhone";
import ListPhone from "./ListPhone";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";
import useQueryConfig from "src/hooks/useQueryConfig";
import Pagination from "src/components/Pagination";
import path from "src/constants/path";

const Phone = () => {
  const [choose, setChoose] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const queryConfig = useQueryConfig();
  const { smartPhone, filter } = useAppSelector((state) => state.smartphone);

  useEffect(() => {
    dispatch(getSmartPhones(queryConfig));
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
      <div className="mb-5">
        <Pagination
          path={path.phone}
          queryConfig={queryConfig}
          pageSize={smartPhone.totalElements}
        />
      </div>
    </div>
  );
};
export default Phone;
