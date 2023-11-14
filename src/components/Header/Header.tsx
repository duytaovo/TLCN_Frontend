import { Link, useNavigate } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import FilterButton from "./FilterButton";
import styles from "./header.module.scss";
import "./header.module.scss";
import { MenuProps } from "antd";
import { useContext, useEffect, useState } from "react";
import path from "src/constants/path";
import { useTranslation } from "react-i18next";
import CustomDropDown from "../Dropdown/Dropdown";
import { AppContext } from "src/contexts/app.context";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import logo from "src/assets/images/logonew.jpg";
import { clearLS } from "src/utils/auth";
import { logoutUser } from "src/store/user/userSlice";
import { useAppDispatch } from "src/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const customDropdownStyle = {
  arrow: false,
  isOnClick: false,
  className: "px-1 mx-3 xl:p-0 xl:mr-0 hover:",
};

const menuStyle = {
  padding: "20px 20px",
  borderRadius: "16px",
};
const Header = () => {
  const { t } = useTranslation("home");
  const {} = useContext(AppContext);
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
  const handleOpenModal = () => {};
  const itemAcount: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link to={path.register}>
          <div className={""}>
            <span className={""}>{t("header.register")}</span>
          </div>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link to={path.login}>
          <div className={""}>
            <span className={""}>{t("header.login")}</span>
          </div>
        </Link>
      ),
    },
  ];

  const itemLogout: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <div
          onClick={async () => {
            await navigate(path.profile);
          }}
        >
          <span className={""}>{t("header.profile")}</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={async () => {
            await clearLS();
            await dispatch(logoutUser("")).then(unwrapResult);
            await toast.success("Đăng xuất thành công");

            setTimeout(async () => {
              await location.reload();
              await navigate("/");
            }, 1000);
          }}
        >
          <span className={""}>{t("header.logout")}</span>
        </div>
      ),
    },
  ];
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
            <div className="translate-x-2">
              <img
                src={logo}
                alt="logo"
                className="w-[130px] h-[65px] rounded-md"
              />
            </div>
          </Link>
          <FilterButton />
          <SearchInput />
          <Link
            to={path.historyPurchase}
            onClick={handleOrderClick}
            className="w-32 text-center "
          >
            Lịch sử đơn hàng
          </Link>
          <Link to={path.cartNew}>
            <CartButton />
          </Link>
          <CustomDropDown
            {...customDropdownStyle}
            menuStyle={menuStyle}
            items={isAuthenticated ? itemLogout : itemAcount}
            children={
              <div className="flex items-center justify-around cursor-pointer ">
                {true ? (
                  <SentimentSatisfiedAltRoundedIcon />
                ) : (
                  <div onClick={handleOpenModal}>Tài khoản</div>
                  // <AccountCircleIcon
                  //   className="text-lg"
                  //   onClick={handleOpenModal}
                  // />
                )}

                {/* <ArrowDropDownIcon className='group-hover:text-mainColor'/> */}
              </div>
            }
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
