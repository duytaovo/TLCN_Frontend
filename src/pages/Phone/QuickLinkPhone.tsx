import QuickLink from "src/components/QuickLink/ButtonQuickLink";
import ListPhone from "./ListPhone";
import { Link } from "react-router-dom";
// import "./quicklinkphone-module.scss";
interface Data {
  type: string;
  link: string;
  demand?: string;
}
interface Data2 {
  demand?: string;
}
const data: Data[] = [
  {
    type: "apple",
    link: "//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png",
  },
  {
    type: "Samsung",
    link: "//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png",
  },
  {
    type: "Oppo",
    link: "//cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg",
  },
  {
    type: "Xiaomi",
    link: "//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png",
  },
  {
    type: "Vivo",
    link: "//cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png",
  },
  {
    type: "Realme",
    link: "//cdn.tgdd.vn/Brand/1/Realme42-b_37.png",
  },
  {
    type: "Nokia",
    link: "//cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg",
  },
  {
    type: "Mobell",
    link: "//cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg",
  },
  {
    type: "itel",
    link: "//cdn.tgdd.vn/Brand/1/Itel42-b_54.jpg",
  },
  {
    type: "Masstel",
    link: "//cdn.tgdd.vn/Brand/1/Masstel42-b_0.png",
  },
];

const data2: Data2[] = [
  {
    demand: "Chơi game/Cấu hình cao",
  },
  {
    demand: "Chụp ảnh, quay phim",
  },
  {
    demand: "Mỏng nhẹ",
  },
  {
    demand: "Nhỏ gọn dễ cầm",
  },
  {
    demand: "Chơi game/Cấu hình cao",
  },
];

interface Props {
  handleSetChoose: (text: string) => void;
}
const QuickLinkPhone = ({ handleSetChoose }: Props) => {
  return (
    <>
      <div className="container__phone space-y-4 mt-4">
        <div className="">
          <div className="flex justify-between    flex-wrap gap-3">
            {data.map((item: Data, index: number) => (
              <div key={index}>
                <QuickLink
                  type={item.type}
                  link={item.link}
                  handleSetChoose={handleSetChoose}
                  isImg={true}
                ></QuickLink>
              </div>
            ))}
          </div>
        </div>
        <div className="container__quicklink-demand">
          <div className="">
            <div className=" space-y-4">
              <h4 className="text-[14px] ">Chọn điện thoại theo nhu cầu:</h4>
              <div className="flex justify-between items-center flex-wrap gap-3">
                {data2.map((item: Data2, index: number) => (
                  <div key={index}>
                    <Link
                      to={""}
                      // onClick={() => handleSetChoose(item.type)}
                      className="rounded-xl border-solid border-[1px] m-[0px_8px_10px_0px] p-[6px_13px]"
                    >
                      {item.demand}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickLinkPhone;
