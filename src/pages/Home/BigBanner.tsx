import { useState, useEffect } from "react";
import styles from "./bigbanner.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import axios from "axios";

const BigBanner = () => {
  const [images, setImages] = useState<string[]>([]);
  const [bannerImage, setBannerImage] = useState<string>("");
  useEffect(() => {
    async function getPromo() {
      const promo = await axios.get(`https://jsonserv.glitch.me/promo`);
      const bigbanner = promo.data.bigbanner;
      setBannerImage(bigbanner.bigImage);
      setImages(bigbanner.slider);
    }
    getPromo();
  }, []);
  return (
    <div className={"h-full object-cover bg-transparent  rounded-2xl mb-6"}>
      <Link to="khuyen-mai">
        <img src={bannerImage} className="rounded-xl" />
      </Link>
      {/* <div className="w-full max-w-[1220px] m-auto rounded-xl absolute   translate-x-1/2 right-1/2 ">
        <Slider
          slidesToShow={2}
          slidesToScroll={2}
          autoplay={true}
          autoplaySpeed={2000}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {images.map((src: string, index: number) => (
            <div className="" key={index}>
              <div className="mx-4">
                <Link to="/">
                  <img
                    src={src}
                    alt=""
                    className="w-full object-cover rounded-xl"
                  />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div> */}
    </div>
  );
};

export default BigBanner;
