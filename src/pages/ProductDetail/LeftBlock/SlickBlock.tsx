import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ModalBox from "./ModalBox";
import { useAppSelector } from "src/hooks/useRedux";
function SlickBlock() {
  const initProductDetail: any = useAppSelector(
    (state) => state.products.productDetail.data
  );
  const { gallery } = initProductDetail;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (current: number, next: number) => {
      if (current < gallery?.length) setCurrentIndex(next + 1);
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const [currentIndex, setCurrentIndex] = useState(1);
  return (
    <div>
      <Slider {...settings}>
        {gallery?.map((src: string, index: number) => (
          <div key={index} className="" style={{ width: 800 }}>
            <div className="h-[400px]">
              <a href="">
                <img
                  src={src}
                  alt=""
                  className="h-full w-full rounded-xl object-scale-down"
                />
              </a>
            </div>
          </div>
        ))}
      </Slider>
      <p className="text-center">
        {/* Xem tất cả điểm nổi bật ({currentIndex}/{gallery?.length}) */}
      </p>
      <ModalBox child={true} />
    </div>
  );
}

export default SlickBlock;
