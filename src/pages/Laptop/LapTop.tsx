import BigBannerLapTop from "./BigBannerLapTop";
import LapTopQuickLink from "./LapTopQuickLink";
import MenuTopLapTop from "./MenuTopLapTop";
import LapTopDeal from "./LapTopDeal";
import Gaming from "./Gaming";
import MacBook from "./MacBook";
import StudyLaptop from "./StudyLaptop";
import GraphicLaptop from "./GraphicLaptop";
import ThinLaptop from "./ThinLaptop";
import LuxuryLaptop from "./LuxuryLaptop";
import Office from "./Office";
import Trademark from "./Trademark";
import { Helmet } from "react-helmet-async";

const LapTop = () => {
  return (
    <div>
      <Helmet>
        <title>Laptop </title>
        <meta name="description" content="Trang laptop" />
      </Helmet>
      <BigBannerLapTop />
      <LapTopQuickLink />
      <MenuTopLapTop />
      <LapTopDeal />
      <Gaming />
      <MacBook />
      <StudyLaptop />
      <GraphicLaptop />
      <ThinLaptop></ThinLaptop>
      <LuxuryLaptop></LuxuryLaptop>
      <Office></Office>
      <Trademark></Trademark>
    </div>
  );
};
export default LapTop;
