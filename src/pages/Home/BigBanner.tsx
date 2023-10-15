import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import { useAppSelector } from "src/hooks/useRedux";

const BigBanner = () => {
  const { bigImage } = useAppSelector((state) => state.banner.promo.bigbanner);

  return (
    <div className={"h-full object-cover bg-transparent  rounded-2xl mb-6"}>
      <Link to="khuyen-mai">
        <img src={bigImage} className="rounded-xl" />
      </Link>
    </div>
  );
};

export default BigBanner;
