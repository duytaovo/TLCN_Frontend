import QuickLink from "src/components/QuickLink/ButtonQuickLink";

const data: { link: string; id: number; name: string }[] = [
  {
    id: 1,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo01.png",
  },
  {
    id: 2,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo02b.png",
  },
  {
    id: 3,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo03.png",
  },
  {
    id: 4,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo04-1.png",
  },
  {
    id: 5,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo05.png",
  },
  {
    id: 6,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo06.png",
  },
  {
    id: 7,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logoAMZ.png",
  },
  {
    id: 8,
    name: "apple",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo08.png",
  },
];
interface Props {
  handleSetChoose: (text: string) => void;
}
const QuickLinkSmartWatch = ({ handleSetChoose }: Props) => {
  return (
    <div className="container__quicklink ">
      <div className="quicklink m-0" style={{ backgroundColor: "#" }}>
        <div>
          {data.map((item) => (
            <QuickLink
              // active={active}
              type={item.name}
              id={item.id}
              link={item.link}
              handleSetChoose={handleSetChoose}
              isImg={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinkSmartWatch;

