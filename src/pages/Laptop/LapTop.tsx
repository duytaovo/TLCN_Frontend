import BigBannerLapTop from "./BigBannerLapTop";
import LapTopQuickLink from "./LapTopQuickLink";
import MenuTopLapTop from "./MenuTopLapTop";
import LapTopDeal from "./LapTopDeal";
import Gaming from "./Gaming";
import MacBook from "./MacBook";
import StudyLaptop from "./StudyLaptop";
import GraphicLaptop from "./GraphicLaptop";
import ThinLaptop from "./ThinLaptop";
import LuxuryLaptop from "./LuxuryLaptop";
import Office from "./Office";
import Trademark from "./Trademark";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { useEffect, useState } from "react";
import { getLaptop } from "src/store/product/laptopSlice ";
import { Pagination } from "antd";

const LapTop = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang
  const [choose, setChoose] = useState<string>("");
  const { laptop } = useAppSelector((state) => state.laptop);
  useEffect(() => {
    dispatch(getLaptop({ pageNumber: currentPage }));
  }, [currentPage, dispatch]);

  const handleSetChoose = (text: string) => {
    setChoose(text);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };
  return (
    <div>
      <Helmet>
        <title>Trang laptop </title>
        <meta name="description" content="Trang laptop" />
      </Helmet>
      <BigBannerLapTop />
      <div className="mb-7">
        <LapTopQuickLink choose={choose} handleSetChoose={handleSetChoose} />
      </div>
      <MenuTopLapTop />
      <LapTopDeal
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
      <Gaming handlePageChange={handlePageChange} currentPage={currentPage} />
      <MacBook />
      <StudyLaptop />
      <GraphicLaptop />
      <ThinLaptop />
      <LuxuryLaptop />
      <Office />
      <Trademark />
      {/* <div className="mb-5">
        <Pagination
          current={currentPage + 1}
          pageSize={pageSize}
          total={laptop?.data?.totalElements}
          onChange={handlePageChange}
        />
      </div> */}
    </div>
  );
};
export default LapTop;

