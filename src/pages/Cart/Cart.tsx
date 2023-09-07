import { useEffect } from "react";
import EmptyCart from "./EmptyCart";
import CartInfo from "./CartInfo";
import { useAppSelector } from "src/hooks/useRedux";

const Cart = () => {
  const cartItems = useAppSelector((state) => state) || [];

  return cartItems ? (
    <div className="">
      <CartInfo />
    </div>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
