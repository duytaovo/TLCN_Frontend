import QuickLink from "src/components/QuickLink/ButtonQuickLink";
import "./laptopquicklink-module.scss";

type Data = {
  type: string;
  link: string;
};
const data: Data[] = [
  {
    type: "MacBook",
    link: "//cdn.tgdd.vn/Brand/1/logo-macbook-149x40.png",
  },
  {
    type: "ASSUS",
    link: "//cdn.tgdd.vn/Brand/1/logo-asus-149x40.png",
  },
  {
    type: "HP",
    link: "//cdn.tgdd.vn/Brand/1/logo-hp-149x40-1.png",
  },
  {
    type: "LENOVO",
    link: "//cdn.tgdd.vn/Brand/1/logo-lenovo-149x40.png",
  },
  {
    type: "ACER",
    link: "//cdn.tgdd.vn/Brand/1/logo-acer-149x40.png",
  },
  {
    type: "DELL",
    link: "//cdn.tgdd.vn/Brand/1/logo-dell-149x40.png",
  },
  {
    type: "MSI",
    link: "//cdn.tgdd.vn/Brand/1/logo-msi-149x40.png",
  },
  {
    type: "SURFACE",
    link: "//cdn.tgdd.vn/Brand/1/logo-surface-149x40-1.png",
  },
  {
    type: "LG",
    link: "//cdn.tgdd.vn/Brand/1/logo-lg-149x40.png",
  },
  {
    type: "GIGABYTE",
    link: "//cdn.tgdd.vn/Brand/1/logo-gigabyte-149x40.png",
  },
  {
    type: "INTEL NUC",
    link: "//cdn.tgdd.vn/Brand/1/logo-intel-149x40.png",
  },
  {
    type: "CHUWI",
    link: "//cdn.tgdd.vn/Brand/1/logo-chuwi-149x40.png",
  },
  {
    type: "INTEL",
    link: "//cdn.tgdd.vn/Brand/1/logo-itel-149x40.png",
  },
];

interface Props {
  handleSetChoose: (text: string) => void;
  choose: any;
}

const LapTopQuickLink = ({ choose, handleSetChoose }: Props) => {
  return (
    <div className="container__phone space-y-4 mt-4 w-full ">
      <div className=" flex  gap-5">
        {data?.map((item: any, index: number) => {
          const active = item?.id === choose?.id;

          return (
            <div key={index}>
              <QuickLink
                active={active}
                type={item.type}
                id={item.type}
                link={item.link}
                handleSetChoose={handleSetChoose}
                isImg={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LapTopQuickLink;

