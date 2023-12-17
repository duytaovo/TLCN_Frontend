import DealMain from "src/components/DealMain";
import "./laptop.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { useEffect, useState } from "react";
import { getProductsFilterAccess } from "src/store/shopping-cart/cartItemsSlide";
import NextArrow from "src/components/Slick/NextArrow";
import Slider from "react-slick";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard";

const LuxuryLaptop = () => {
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
        characteristicId: [7],
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
    <div id="caocap" className="blocklist">
      <div className="listcontent">
        <DealMain linkImg="https://cdn.tgdd.vn/2021/08/banner/Caocapdesk-1200x200.jpg"></DealMain>
        {/* <ListProduct category="" products={laptop?.data} isSlide={false} /> */}
      </div>
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
  );
};

export default LuxuryLaptop;

