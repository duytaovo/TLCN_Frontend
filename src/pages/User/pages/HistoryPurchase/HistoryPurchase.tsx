import { unwrapResult } from "@reduxjs/toolkit";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { createSearchParams, Link } from "react-router-dom";
import path from "src/constants/path";
import { purchasesStatus } from "src/constants/purchase";
import useQueryParams from "src/hooks/useQueryParams";
import { useAppDispatch } from "src/hooks/useRedux";
import { getPurchases } from "src/store/order/orderSlice";
import { PurchaseListStatus } from "src/types/purchase.type";
import { formatCurrency, generateNameId } from "src/utils/utils";

const purchaseTabs = [
  { status: purchasesStatus.all, name: "Tất cả" },
  { status: purchasesStatus.waitForConfirmation, name: "Chờ xác nhận" },
  { status: purchasesStatus.waitForGetting, name: "Chờ lấy hàng" },
  { status: purchasesStatus.inProgress, name: "Đang giao" },
  { status: purchasesStatus.delivered, name: "Đã giao" },
  { status: purchasesStatus.cancelled, name: "Đã hủy" },
];

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams();
  const status: number = Number(queryParams.status) || purchasesStatus.all;
  const [purchases, setPurchases] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPurchases({ status: status as PurchaseListStatus }))
      .then(unwrapResult)
      .then((res: any) => {
        console.log(res.data.data.data);
        setPurchases(res.data.data.data);
      });
  }, [status, dispatch]);

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status),
        }).toString(),
      }}
      className={classNames(
        "flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center",
        {
          "border-b-mainColor text-mainColor": status === tab.status,
          "border-b-black/10 text-gray-900": status !== tab.status,
        }
      )}
    >
      {tab.name}
    </Link>
  ));

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="sticky top-0 flex rounded-t-sm shadow-sm">
            {purchaseTabsLink}
          </div>
          <div>
            {purchases?.map((purchase: any) => (
              <div
                key={purchase.id}
                className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm"
              >
                <Link
                  to={`${`/${purchase.slug}/detail`}/${generateNameId({
                    name: purchase.name,
                    id: purchase.id.toString(),
                  })}`}
                  className="flex"
                >
                  <div className="ml-3 flex-grow overflow-hidden">
                    <div className="truncate">{purchase.name}</div>
                    <div className="mt-3">x{purchase.quantity}</div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <span className="truncate text-gray-500 line-through">
                      ₫{formatCurrency(purchase.salePrice)}
                    </span>
                    <span className="ml-2 truncate text-red-500">
                      ₫{formatCurrency(purchase.price)}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className="ml-4 text-3xl text-red-500">
                      ₫{formatCurrency(purchase.price * purchase.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
