import axios from "axios";
import "./phone.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BoxSort from "src/components/BoxSort/BoxSort";
import handleData from "src/components/Filter/handleData";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { productService } from "src/services";
import { getAllProductByCategory } from "src/store/product/productsApi";
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
  const [data, setData] = useState<[]>([]);
  const [selected, setSelected] = useState<boolean>(false);
  const [_chooseBoxSort, _setChooseBoxSort] = useState<number>(0);
  const [checked, setChecked] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllProductByCategory(dispatch, "dienthoai");
  }, []);
  const dataFilter = useAppSelector((state) => state.products.allProducts.data);
  const filter = useAppSelector((state) => state.products.filter.data);

  let dataAfter = dataFilter;
  if (filter?.length !== 0) {
    dataAfter = handleData(dataFilter, filter);
  }
  let getDataFilter: any = data;
  // let typeFilter = checked.concat(choose);

  useEffect(() => {
    axios
      .get(`https://json.msang.repl.co/products?category=dienthoai`)
      .then((res) => {
        res.data;
      })
      .then((data: any) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      if (choose === "") {
        let res: any = await productService.getProductByPolicy(
          "dienthoai",
          checked.map((item) => "&" + item + "=true").join("")
        );
        setData(res.data);
      } else if (choose !== "") {
        let res: any = await productService.getProductByBrand(
          "dienthoai",
          choose.toLowerCase() +
            checked.map((item) => "&" + item + "=true").join("")
        );
        setData(res.data);
      }
    };
    getProduct();
  }, [choose, checked]);

  const handleClick = (index: number) => {
    _setChooseBoxSort(index);
  };

  if (_chooseBoxSort === 3) {
    getDataFilter = getDataFilter.sort((a: any, b: any) => a.price - b.price);
  } else if (_chooseBoxSort === 2) {
    getDataFilter = getDataFilter.sort((a: any, b: any) => b.price - a.price);
  } else if (_chooseBoxSort === 1) {
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
    <>
      <BoxSort
        data={dataFake}
        onclick={handleClick}
        dataSelected={dataSelected}
        selected={selected}
        setSelected={setSelected}
        choose={choose}
        countProduct={
          isOpen === false ? getDataFilter?.length : dataAfter?.length
        }
        title={choose}
        checked={checked}
        setChecked={setChecked}
        category="Điện thoại"
      />
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
