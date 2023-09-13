import { Funnel } from "react-bootstrap-icons";

import styles from "./btnFilterTotal.module.scss";
import { forwardRef, useRef } from "react";
import { useAppSelector } from "src/hooks/useRedux";
function ButtonFilterTotal({}, ref: any) {
  const filter = useAppSelector((state) => state.products.filter.data);
  const number: any = useRef();

  return (
    <div className={styles.wrap} ref={ref}>
      <span className={styles.text}>
        <i className={styles.fristIcon}>
          <Funnel className="text-2xl mr-1" />
        </i>
        Bộ lọc
        <h5 className={styles.number} id="number" ref={number}>
          {filter.length}
        </h5>
      </span>
    </div>
  );
}

export default forwardRef(ButtonFilterTotal);
