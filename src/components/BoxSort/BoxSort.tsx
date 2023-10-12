import styles from "./boxsort.module.scss";
import { clsx } from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataListPhone } from "src/pages/Phone/ListPhone";
import SelectCustom from "../Select";

type Props = {
  data: any;
  onclick: any;
  dataSelected: any;
  selected: any;
  setSelected: any;
  choose: any;
  countProduct: any;
  title: string;
  checked: any;
  setChecked: any;
  category: string;
};

const BoxSort = ({
  category,
  checked,
  choose,
  countProduct,
  data,
  dataSelected,
  onclick,
  selected,
  setChecked,
  setSelected,
  title,
}: Props) => {
  console.log(dataSelected);
  const handleChecked = (id: any) => {
    setChecked((prev: any) => {
      const isCheck = checked.includes(id);
      if (isCheck) {
        return checked.filter((item: any) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  return (
    <div className={styles.boxsort}>
      <div className={styles.boxsort__body}>
        <p className={styles.boxsort__total}>
          <b>{countProduct}</b>
          <> </>
          <strong>{category}</strong>
          <> </>
          <b>{title.toUpperCase()}</b>
        </p>
        <div className={styles.checkbox}>
          {data.map((item: DataListPhone, index: number) => (
            <div
              className={styles.checkboxItem}
              key={index}
              onClick={() => handleChecked(item.type)}
            >
              <span
                className={clsx(
                  styles.tickCheckbox,
                  checked.includes(item.type) && styles.active
                )}
              ></span>
              <i>
                <img src={item.link} alt="" />
              </i>
              <span className={styles.itemTitle}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <p className={styles.click} onClick={() => setSelected(!selected)}>
        <span>Xếp theo: {dataSelected[choose]?.type}</span>
        {selected && (
          <div className={styles.select}>
            {dataSelected.map((item: any, index: number) => (
              <p>
                <Link
                  to={""}
                  className={`${choose === index && styles.check}`}
                  onClick={() => {
                    onclick(index);
                  }}
                >
                  <i className="text-black text-xl">{item.type}</i>
                </Link>
              </p>
            ))}
            {/* <SelectCustom
              // className={`${choose === index && styles.check}`}
              id="boxPhone"
              placeholder="Vui lòng chọn"
              defaultValue={""}
              options={["Điện thoại", "Laptop", "Tablet", "Phụ kiện"]}
              // onChange={handleOnChangeCarBrand}
            ></SelectCustom> */}
          </div>
        )}
      </p>
    </div>
  );
};
export default BoxSort;
