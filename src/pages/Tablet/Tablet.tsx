import BigBannerTablet from "./BigBannerTablet";
import ListTablet from "./ListTablet";
import QuickLinkTablet from "./QuickLinkTablet";
import { useEffect, useState } from "react";
import FilterTablet from "./FilterTablet";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getTablets } from "src/store/product/tabletSlice";
import { Helmet } from "react-helmet-async";
import { Pagination } from "antd";
const Tablet = () => {
  const [choose, setChoose] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { tablet } = useAppSelector((state) => state.tablet);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang

  useEffect(() => {
    dispatch(getTablets({ pageNumber: currentPage }));
  }, [currentPage]);

  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };
  const handleSetChoose = (text: string) => {
    setChoose(text);
  };

  return (
    <div className="text-textWhiteMain">
      <Helmet>
        <title>Trang tablet </title>
        <meta name="description" content="Trang điện thoại" />
      </Helmet>
      <BigBannerTablet />
      <FilterTablet handle={handle} />
      <QuickLinkTablet handleSetChoose={handleSetChoose} />
      <ListTablet
        choose={choose}
        isOpen={isOpen}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
      {/* <div className="mb-5 text-white">
        <Pagination
          current={currentPage + 1}
          pageSize={pageSize}
          total={tablet?.data?.totalElements}
          onChange={handlePageChange}
        />
      </div> */}
    </div>
  );
};
export default Tablet;
