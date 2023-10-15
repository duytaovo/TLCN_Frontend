import { useState, useEffect } from "react";
import "./tablet.scss";
import BoxSort from "src/components/BoxSort/BoxSort";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";
import handleData from "src/components/Filter/handleData";
import { productService } from "src/services";

interface Data {
  title: string;
  link: string;
  type?: string;
}
const dataFake: Data[] = [
  {
    title: "Giao nhanh",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/icon-thunder.png",
  },
  {
    title: "Giảm giá",
    link: "",
    type: "giamgia",
  },
  {
    title: "Góp 0%",
    link: "",
    type: "tragop",
  },
  {
    title: "Mới",
    link: "",
    type: "new",
  },
];
const dataSelected: { type: string }[] = [
  {
    type: "Nổi bật",
  },
  {
    type: "% Giảm giá cao",
  },
  {
    type: "Giá cao đến thấp",
  },
  {
    type: "Giá thấp đến cao",
  },
];

interface Props {
  choose?: ConcatArray<never> | string | any;
  isOpen?: boolean;
}
const ListTablet = ({ choose, isOpen }: Props) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(false);
  const [checked, setChecked] = useState<any>([]);
  const [chooseBoxSort, setChooseBoxSort] = useState<number>(0);
  const dataFilter = useAppSelector((state) => state.products.allProducts.data);
  const filter = useAppSelector((state) => state.products.filter.data);

  let dataAfter = dataFilter;

  if (filter?.length !== 0) {
    dataAfter = handleData(dataFilter, filter);
  }
  let getDataFilter = data;

  useEffect(() => {
    const getProduct = async () => {
      if (choose === "") {
        let res: any = await productService.getProductByPolicy(
          "tablet",
          checked.map((item: any) => "&" + item + "=true").join("")
        );
        setData(res.data);
      } else if (choose !== "") {
        let res: any = await productService.getProductByBrand(
          "tablet",
          choose.toLowerCase() +
            checked.map((item: any) => "&" + item + "=true").join("")
        );
        setData(res.data);
      }
    };
    getProduct();
  }, [choose, checked]);

  const handleClick = (index: number) => {
    setChooseBoxSort(index);
  };

  if (chooseBoxSort === 3) {
    getDataFilter = getDataFilter.sort((a: any, b: any) => a.price - b.price);
  } else if (chooseBoxSort === 2) {
    getDataFilter = getDataFilter.sort((a: any, b: any) => b.price - a.price);
  } else if (chooseBoxSort === 1) {
    getDataFilter = getDataFilter?.sort(
      (a: any, b: any) => b.discount - a.discount
    );
  }

  if (checked.includes("giamgia")) {
    getDataFilter = getDataFilter.filter((item: any) => item.discount !== 0);
  } else if (checked.includes("tragop")) {
    getDataFilter = getDataFilter.filter(
      (item: any) => item.promotion === "Trả góp 0%"
    );
  }

  return (
    <div className="space-y-8">
      <BoxSort
        data={dataFake}
        onclick={handleClick}
        dataSelected={dataSelected}
        selected={selected}
        setSelected={setSelected}
        choose={choose}
        countProduct={
          isOpen === false ? getDataFilter.length : dataAfter.length
        }
        title={choose}
        checked={checked}
        setChecked={setChecked}
        category={"Máy tính bảng"}
      />
      <div className="tablet__content container__phone">
        <div className="listcontent">
          {isOpen === false ? (
            <ListProduct products={getDataFilter} isSlide={false} />
          ) : (
            <ListProduct products={dataAfter} isSlide={false} />
          )}
        </div>
      </div>
    </div>
  );
};
export default ListTablet;
