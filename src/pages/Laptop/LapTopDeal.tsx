import Slider from "react-slick";
import "./laptop.scss";
import DealMain from "src/components/DealMain/DealMain";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import ProductCard from "src/components/ProductCard";
import { useEffect, useState } from "react";
import { getProductsFilterAccess } from "src/store/shopping-cart/cartItemsSlide";

const LapTopDeal = ({ handlePageChange, currentPage }: any) => {
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
        characteristicId: [1],
        priceFrom: null,
        priceTo: null,
        specialFeatures: [],
        name: null,
      };
      const res = await dispatch(
        getProductsFilterAccess({
          body: body,
          params: { pageNumber: 0, pageSize: 50 },
        }),
      );
      setData(res.payload.data);
    };
    getData();
  }, []);
  return (
    <div className="blocklist" id="dealsoc">
      <div className="listcontent">
        <DealMain
          dealShock="Deal Sốc"
          discount="Giảm Tới 10.000.000đ"
          isDealMain={true}
        />
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
                      category="smartphone"
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
                      category="smartphone"
                      product={product}
                    />
                  </div>
                </div>
              ))}
        </Slider>
        {/* <ListProduct
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          category="laptop"
          products={laptop?.data}
          isSlide={false}
        /> */}
      </div>
    </div>
  );
};

export default LapTopDeal;

