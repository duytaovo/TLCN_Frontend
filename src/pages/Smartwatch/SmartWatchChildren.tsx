import "./smartwatchhotdeal.scss";
import DealMain from "src/components/DealMain/DealMain";
import ProductTab from "src/components/ProductTab/ProductTab";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const productTab = ["Nổi bật", "Loa Bluetooth", "JBL", "Harman Kardon", "Sony"];

const SmartWatchChildren = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);

  return (
    <>
      <div id="children" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Tre%CC%89em-1200x200.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          <ListProduct isSlide={false} products={data}></ListProduct>
        </div>
      </div>
    </>
  );
};
export default SmartWatchChildren;
