import BigBannerPhone from "./BigBannerPhone";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FilterPhone from "./FilterPhone";
import QuickLinkPhone from "./QuickLinkPhone";
import ListPhone from "./ListPhone";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";

const Phone = () => {
  const [choose, setChoose] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại

  useEffect(() => {
    dispatch(getSmartPhones({ pageNumber: currentPage, pageSize: 12 }));
  }, [currentPage]);

  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      <ListPhone
        choose={choose}
        isOpen={isOpen}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};
export default Phone;
