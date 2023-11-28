import styles from "./btnItem.module.scss";

type Props = {
  title: string;
  name: string;
  img?: string;
};
function ButtonItem(props: Props) {
  return (
    <div
      className={`${styles.wrap}  ${props.name} `}
      id={props.title}
      title={props.name}
    >
      {props.img ? (
        <img src={`https:` + props?.img} className={styles.text}></img>
      ) : (
        <span className={styles.text}>{props.title}</span>
      )}
    </div>
  );
}

export default ButtonItem;
