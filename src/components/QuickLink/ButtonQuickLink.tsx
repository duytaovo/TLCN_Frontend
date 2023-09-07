import { Link } from "react-router-dom";
import "./buttonquicklink-module.scss";
interface Props {
  handleSetChoose: (text: string) => void;
  type: string;
  demand?: string;
  link?: string;
  isImg: boolean;
}
const QuickLink = ({ handleSetChoose, type, demand, link, isImg }: Props) => {
  return (
    <Link
      to={""}
      onClick={() => handleSetChoose(type)}
      className="rounded-md  border-black  ml-4 "
    >
      {demand}
      {isImg == true && (
        <img
          className="w-[90px] h-[25px] rounded-xl   "
          src={`https:` + link}
          alt={type}
        />
      )}
    </Link>
  );
};
export default QuickLink;
