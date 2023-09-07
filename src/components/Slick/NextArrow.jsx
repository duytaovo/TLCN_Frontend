import { AngleRight } from "../Icons";
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        fontSize: "40px",
        display: "block",
        zIndex: "2",
        right: 0,
        height: "40px",
        width: "40px",
        opacity: "0.8",
        color: "white",
      }}
    >
      <span className="shadow-md absolute  items-center justify-center m-auto bg-mainColor rounded-full inline-block w-full h-full">
        <AngleRight className="text-blue-800" />
      </span>
    </button>
  );
}

export default NextArrow;
