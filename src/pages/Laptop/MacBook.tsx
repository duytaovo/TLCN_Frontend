import DealMain from "src/components/DealMain";
import "./laptop.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getProductsFilterAccess } from "src/store/shopping-cart/cartItemsSlide";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";

const MacBook = ({ handlePageChange, currentPage }: any) => {
  const { laptop } = useAppSelector((state) => state.laptop);
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    code: 200,
    message: "Requested completed!",
    data: {
      pageNumber: 0,
      pageSize: 100,
      totalPages: 0,
      totalElements: 0,
      data: [],
    },
  });
  useEffect(() => {
    const getData = async () => {
      const body = {
        slug: "laptop",
        brandId: [],
        characteristicId: [3],
        priceFrom: null,
        priceTo: null,
        specialFeatures: [],
        name: null,
      };
      const res = await dispatch(
        getProductsFilterAccess({
          body: body,
          // params: { pageNumber: 0, pageSize: 50 },
        }),
      );
      setData(res.payload.data);
    };
    getData();
  }, []);
  return (
    <div id="macbook" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Bannermacbook-1200x200.jpg" />
        <Slider
          slidesToShow={5}
          slidesToScroll={1}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {data.data.data.length > 0
            ? data?.data?.data?.map((product: any, index) => (
                <div className="w-full" key={index}>
                  <div className="mx-4">
                    <ProductCard
                      docquyen
                      key={product.id}
                      category="laptop"
                      product={product}
                    />
                  </div>
                </div>
              ))
            : laptop &&
              laptop?.data?.data?.map((product: any) => (
                <div className="w-full" key={""}>
                  <div className="mx-4">
                    <ProductCard
                      docquyen
                      key={product.id}
                      category="laptop"
                      product={product}
                    />
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default MacBook;

