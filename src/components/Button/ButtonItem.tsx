import { CaretDownFill } from "react-bootstrap-icons";

import styles from "./btnItem.module.scss";

function ButtonItem(props: any) {
  return (
    <div className={styles.wrap} id={props.title} title={props.name}>
      {props.img ? (
        <img src={props.img} className={styles.text}></img>
      ) : (
        <span className={styles.text}>{props.title}</span>
      )}
    </div>
  );
}

export default ButtonItem;
