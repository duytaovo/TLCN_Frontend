import { useAppSelector } from "src/hooks/useRedux";
import ModalBox from "./ModalBox";

function Article() {
  const initProductDetail: any = useAppSelector(
    (state) => state.products.productDetail.data
  );
  const { article, info } = initProductDetail;

  const data = article ? article : info;
  const Art = () => {
    return <div dangerouslySetInnerHTML={{ __html: data }} />;
  };
  return (
    <div>
      <img src={""} alt={""} />
      <h3>Thông tin sản phẩm</h3>
      <Art />
      <ModalBox />
    </div>
  );
}

export default Article;
