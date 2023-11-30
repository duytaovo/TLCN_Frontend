import { Link } from "react-router-dom";
import "./buttonquicklink-module.scss";
interface Props {
  handleSetChoose: (text: any) => void;
  type: string;
  id?: number;
  demand?: string;
  link?: string;
  isImg: boolean;
}
const QuickLink = ({
  handleSetChoose,
  type,
  demand,
  link,
  isImg,
  id,
}: Props) => {
  return (
    <Link
      to={""}
      onClick={() =>
        handleSetChoose({
          id,
          type,
        })
      }
      className="rounded-md  border-black  ml-4 "
    >
      {demand}
      {isImg == true && (
        <img
          className="w-[90px] h-[25px] rounded-xl  bg-white "
          src={`https:` + link}
          alt={type}
        />
      )}
    </Link>
  );
};
export default QuickLink;
