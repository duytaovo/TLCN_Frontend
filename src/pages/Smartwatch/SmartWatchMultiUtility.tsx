import DealMain from "src/components/DealMain/DealMain";
import "./smartwatchhotdeal.scss";
import ProductTab from "src/components/ProductTab/ProductTab";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

const productTab = ["Nổi bật", "Loa Bluetooth", "JBL", "Harman Kardon", "Sony"];

const SmartWatchMultiUtility = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);

  return (
    <>
      <div id="utilities" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Datie%CC%A3%CC%82ni%CC%81ch-1200x200.png"></DealMain>
          <ProductTab productTab={productTab} />
          <ListProduct isSlide={false} products={data} />
        </div>
      </div>
    </>
  );
};
export default SmartWatchMultiUtility;
