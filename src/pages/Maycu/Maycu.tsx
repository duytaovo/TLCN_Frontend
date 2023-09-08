import { useEffect } from "react";
import FeatureProduct from "./FeatureProduct";
import Tab from "./Tab";
import { dataCard } from "src/items";
import { Helmet } from "react-helmet-async";

function Maycu({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
    document.body.style.backgroundColor = "white";
  }, []);

  //Data của slick
  const images = [
    "https://cdn.tgdd.vn/2022/07/banner/800-170-800x170-6.png",
    "https://cdn.tgdd.vn/2022/07/banner/800-170-800x170-7.png",
  ];
  const Img = () => {
    return images.map((src: string, index: number) => {
      return (
        <a href="/#" key={index}>
          <img src={src} />
        </a>
      );
    });
  };
  const img1 = {
    img: "https://cdn.tgdd.vn/2022/05/banner/Tra-gop-390x80.png",
    link: "/#",
  };
  const img2 = {
    img: "https://cdn.tgdd.vn/2022/05/banner/Doi-tra-390x80.png",
    link: "/#",
  };

  return (
    <main className="w-[86%] max-w-[1200px] my-[1.6rem] mx-auto">
      <Helmet>
        <title>Trang máy cũ </title>
        <meta name="description" content="Trang máy cũ" />
      </Helmet>
      {/* <TopBanner child={<Img />} img1={img1} img2={img2} /> */}
      <Tab />
      {dataCard.map((src) => {
        return <FeatureProduct data={src} key={src.id} />;
      })}
    </main>
  );
}

export default Maycu;
