import FilterItem from "./FilterItem";
import { useRef, useEffect } from "react";
import FilterItemTotal from "./FilterItemTotal";
import { useAppDispatch } from "src/hooks/useRedux";
import { DataPropsPhone } from "src/pages/Phone/FilterPhone";
import { handleFilterStore } from "src/store/product/productsSlice";

interface FilterItem {
  handle: (boolean: boolean) => void;
  data: DataPropsPhone[];
}

const Filter = ({ handle, data }: FilterItem) => {
  const contain = useRef<any>();
  const dispatch = useAppDispatch();
  const scroll = () => {
    const offset = 40; // Điều chỉnh giá trị offset tùy ý
    // contain.current?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    //   inline: "nearest",
    // });
    // window.scrollBy(0, -offset); // Điều chỉnh vị trí cuộn xuống
    window.scroll({
      top: 210,
      left: 100,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    dispatch(handleFilterStore(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[1200px] h-full mt-[10px]" ref={contain}>
      <div className="w-[1200px] flex flex-wrap p-[5px_0px]">
        {/* Nút đầu */}
        <FilterItemTotal data={data} handle={handle} scroll={scroll} />

        {/* Các nút sau */}
        {data.map((src: DataPropsPhone) => (
          <FilterItem data={src} key={src.id} handle={handle} scroll={scroll} />
        ))}
      </div>
    </div>
  );
};

export default Filter;
