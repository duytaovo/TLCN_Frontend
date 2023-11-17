import { useState } from "react";
import PurchaseHistory from "./PurchaseHistory";
import clsx from "clsx";
const Info = () => {
  return (
    <div className="min-h-[100vh]">
      <div className="w-full max-w-[1200px] mx-auto py-8">
        <div className="mr-8 flex border-b">
          <div
            className={clsx("flex w-full items-center my-2 p-4 cursor-pointer")}
          >
            <div className="w-12 h-12">
              <img
                className="object-cover"
                src="https://cdn.tgdd.vn/mwgcart/orderhistory/images/icon-list.png"
              />
            </div>
            <p className="text-2xl font-medium ml-4">
              Danh sách đơn hàng đã mua
            </p>
          </div>
        </div>
        <div className="">
          {" "}
          <PurchaseHistory />{" "}
        </div>
      </div>
    </div>
  );
};

export default Info;
