import { useEffect } from "react";
import EmptyCart from "./EmptyCart";
import CartInfo from "./CartInfo";
import { useAppSelector } from "src/hooks/useRedux";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const cartItems = useAppSelector((state) => state) || [];

  return cartItems ? (
    <div className="">
      <Helmet>
        <title>Cart </title>
        <meta name="description" content="Trang giỏ hàng" />
      </Helmet>
      <CartInfo />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>Cart </title>
        <meta name="description" content="Trang giỏ hàng" />
      </Helmet>
      <EmptyCart />
    </div>
  );
};

export default Cart;
