import "./menutop-module.scss";
import { Link } from "react-scroll";

type Props = {
  type: string;
  style: string;
  title: string;
};
const MenuTop = (props: Props) => {
  const myArray = props.type.split("-");
  return (
    <Link
      className="nav-item text-white"
      to={myArray[1]}
      spy={true}
      smooth={true}
      offset={-109}
    >
      <div className={"box-icon " + props.style}>
        <i className={props.type}></i>
      </div>
      <p>{props.title}</p>
    </Link>
  );
};

export default MenuTop;

