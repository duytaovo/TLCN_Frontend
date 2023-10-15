import BigBanner from "./BigBanner";
import Content2 from "./Content-2";
import Comment from "./Comment";
import "./samsung.scss";
import { Helmet } from "react-helmet-async";

const Samsung = () => {
  return (
    <div>
      <Helmet>
        <title>Sam sung</title>
        <meta name="description" content="Trang chi tiết sam sung" />
      </Helmet>
      <BigBanner />
      <Content2 />
      <div className="commentSamsung mb-5">
        <Comment />
      </div>
    </div>
  );
};
export default Samsung;
