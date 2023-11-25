import DealMain from "src/components/DealMain";
import "./laptop.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const StudyLaptop = ({ handlePageChange, currentPage }: any) => {
  const { laptop } = useAppSelector((state) => state.laptop);

  return (
    <div id="hoctap" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Hoctapvanphong-1200x200.jpg"></DealMain>
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

export default StudyLaptop;
