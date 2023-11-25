import "./laptop.scss";
import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const LapTopDeal = ({ handlePageChange, currentPage }: any) => {
  const { laptop } = useAppSelector((state) => state.laptop);
  return (
    <div className="blocklist" id="dealsoc">
      <div className="listcontent">
        <DealMain
          dealShock="Deal Sốc"
          discount="Giảm Tới 10.000.000đ"
          isDealMain={true}
        />
        <ListProduct
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          category="laptop"
          products={laptop?.data}
          isSlide={false}
        />
      </div>
    </div>
  );
};

export default LapTopDeal;
