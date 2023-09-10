import { useState, useEffect } from "react";
import styles from "./home.module.scss";
import Promo from "./Promo";
import Ticket from "./Ticket";
import BigBanner from "./BigBanner";
import PromoFirst from "./PromoFirst";
import PromoSecond from "./PromoSecond";
import ProductDeal from "./ProductDeal";
import ProductBrand from "./ProductBrand";
import ProductTrend from "./ProductTrend";
import CovenientService from "./CovenientService";
import DiscountOnline from "./DiscountOnline";
import ProductSuggest from "./ProductSuggest";
import ProductCategory from "./ProductCategory";
import ProductHistory from "src/components/ProductHistory";
import { Helmet } from "react-helmet-async";

const Home = ({ title }: { title: string }) => {
  const [displayTicket, setDisplayTicket] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = (event: Event) => {
      setDisplayTicket(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div>
      <Helmet>
        <title>Trang chủ </title>
        <meta name="description" content="Trang chủ " />
      </Helmet>
      <main className={styles.main}>
        <BigBanner />
        <Ticket show={displayTicket} />
        <Promo />
        <PromoFirst />
        <PromoSecond />
        <ProductTrend />
        <ProductSuggest />
        <ProductCategory />
        <DiscountOnline />
        <CovenientService />
        <ProductHistory styleTitle="uppercase text-textWhiteMain" />
        <ProductBrand />
        <ProductDeal />
      </main>
    </div>
  );
};
export default Home;
