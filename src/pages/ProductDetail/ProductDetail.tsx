import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "src/components/Comment";
import Head from "./Head";
import OtherProduct from "./OtherProduct";
import RelatedProduct from "./RelatedProduct";
import ProductHistory from "src/components/ProductHistory";
import clsx from "clsx";
import styles from "./productdetail.module.scss";
import { Parameter, DiscountBox, PayInfo, Tag } from "./RightBlock";
import { Article, Policy, SlickBlock } from "./LeftBlock";
import { useDispatch, useSelector } from "react-redux";
import ProductRating from "src/components/Rating";
import { Helmet } from "react-helmet-async";
import { getProductDetailApi } from "src/store/product/productsApi";
function ProductDetail() {
  const { productSlug } = useParams();
  const dispatch = useDispatch();
  getProductDetailApi(dispatch, productSlug);

  return (
    <div className={clsx("bg-white", styles.main)}>
      <Helmet>
        <title>Trang chi tiết sản phẩm </title>
        <meta name="description" content="Trang chi tiết sản phẩm" />
      </Helmet>
      <div className="max-w-8xl m-auto">
        <Head />
        <div className="flex gap-8">
          <div className={clsx(styles.left, "w-3/5")}>
            <SlickBlock />
            <Policy />

            <Link to="/" className="text-blue-500">
              Xem Điện thoại {""} cũ giá từ 24.660.000₫ Tiết kiệm đến 27%
            </Link>
            <Article />
            <ProductRating />
          </div>
          <div className={clsx(styles.right, "w-2/5")}>
            <Tag />
            <DiscountBox />
            <PayInfo />
            <Parameter />
          </div>
        </div>
        <OtherProduct />
        <RelatedProduct />
        <ProductHistory styleTitle="" />
        <Comment />
      </div>
    </div>
  );
}

export default ProductDetail;
