import styles from "./boxsort.module.scss";
import { clsx } from "clsx";
import { useState } from "react";
import { DataListPhone } from "src/pages/Phone/ListPhone";

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
          {/* <b>{title.toUpperCase()}</b> */}
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
                <a
                  className={`${choose === index && styles.check}`}
                  onClick={() => {
                    onclick(index);
                  }}
                >
                  <i className="text-black text-xl">{item.type}</i>
                </a>
              </p>
            ))}
          </div>
        )}
      </p>
    </div>
  );
};
export default BoxSort;
