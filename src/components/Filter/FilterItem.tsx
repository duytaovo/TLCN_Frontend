import styles from "./filteritem.module.scss";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import SliderPrice from "./SliderPrice";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { HandleFilter } from "src/store/product/productsApi";
import ButtonFilter from "src/components/Button/ButtonFilter";
import ButtonItem from "src/components/Button/ButtonItem";

interface Props {
  data: any;
  handle: (boolean: boolean) => void;
  scroll: () => void;
}
function FilterItem({ data, handle, scroll }: Props) {
  //css
  const [isOpen, setisOpen] = useState("false");
  const [isApper, setIsApper] = useState(false);
  const item: any = useRef();
  const bound: any = useRef();
  const button: any = useRef();
  const itemHiden: any = useRef();
  const ad: any = useRef();
  //redux + logic
  const filter = useAppSelector((state) => state.products.filter.data); // Lấy tất cả
  const [arrayTemp, setArrayTemp] = useState([]); // Lấy giá trị trong một khung
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  // Tạo thẻ để css thêm
  // const styleElem = document.head.appendChild(document.createElement("style"));

  // Xử lý đóng mở nút
  const handleOpen = () => {
    scroll();
    if (isOpen == "false") {
      setisOpen("true");
      button.current.style.borderColor = "#498fef";
      let div: any = ReactDOM.findDOMNode(button.current.firstElementChild);
      let span: any = div.firstElementChild;
      //Đổi chiều mũi tên
      span.style =
        "border-color:  transparent transparent black  transparent;bottom: 6px;";

      const position: any = document.getElementById(data.id);
      if (position.getBoundingClientRect().right > 1000) {
        item.current.style = "right:0 ; display :flex";
        ad.current.style = "";
      } else {
        item.current.style.display = "flex";
      }
      ad.current.style = "display:block";
    } else {
      setFalse();
    }
  };

  const setFalse = () => {
    item.current.style.display = "none";
    setisOpen("false");
    if (arrayTemp.length === 0 || (filter.length > 0 && checkTurnOn())) {
      button.current.style.borderColor = "#e1e1e1";
    }

    //Đổi chiều mũi tên
    let div: any = ReactDOM.findDOMNode(button.current.firstElementChild);
    let span: any = div.firstElementChild;
    span.style =
      "border-color:black transparent transparent   transparent;bottom: 2px;";
    ad.current.style = "display:none";
  };

  // Đóng khi click ra ngoài
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          isOpen === "true"
        ) {
          setFalse();
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  };

  useOutsideAlerter(bound);

  const handleAppear = (e: any) => {
    // Lấy keyword
    let newKeyword = {
      [data.title]: e.target.id,
    };
    // kiểm tra có tồn tại chưa trong mảng
    const checkInArray = arrayTemp.some((element) => {
      let value = Object.values(element);
      if (value[0] === e.target.id) return true;
    });
    // Lấy element theo tên
    const element = Array.from(document.getElementsByName(data.title));

    // Nếu có thì tắt và bỏ ra khỏi mảng
    if (checkInArray) {
      // e.target.style='border-color: #e1e1e1; color:#333'
      // Tắt bằng id
      const temp = arrayTemp.filter((element) => {
        return Object.values(element) != e.target.id;
      });
      setArrayTemp(temp);
    }
    // Nếu chưa thì bật và thêm vào mảng
    else {
      // e.target.style='border-color: #498fef;color: #498fef;'
      // Mở bằng id

      const temp: any = [...arrayTemp, newKeyword];
      setArrayTemp(temp);
    }

    //------------------------------------
    // kiểm tra có tồn tại chưa trong filter chưa
    const checkInFilter = filter.some((element) => {
      let value = Object.values(element);
      let key = Object.keys(element);
      if (value[0] === e.target.id && key[0] === data.title) return true;
    });

    // Nếu có thì bỏ ra khỏi filter
    if (checkInFilter) {
      element.map((curent: any) => {
        if (curent.id === e.target.id)
          curent.style = "border-color: #e1e1e1; color:#333";
      });
      const temp = filter.filter((element) => {
        let value = Object.values(element);
        let key = Object.keys(element);

        if (key[0] === data.title && value[0] === e.target.id) {
        } else {
          return element;
        }
      });
      HandleFilter(dispatch, temp);
    }
    // Nếu chưa thì thêm vào filter
    else {
      element.map((curent: any) => {
        if (curent.id === e.target.id)
          curent.style = "border-color: #498fef;color: #498fef;";
      });
      const temp = [...filter, newKeyword];
      HandleFilter(dispatch, temp);
    }
    // Hiện nút filter
    itemHiden.current.style.display = "block";
  };

  const handleFilter = (e: any) => {
    handle(true);
    // item.current.style.display = 'none';
    setFalse();
  };

  const Apper = (boolean: boolean) => {
    setIsApper(boolean);
  };
  if (isApper) {
    itemHiden.current.style.display = "block";
  }

  const checkTurnOn = useCallback(
    () =>
      filter.some((element) => {
        let key = Object.keys(element);
        if (key[0] === data.title) return true;
      }),
    []
  );
  const checkTurnOn1 = () =>
    filter.some((element) => {
      let key = Object.keys(element);
      if (key[0] === data.title) return true;
    });
  useEffect(() => {
    if (filter.length === 0) setArrayTemp([]);
    if (arrayTemp.length > 0 || (filter.length > 0 && checkTurnOn())) {
      button.current.style.borderColor = "#498fef";
      const number = Array.from(document.getElementsByName("number"));
      number[0].style.display = "inline";
    } else {
      button.current.style.borderColor = "#e1e1e1";
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.length, checkTurnOn]);
  useEffect(() => {
    if (checkTurnOn1()) {
      button.current.style.borderColor = "#498fef";
      const number = Array.from(document.getElementsByName("number"));
      // number[0].style.display = "inline";
    }
  }, [checkTurnOn1]);

  return (
    <div className={styles.bound} ref={bound}>
      {/* Nút chính */}
      <div className={styles.temp} onClick={handleOpen} id={data.id}>
        <ButtonFilter title={data.title} ref={button} />
      </div>
      <span className={styles.ad} ref={ad}></span>
      <div className={styles.item} ref={item}>
        {/* Các nút con */}
        <div className={styles.wrap}>
          {data.detail.map((src: any, index: number) => {
            return (
              <span
                className={styles.click}
                onClick={handleAppear}
                id={src}
                key={index}
              >
                {data.title === "Hãng" ? (
                  <ButtonItem
                    title={src}
                    name={data.title}
                    img={data.img[index]}
                  />
                ) : (
                  <ButtonItem title={src} name={data.title} />
                )}
              </span>
            );
          })}
        </div>
        {data.title == "Giá" ? <SliderPrice Apper={Apper} /> : ""}

        <div className={styles.itemHiden} ref={itemHiden}>
          <a href="" className={styles.close}>
            Bỏ chọn
          </a>
          <div className={styles.open} onClick={handleFilter}>
            Xem kết quả
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterItem;
