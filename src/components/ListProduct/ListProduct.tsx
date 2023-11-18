import "./listproduct.scss";
import ProductCard from "../ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideProduct from "../SlideProduct/SlideProduct";
import { Col, Row } from "antd";

type Props = {
  isSlide: boolean;
  products: any;
  category?: string;
};
const ListProduct = ({ isSlide, products, category }: Props) => {
  return (
    <>
      {isSlide ? (
        <div className="slideproduct">
          <SlideProduct products={products} />
        </div>
      ) : (
        <div className="listproduct">
          <div className="mt-6 grid grid-cols-6 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products?.data &&
              products?.data?.map((product: any, index: number) => (
                <div className="col-span-1" key={product.id}>
                  <ProductCard product={product} category={category} />
                </div>
              ))}
          </div>
          {/* <Row gutter={{ xs: 8, sm: 16 }}>
            {products?.data &&
              products?.data?.map((product: any, index: number) => (
                <Col className="gutter-row" span={6} key={index}>
                  <div>
                    <ProductCard product={product} category={category} />
                  </div>
                </Col>
              ))}
          </Row> */}
        </div>
      )}

      {/* <a className="listcontent__btn">Xem tất cả sản phẩm</a> */}
    </>
  );
};
export default ListProduct;
