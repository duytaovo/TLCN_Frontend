import "./phone.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BoxSort from "src/components/BoxSort/BoxSort";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";
export interface DataListPhone {
  title: string;
  link: string;
  type?: string;
}
const dataFake: DataListPhone[] = [
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
    title: "Độc quyền",
    link: "",
    type: "docquyen",
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
  isOpen: boolean;
}
const ListPhone = ({ choose, isOpen }: Props) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<boolean>(false);
  const [_choose, _setChoose] = useState<number>(0);
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    // getAllProductByCategory(dispatch, "dienthoai");
  }, []);
  const dataFilter = useAppSelector(
    (state: any) => state?.products?.allProducts?.data
  );
  const filter = useAppSelector((state: any) => state?.products?.filter.data);

  let dataAfter = dataFilter;
  if (filter?.length !== 0) {
    // dataAfter = handleData(dataFilter, filter);
  }
  let getDataFilter = data;
  let typeFilter = checked.concat(choose);
  useEffect(() => {
    const getProduct = async () => {
      //let res = await productService.getProductByBrand('dienthoai',props.chose.toLowerCase())
      if (choose === "") {
        // let res = await productService.getProductByPolicy(
        //   "dienthoai",
        //   checked.map((item) => "&" + item + "=true").join("")
        // );
        // setData(res);
      } else if (choose !== "") {
        // let res = await productService.getProductByBrand(
        //   "dienthoai",
        //   props.chose.toLowerCase() +
        //     checked.map((item) => "&" + item + "=true").join("")
        // );
        // setData(res);
      }
    };
    getProduct();
  }, [choose, checked]);

  useEffect(() => {
    fetch(`https://json.msang.repl.co/products?category=dienthoai`)
      .then((res) => res.json())
      .then((datas) => {
        setData(datas);
      });
  }, []);
  const handleClick = (index: number) => {
    _setChoose(index);
  };
  if (_choose === 3) {
    getDataFilter = getDataFilter.sort((a: any, b: any) => a.price - b.price);
  } else if (_choose === 2) {
    getDataFilter = getDataFilter.sort((a: any, b: any) => b.price - a.price);
  } else if (_choose === 1) {
    getDataFilter = getDataFilter.sort(
      (a: any, b: any) => b.discount - a.discount
    );
  }
  // const a: unknown = "";
  // if (checked.includes("giamgia")) {
  //   getDataFilter = getDataFilter.filter((item) => item.discount !== 0);
  // } else if (checked.includes("tragop")) {
  //   getDataFilter = getDataFilter.filter(
  //     (item) => item.promotion === "Trả góp 0%"
  //   );
  // }
  return (
    <>
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
        category="Điện thoại"
      ></BoxSort>
      <div className="phone__content">
        <div className="listcontent">
          {isOpen === false ? (
            <ListProduct products={getDataFilter} isSlide={false}></ListProduct>
          ) : (
            <ListProduct products={dataAfter} isSlide={false}></ListProduct>
          )}
        </div>
      </div>
    </>
  );
};
export default ListPhone;
