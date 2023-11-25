import DealMain from "src/components/DealMain";
import "./laptop.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const LuxuryLaptop = () => {
  const { laptop } = useAppSelector((state) => state.laptop);

  return (
    <div id="caocap" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Caocapdesk-1200x200.jpg"></DealMain>
        {/* <ListProduct category="" products={laptop?.data} isSlide={false} /> */}
      </div>
    </div>
  );
};

export default LuxuryLaptop;
