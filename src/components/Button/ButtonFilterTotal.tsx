import { Funnel } from "react-bootstrap-icons";

import styles from "./btnFilterTotal.module.scss";
import { forwardRef, useRef } from "react";
import { useSelector } from "react-redux";
function ButtonFilterTotal({}, ref: any) {
  const filter = useSelector((state: any) => state?.products?.filter?.data);
  const number: any = useRef();

  return (
    <div className={styles.wrap} ref={ref}>
      <span className={styles.text}>
        <i className={styles.fristIcon}>
          <Funnel className="text-2xl mr-1" />
        </i>
        Bộ lọc
        <strong className={styles.number} ref={number}>
          {filter?.length}
        </strong>
      </span>
    </div>
  );
}

export default forwardRef(ButtonFilterTotal);
