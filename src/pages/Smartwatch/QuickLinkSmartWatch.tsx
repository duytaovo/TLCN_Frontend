import QuickLink from "src/components/QuickLink/ButtonQuickLink";

const data: { link: string }[] = [
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo01.png",
  },
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo02b.png",
  },
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo03.png",
  },
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo04-1.png",
  },
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo05.png",
  },
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo06.png",
  },
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logoAMZ.png",
  },
  {
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/smartwatch/logo08.png",
  },
];
const QuickLinkSmartWatch = () => {
  return (
    <div className="container__quicklink bg-[#0f0004]">
      <div className="quicklink m-0" style={{ backgroundColor: "#0f0004" }}>
        <div>
          {data.map((item) => (
            <QuickLink
              isImg={true}
              type=""
              handleSetChoose={() => {}}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinkSmartWatch;
