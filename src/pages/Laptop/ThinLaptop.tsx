import "./laptop.scss";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { useEffect, useState } from "react";
import { getProductsFilterAccess } from "src/store/shopping-cart/cartItemsSlide";

const ThinLaptop = () => {
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
        characteristicId: [6],
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
    <div id="mongnhe" className="blocklist">
      <div className="listcontent">
        <Slider
          slidesToShow={5}
          slidesToScroll={1}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {laptop &&
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
        {/* <ListProduct products={laptop?.data} isSlide={false}></ListProduct> */}
      </div>
    </div>
  );
};

export default ThinLaptop;

