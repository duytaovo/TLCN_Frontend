import "./laptop.scss";
import DealMain from "src/components/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const Gaming = ({ handlePageChange, currentPage }: any) => {
  const { laptop } = useAppSelector((state) => state.laptop);
  return (
    <div id="gaming" className="blocklist">
      <div className="listcontent block__gaming">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/gamingdes-1200x200.jpg" />
        <ListProduct
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          products={laptop?.data}
          isSlide={false}
          category="laptop"
        />
      </div>
    </div>
  );
};

export default Gaming;
