import axios from "axios";
import "./phone.scss";
import { useEffect, useState } from "react";
import BoxSort from "src/components/BoxSort/BoxSort";
import handleData from "src/components/Filter/handleData";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";
import { ListSmartPhone } from "src/types/allProductsType.interface";
import { Pagination } from "antd";
import { SmartPhone } from "src/store/product/smartPhoneSlice";
export interface DataListPhone {
  id: number;
  title: string;
  link: string;
  type?: string;
}
const dataFake: DataListPhone[] = [
  {
    id: 1,
    title: "Giao nhanh",
    type: "Giao nhanh",
    link: "//cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/icon-thunder.png",
  },
  {
    id: 2,
    title: "Giảm giá",
    link: "",
    type: "giamgia",
  },
  {
    id: 3,
    title: "Góp 0%",
    link: "",
    type: "tragop",
  },
  {
    id: 4,
    title: "Độc quyền",
    link: "",
    type: "docquyen",
  },
  {
    id: 5,
    title: "Mới",
    link: "",
    type: "new",
  },
];
const dataSelected: { id: number; type: string }[] = [
  { id: 1, type: "Giá cao đến thấp" },
  { id: 2, type: "Giá thấp đến cao" },
  {
    id: 3,
    type: "Mới nhất",
  },
  {
    id: 4,
    type: "Bán chạy",
  },
  {
    id: 5,
    type: "% Giảm",
  },
];

interface Props {
  choose?: ConcatArray<never> | string | any;
  isOpen: boolean;
  handlePageChange: any;
  currentPage: number;
}

const ListPhone = ({
  choose,
  isOpen,
  handlePageChange,
  currentPage,
}: Props) => {
  const [dataLocal, setDataLocal] = useState<SmartPhone>();
  const [selected, setSelected] = useState<boolean>(false);
  const [chooseBoxSort, setChooseBoxSort] = useState<number>(0);
  const [checked, setChecked] = useState<any[]>([]);
  const { smartPhone, filter } = useAppSelector((state) => state.smartphone);
  let dataAfter = smartPhone;

  if (filter?.data?.length !== 0) {
    dataAfter = handleData(smartPhone, filter?.data);
  }
  let getDataFilter: any = dataLocal?.data;

  useEffect(() => {
    setDataLocal(smartPhone);
  }, [smartPhone]);
  console.log(choose);
  useEffect(() => {
    // const getProduct = async () => {
    //   if (choose === "") {
    //     let res: any = await productService.getProductByPolicy(
    //       "dienthoai",
    //       checked.map((item) => "&" + item + "=true").join("")
    //     );
    //     setDataLocal(res.data);
    //   } else if (choose !== "") {
    //     let res: any = await productService.getProductByBrand(
    //       "dienthoai",
    //       choose.toLowerCase() +
    //         checked.map((item) => "&" + item + "=true").join("")
    //     );
    //     setDataLocal(res.data);
    //   }
    // };
    // getProduct();
  }, [choose, checked]);

  const handleClick = (index: number) => {
    setChooseBoxSort(index);
  };

  if (chooseBoxSort === 2) {
    getDataFilter = getDataFilter?.data.sort(
      (a: any, b: any) => a.price - b.price
    );
  } else if (chooseBoxSort === 1) {
    getDataFilter = getDataFilter?.data.sort(
      (a: any, b: any) => b.price - a.price
    );
  } else if (chooseBoxSort === 5) {
    getDataFilter = getDataFilter?.data?.sort(
      (a: any, b: any) => b.discount - a.discount
    );
  }

  if (checked.includes("giamgia")) {
    getDataFilter = getDataFilter?.data.filter(
      (item: any) => item.discount !== 0
    );
  } else if (checked.includes("tragop")) {
    getDataFilter = getDataFilter?.data.filter(
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
          isOpen === false ? getDataFilter?.length : dataAfter.data?.length
        }
        checked={checked}
        setChecked={setChecked}
        category="smartphone"
      />
      <div className="phone__content">
        <div className="">
          {isOpen === false ? (
            <ListProduct
              products={getDataFilter}
              isSlide={false}
              category={"smartphone"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          ) : (
            <ListProduct
              handlePageChange={handlePageChange}
              products={dataAfter}
              isSlide={false}
              category={"smartphone"}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default ListPhone;
