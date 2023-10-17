import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import path from "src/constants/path";
import { purchasesStatus } from "src/constants/purchase";
import { Purchase } from "src/types/purchase.type";
import { formatCurrency, generateNameId } from "src/utils/utils";
import produce from "immer";
import keyBy from "lodash/keyBy";
import { toast } from "react-toastify";
import { AppContext } from "src/contexts/app.context";
import noproduct from "src/assets/images/no-product.png";
import { useAppDispatch } from "src/hooks/useRedux";
import {
  buyPurchases,
  deletePurchases,
  getPurchases,
  updatePurchase,
} from "src/store/order/orderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import QuantityController from "./QuantityController";
import Button from "../Auth/Button";

export default function CartNew() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext);
  const [purchasesInCartData, setPurchasesInCartData] = useState<[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(
        getPurchases({ status: purchasesStatus.inCart })
      ).then(unwrapResult);
      setPurchasesInCartData(res.data.data);
    };
    getData();
  }, [dispatch]);

  const location = useLocation();
  const choosenPurchaseIdFromLocation = (
    location.state as { purchaseId: string } | null
  )?.purchaseId;

  const isAllChecked = useMemo(
    () => extendedPurchases.every((purchase) => purchase.checked),
    [extendedPurchases]
  );

  const checkedPurchases = useMemo(
    () => extendedPurchases.filter((purchase) => purchase.checked),
    [extendedPurchases]
  );

  const checkedPurchasesCount = checkedPurchases.length;

  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count;
      }, 0),
    [checkedPurchases]
  );

  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return (
          result +
          (current.product.price_before_discount - current.product.price) *
            current.buy_count
        );
      }, 0),
    [checkedPurchases]
  );

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, "_id");

      return (
        purchasesInCartData?.map((purchase: any) => {
          const isChoosenPurchaseFromLocation =
            choosenPurchaseIdFromLocation === purchase._id;
          return {
            ...purchase,
            disabled: false,
            checked:
              isChoosenPurchaseFromLocation ||
              Boolean(extendedPurchasesObject[purchase._id]?.checked),
          };
        }) || []
      );
    });
  }, [purchasesInCartData, choosenPurchaseIdFromLocation]);

  useEffect(() => {
    return () => {
      history.replaceState(null, "");
    };
  }, []);

  const handleCheck =
    (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].checked = event.target.checked;
        })
      );
    };

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked,
      }))
    );
  };

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value;
      })
    );
  };

  const handleQuantity = async (
    purchaseIndex: number,
    value: number,
    enable: boolean
  ) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex];
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true;
        })
      );

      await dispatch(
        updatePurchase({
          product_id: purchase.product._id,
          buy_count: value,
        })
      ).then(unwrapResult);
      const res = await dispatch(
        getPurchases({ status: purchasesStatus.inCart })
      ).then(unwrapResult);
      setPurchasesInCartData(res.data.data);
    }
  };

  const handleDelete = (purchaseIndex: number) => async () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id;
    const res = await dispatch(deletePurchases([purchaseId])).then(
      unwrapResult
    );
    const res2 = await dispatch(
      getPurchases({ status: purchasesStatus.inCart })
    ).then(unwrapResult);
    setPurchasesInCartData(res2.data.data);

    if (res.status === 200) {
      toast.success("Xóa thành công", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const handleDeleteManyPurchases = async () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id);
    const res = await dispatch(deletePurchases(purchasesIds)).then(
      unwrapResult
    );

    const res2 = await dispatch(
      getPurchases({ status: purchasesStatus.inCart })
    ).then(unwrapResult);
    setPurchasesInCartData(res2.data.data);

    if (res.status === 200) {
      toast.success("Xóa thành công", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const handleBuyPurchases = async () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count,
      }));
      const res = await dispatch(buyPurchases(body)).then(unwrapResult);
      if (res.status === 200) {
        toast.success("Mua thành công", {
          position: "top-center",
          autoClose: 1000,
        });
      }
      const res2 = await dispatch(
        getPurchases({ status: purchasesStatus.inCart })
      ).then(unwrapResult);
      setPurchasesInCartData(res2.data.data);
    } else {
      toast.error("Vui lòng chọn sản phẩm", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="bg-neutral-100 py-16">
      <div className="container text-black">
        {extendedPurchases.length > 0 ? (
          <>
            <div className="overflow-auto">
              <div className="">
                <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-lg capitalize text-gray-500 shadow">
                  <div className="col-span-6">
                    <div className="flex items-center">
                      <div className="flex flex-shrink-0 items-center justify-center pr-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-orange"
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className="flex-grow text-black">Sản phẩm</div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-5 text-center">
                      <div className="col-span-2">Đơn giá</div>
                      <div className="col-span-1">Số lượng</div>
                      <div className="col-span-1">Số tiền</div>
                      <div className="col-span-1">Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className="my-3 rounded-sm bg-white p-5 shadow">
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-lg text-gray-500 first:mt-0"
                      >
                        <div className="col-span-6">
                          <div className="flex">
                            <div className="flex flex-shrink-0 items-center justify-center pr-3">
                              <input
                                type="checkbox"
                                className="h-5 w-5 accent-orange"
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex">
                                <Link
                                  className="h-20 w-20 flex-shrink-0"
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id,
                                  })}`}
                                >
                                  <img
                                    alt={purchase.product.name}
                                    src={purchase.product.image}
                                  />
                                </Link>
                                <div className="flex-grow px-2 pt-1 pb-2">
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id,
                                    })}`}
                                    className="text-left line-clamp-2"
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="grid grid-cols-5 items-center">
                            <div className="col-span-2">
                              <div className="flex items-center justify-center">
                                <span className="text-gray-300 line-through">
                                  ₫
                                  {formatCurrency(
                                    purchase.product.price_before_discount
                                  )}
                                </span>
                                <span className="ml-3">
                                  ₫{formatCurrency(purchase.product.price)}
                                </span>
                              </div>
                            </div>
                            <div className="col-span-1">
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper="flex items-center"
                                onIncrease={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value <= purchase.product.quantity
                                  )
                                }
                                onDecrease={(value) =>
                                  handleQuantity(index, value, value >= 1)
                                }
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !==
                                        (purchasesInCartData as Purchase[])[
                                          index
                                        ].buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className="col-span-1">
                              <span className="text-orange-600">
                                ₫
                                {formatCurrency(
                                  purchase.product.price * purchase.buy_count
                                )}
                              </span>
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={handleDelete(index)}
                                className="bg-none text-black transition-colors hover:text-orange-600"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center justify-center pr-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-orange"
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button
                  className="mx-3 border-none bg-none"
                  onClick={handleCheckAll}
                >
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <button
                  className="mx-3 border-none bg-none"
                  onClick={handleDeleteManyPurchases}
                >
                  Xóa
                </button>
              </div>

              <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center sm:justify-end">
                    <div>
                      Tổng thanh toán ({checkedPurchasesCount} sản phẩm):
                    </div>
                    <div className="ml-2 text-2xl text-orange-600">
                      ₫{formatCurrency(totalCheckedPurchasePrice)}
                    </div>
                  </div>
                  <div className="flex items-center text-lg sm:justify-end">
                    <div className="text-gray-500">Tiết kiệm</div>
                    <div className="ml-6 text-orange-600">
                      ₫{formatCurrency(totalCheckedPurchaseSavingPrice)}
                    </div>
                  </div>
                </div>
                <Button
                  className="mt-5 flex h-10 w-52 items-center justify-center bg-mainColor rounded text-lg uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0"
                  onClick={handleBuyPurchases}
                  // disabled={buyProductsMutation.isLoading}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <img
              src={noproduct}
              alt="no purchase"
              className="mx-auto h-24 w-24"
            />
            <div className="mt-5 font-bold text-gray-400">
              Giỏ hàng của bạn còn trống
            </div>
            <div className="mt-5 text-center">
              <Link
                to={path.home}
                className=" rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
