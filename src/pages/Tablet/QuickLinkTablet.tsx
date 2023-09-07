import QuickLink from "src/components/QuickLink";
import "./quicklinkphone-module.scss";

interface Data {
  type: string;
  link: string;
  demand: string;
}
const data: Data[] = [
  {
    type: "Apple",
    link: "//cdn.tgdd.vn/Brand/1/iPad-(Apple)522-b_4.jpg",
    demand: "Hỗ trợ nghe gọi",
  },
  {
    type: "Samsung",
    link: "//cdn.tgdd.vn/Brand/1/samsungnew-220x48-3.png",
    demand: "Pin Khủng",
  },
  {
    type: "Xiaomi",
    link: "//cdn.tgdd.vn/Brand/1/Tablet-xiaomi-220x48-1.png",
    demand: "Chơi game",
  },
  {
    type: "Lenovo",
    link: "//cdn.tgdd.vn/Brand/1/Lenovo522-b_6.jpg",
    demand: "Chơi game",
  },
  {
    type: "Masstel",
    link: "//cdn.tgdd.vn/Brand/1/Masstel522-b_7.png",
    demand: "Chơi game",
  },
  {
    type: "NOKIA",
    link: "//cdn.tgdd.vn/Brand/1/logonokia-220x48-1.jpg",
    demand: "Chơi game",
  },
  {
    type: "HUAWEI",
    link: "//cdn.tgdd.vn/Brand/1/Huawei522-b_4.jpg",
    demand: "Chơi game",
  },
  {
    type: "Alcatel",
    link: "//cdn.tgdd.vn/Brand/1/logoalcatel-220x48-1.png",
    demand: "Chơi game",
  },
];
const dataDemand = data
  .map((item) => item.demand)
  .reduce(function (accumulator: any, element: any) {
    if (accumulator.indexOf(element) === -1) {
      accumulator.push(element);
    }
    return accumulator;
  }, []);

const QuickLinkTablet = (props: any) => {
  return (
    <div className="container__phone">
      <div className="">
        <div className="quicklink">
          <div>
            {data.map((item) => (
              <QuickLink
                isImg={true}
                type={item.type}
                link={item.link}
                handleSetChoose={props.handleSetChoose}
              ></QuickLink>
            ))}
          </div>
        </div>
      </div>
      <div className="container__quicklink-demand mt-4">
        <div className="">
          <div className="quicklink text-black/75 ">
            <h4 className="ml-6 mb-0">Chọn điện thoại theo nhu cầu:</h4>
            <div className="text-black/75 ">
              {dataDemand.map((item: any) => (
                <QuickLink
                  isImg={false}
                  type=""
                  handleSetChoose={() => {}}
                  demand={item}
                ></QuickLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinkTablet;
