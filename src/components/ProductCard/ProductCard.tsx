import { Link } from "react-router-dom";
import clsx from "clsx";
import { StarFill } from "react-bootstrap-icons";
import styles from "./card.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import numberWithCommas from "src/utils/numberWithCommas";

function ProductCard(props: any) {
  const dispatch = useDispatch();
  const handleClickDisable = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const [checked, setChecked] = useState(0);

  const handleProductClick = () => {};
  return (
    <Link to={`/${props.category}/${props.slug}`} onClick={handleProductClick}>
      <div className={styles.card}>
        <div className={styles.wrap}>
          <div
            className={clsx(
              styles.discount,
              props.promotion == "" && "invisible"
            )}
          >
            <p>{props.promotion}</p>
          </div>
          <div className={styles.image}>
            <img src={props.img} className={styles.img}></img>
            {props.docquyen && (
              <img
                className={styles.imgPolicy}
                src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"
              ></img>
            )}
            {props.baohanh === "18T" && (
              <img
                className={styles.imgPolicy}
                src="https://cdn.tgdd.vn/ValueIcons/Label_01-02.png"
              ></img>
            )}
          </div>
          {props.tag && <p className={styles.tag}>{props.tag}</p>}
          <p className={styles.title + " truncate"}>{props.title}</p>
          {props.category === "phone" || props.category === "tablet" ? (
            <div className={styles.cardCompare}>
              <p>
                {/*props.parameter[0].SCREEN && <span>{props.parameter[0].SCREEN}</span>*/}
              </p>
              {props.RAM.map((item: any, index: number) => (
                <span
                  key={index}
                  className={checked == index ? styles.selecttype : undefined}
                  onClick={(e) => {
                    handleClickDisable(e);
                    setChecked(index);
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <div className={styles.cardCompare}>
              {props.RAM && <span>{"RAM " + props.RAM}</span>}
              {props.ROM && <span>{"SSD " + props.ROM}</span>}
              {props.ROM && <span>{"SSD " + props.ROM}</span>}
            </div>
          )}
          <p>{props.gift}</p>
          <strong className={styles.price}>
            {numberWithCommas(props.price)}
            <small className="ml-3">-{props.discount * 100}%</small>
          </strong>
          {props.category === "laptop" && (
            <div className={styles.infoProduct}>
              {/* {props.parameter.map((object, index) => (
                                <p key={index}>
                                    <span>{Object.keys(object)}</span>
                                    <span>{Object.values(object)}</span>
                                </p>
                            ))} */}
            </div>
          )}
          <p>
            <span className="text-yellow-400 font-bold">
              {props.star}&ensp;
              <i>
                <StarFill />
              </i>
            </span>
            <span className="text-gray-400">&ensp;({props.totalVote})</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
