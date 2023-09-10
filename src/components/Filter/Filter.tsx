import styles from "./filter.module.scss";
import FilterItem from "./FilterItem";
import { useRef, useEffect } from "react";
import FilterItemTotal from "./FilterItemTotal";
import { useDispatch } from "react-redux";
import { HandleFilter } from "src/store/product/productsApi";

interface FilterItem {
  handle: (boolean: boolean) => void;
  data: any;
}
function Filter({ handle, data }: FilterItem) {
  const contain: any = useRef();
  const dispatch = useDispatch();
  const scroll = () => {
    contain.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    HandleFilter(dispatch, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.contain} ref={contain}>
      <div className={styles.filter}>
        {/* Nút đầu */}
        <FilterItemTotal data={data} handle={handle} scroll={scroll} />

        {/* Các nút sau */}
        {data.map((src: any) => (
          <FilterItem data={src} key={src.id} handle={handle} scroll={scroll} />
        ))}
      </div>
    </div>
  );
}

export default Filter;
