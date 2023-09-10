import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import FilterButton from "./FilterButton";
import styles from "./header.module.scss";
import "./header.module.scss";
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOrderClick = () => {};
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`${
        styles.heading
      } fixed top-0 z-[100] box-border text-textWhiteMain  w-full items-center justify-between ${
        isScrolled ? "bg-mainColor " : ""
      }`}
    >
      <div className={styles.top}>
        <div className={styles.wrap}>
          <Link to="/">
            <div className={styles.logo}></div>
          </Link>
          <FilterButton />
          <SearchInput />
          <Link
            to="/history"
            onClick={handleOrderClick}
            className="w-32 text-center "
          >
            Lịch sử đơn hàng
          </Link>
          <Link to="/cart">
            <CartButton />
          </Link>
          <Link to="/news">24h Công nghệ</Link>
          <Link to="/about">Hỏi đáp</Link>
          {/* <Link to="/gameapp">Game app</Link> */}
        </div>
      </div>
      <div className={styles.bottom}>
        <HeaderNav />
      </div>
    </header>
  );
}

export default Header;
