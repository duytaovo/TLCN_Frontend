import { useState } from "react";
import { Link } from "react-router-dom";
import { XCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import numberWithCommas from "src/utils/numberWithCommas";
import { CounterQuantity } from "src/components/Selector";

function ProductItem(props: any) {
  //   const cartItems = useSelector((state) => state.cartItems.value);
  const dispatch = useDispatch();
  const removeCartItem = () => {
    // cartItems.forEach((item) => {
    //   if (item.slug === props.slug && item.color === props.color) {
    //     dispatch(removeItem(item));
    //   }
    // });
  };
  const updateCartItem = (value: number) => {
    // cartItems.forEach((item) => {
    //   if (item.slug === props.slug && item.color === props.color) {
    //     dispatch(updateItem({ ...item, quantity: value }));
    //   }
    // });
  };
  return (
    <div className="flex justify-between my-8 border-b pb-4">
      <div className="flex flex-col items-center justify-center w-28 gap-4">
        <img src={props.img} alt="" />
        <div className="text-lg text-gray-600">
          <button onClick={() => removeCartItem()} className="text-gray-400">
            <i>
              <XCircle />
            </i>
            &nbsp;Xóa
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <Link
            to={`/${props.category}/${props.slug}`}
            className="font-semibold"
          >
            {props.title}
          </Link>
          <div>
            <p className="text-red-500">
              {numberWithCommas(props.price * (1 - props.discount))}₫
            </p>
            <p className="line-through">{numberWithCommas(props.price)}₫</p>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-xl text-black-400">Màu: {props.color}</span>
          <CounterQuantity
            onChange={(value: number) => updateCartItem(value)}
            value={props.quantity}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
