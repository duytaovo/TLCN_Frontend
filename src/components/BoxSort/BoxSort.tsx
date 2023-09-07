import styles from "./boxsort.module.scss";
import { clsx } from "clsx";
import { useState } from "react";
import { DataListPhone } from "src/pages/Phone/ListPhone";

interface Props {
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
}

const BoxSort = (props: Props) => {
  const data = props.data;
  const [checked, setChecked] = useState([]);
  const [selected, setSelected] = useState(false);
  const handleChecked = (id: any) => {
    props.setChecked((prev: any) => {
      const isCheck = props.checked.includes(id);
      if (isCheck) {
        return props.checked.filter((item: any) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  return (
    <div className={styles.boxsort}>
      <div className={styles.boxsort__body}>
        <p className={styles.boxsort__total}>
          <b>{props.countProduct}</b>
          <> </>
          <strong>{props.category}</strong>
          <> </>
          {/* <b>{props.title.toUpperCase()}</b> */}
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
                  props.checked.includes(item.type) && styles.active
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
      <p
        className={styles.click}
        onClick={() => props.setSelected(!props.selected)}
      >
        <span>Xếp theo: {props.dataSelected[props.choose]?.type}</span>
        {props.selected && (
          <div className={styles.select}>
            {props.dataSelected.map((item: any, index: number) => (
              <p>
                <a
                  className={`${props.choose === index && styles.check}`}
                  onClick={() => {
                    props.onclick(index);
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
