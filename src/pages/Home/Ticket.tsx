import { useEffect } from "react";
import css from "./home.module.scss";
import { ArrowUp } from "react-bootstrap-icons";

const Ticket = ({ show }: { show: boolean }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {show && (
        <>
          <img
            className={` ${css.ticketLeft} fixed top-80 duration-500`}
            src="https://cdn.tgdd.vn/2022/08/banner/Trai-79x271-2.png"
          />
          <img
            className={` ${css.ticketRight} fixed top-80 duration-500`}
            src="https://cdn.tgdd.vn/2022/08/banner/Phai-79x271-7.png"
          />
          <button
            className="rounded-full fixed right-4 bottom-4 h-14 w-14"
            onClick={scrollToTop}
          >
            <ArrowUp />
          </button>
        </>
      )}
    </div>
  );
};

export default Ticket;

