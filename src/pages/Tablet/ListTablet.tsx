import { useState, useEffect } from "react";
import "./tablet.scss";
import { useSelector, useDispatch } from "react-redux";
import BoxSort from "src/components/BoxSort/BoxSort";
import ListProduct from "src/components/ListProduct/ListProduct";

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
const ListTablet = (props: any) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(false);
  const [choose, setChose] = useState(0);
  const [checked, setChecked] = useState([]);
  //const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // getAllProductByCategory(dispatch, "tablet");
  }, []);
  //   const dataFilter = useSelector((state) => state?.products?.allProducts?.data);
  //   const filter = useSelector((state) => state.products.filter.data);

  //   let dataAfter = dataFilter;
  //   if (filter.length !== 0) {
  // dataAfter = handleData(dataFilter, filter);
  //   }
  let getDataFilter = data;
  let typeFilter = checked.concat(props.chose);
  useEffect(() => {
    // const getProduct = async () => {
    //   //let res = await productService.getProductByBrand('dienthoai',props.chose.toLowerCase())
    //   if (props.chose === "") {
    //     let res = await productService.getProductByPolicy(
    //       "tablet",
    //       checked.map((item) => "&" + item + "=true").join("")
    //     );
    //     setData(res);
    //   } else if (props.chose !== "") {
    //     let res = await productService.getProductByBrand(
    //       "tablet",
    //       props.chose.toLowerCase() +
    //         checked.map((item) => "&" + item + "=true").join("")
    //     );
    //     setData(res);
    //   }
    // };
    // getProduct();
  }, [props.chose, checked]);
  const handleClick = (index: number) => {
    setChose(index);
  };
  useEffect(() => {
    fetch("https://json.msang.repl.co/products?category=tablet")
      .then((response) => response.json())
      .then((datas) => setData(datas));
  }, []);
  //   if (chose === 3) {
  //     getDataFilter = getDataFilter.sort((a, b) => a.price - b.price);
  //   } else if (chose === 2) {
  //     getDataFilter = getDataFilter.sort((a, b) => b.price - a.price);
  //   } else if (chose === 1) {
  //     getDataFilter = getDataFilter.sort((a, b) => b.discount - a.discount);
  //   }
  //   if (checked.includes("giamgia")) {
  //     getDataFilter = getDataFilter.filter((item) => item.discount !== 0);
  //   } else if (checked.includes("tragop")) {
  //     getDataFilter = getDataFilter.filter(
  //       (item) => item.promotion === "Trả góp 0%"
  //     );
  //   }
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
          //   props.isOpen === false ? getDataFilter.length : dataAfter.length
          ""
        }
        title={props.choose}
        checked={checked}
        setChecked={setChecked}
        category={"Máy tính bảng"}
      ></BoxSort>
      <div className="tablet__content">
        <div className="listcontent">
          {props.isOpen === false ? (
            <ListProduct products={getDataFilter} isSlide={false}></ListProduct>
          ) : (
            <ListProduct products={[]} isSlide={false}></ListProduct>
          )}
        </div>
      </div>
    </div>
  );
};
export default ListTablet;
