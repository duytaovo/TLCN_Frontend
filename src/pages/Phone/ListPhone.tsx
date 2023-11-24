import axios from "axios";
import "./phone.scss";
import { useEffect, useState } from "react";
import BoxSort from "src/components/BoxSort/BoxSort";
import handleData from "src/components/Filter/handleData";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";
import { ListSmartPhone } from "src/types/allProductsType.interface";
import { Pagination } from "antd";
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
  handlePageChange: any;
  currentPage: number;
}

const ListPhone = ({
  choose,
  isOpen,
  handlePageChange,
  currentPage,
}: Props) => {
  const [dataLocal, setDataLocal] = useState<ListSmartPhone[]>();
  const [selected, setSelected] = useState<boolean>(false);
  const [chooseBoxSort, setChooseBoxSort] = useState<number>(0);
  const [checked, setChecked] = useState<any[]>([]);
  const { smartPhone, filter } = useAppSelector((state) => state.smartphone);
  const pageSize = 10; // Số phần tử trên mỗi trang

  // const dataFilter = useAppSelector((state) => state.products.allProducts.data);
  let dataAfter = smartPhone;
  if (filter?.length !== 0) {
    dataAfter = handleData(smartPhone, filter);
  }
  let getDataFilter: any = dataLocal;
  // let typeFilter = checked.concat(choose);

  useEffect(() => {
    setDataLocal(smartPhone.data);
  }, [smartPhone]);
  useEffect(() => {
    const getProduct = async () => {
      // if (choose === "") {
      //   let res: any = await productService.getProductByPolicy(
      //     "dienthoai",
      //     checked.map((item) => "&" + item + "=true").join("")
      //   );
      //   setDataLocal(res.data);
      // } else if (choose !== "") {
      //   let res: any = await productService.getProductByBrand(
      //     "dienthoai",
      //     choose.toLowerCase() +
      //       checked.map((item) => "&" + item + "=true").join("")
      //   );
      //   setDataLocal(res.data);
      // }
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
        title={choose}
        checked={checked}
        setChecked={setChecked}
        category="Điện thoại"
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
