import DealMain from "src/components/DealMain";
import "./laptop.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const MacBook = () => {
  const { laptop } = useAppSelector((state) => state.laptop);

  return (
    <div id="macbook" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Bannermacbook-1200x200.jpg" />
        <ListProduct
          category="laptop"
          products={laptop?.data}
          isSlide={false}
        />
      </div>
    </div>
  );
};

export default MacBook;
