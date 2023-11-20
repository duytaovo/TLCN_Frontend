import DealMain from "src/components/DealMain";
import "./laptop.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const ThinLaptop = () => {
  const { laptop } = useAppSelector((state) => state.laptop);

  return (
    <div id="mongnhe" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/mongnhedes-1200x200.jpg"></DealMain>
        <ListProduct products={laptop?.data} isSlide={false}></ListProduct>
      </div>
    </div>
  );
};

export default ThinLaptop;
