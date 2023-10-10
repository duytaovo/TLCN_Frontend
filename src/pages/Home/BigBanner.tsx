import { useState, useEffect } from "react";
import styles from "./bigbanner.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
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
    </div>
  );
};

export default BigBanner;
