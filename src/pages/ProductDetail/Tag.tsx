import { useEffect, useState } from "react";
import clsx from "clsx";
import { formatCurrency, rateSale } from "src/utils/utils";
import { Button } from "antd";

const Tag = ({ productData, onClick }: any) => {
  const [indexTagRam, setIndexTagRam] = useState(0);
  const [indexTagColor, setIndexTagColor] = useState(0);
  const [tagRam, setTagRam] = useState(
    productData?.productInfo?.lstProductTypeAndPrice
      ? productData?.productInfo?.lstProductTypeAndPrice[0]?.ram
      : []
  );
  const [tagColor, setTagColor] = useState(
    productData?.productInfo?.lstProductTypeAndPrice
      ? productData?.productInfo?.lstProductTypeAndPrice[0]?.color
      : []
  );

  const [price, setPrice] = useState(
    productData?.productInfo?.lstProductTypeAndPrice[0].price
  );

  const [salePrice, setSalePrice] = useState(
    productData?.productInfo?.lstProductTypeAndPrice[0].salePrice
  );

  useEffect(() => {
    onClick && onClick({ price, salePrice });
  }, [price, salePrice]);

  useEffect(() => {
    if (indexTagColor === indexTagRam) {
      setPrice(
        productData?.productInfo?.lstProductTypeAndPrice[indexTagColor].price
      );
      setSalePrice(
        productData?.productInfo?.lstProductTypeAndPrice[indexTagColor]
          .salePrice
      );
    }
  }, [indexTagColor, indexTagRam]);

  const filteredData = productData?.productInfo?.lstProductTypeAndPrice.filter(
    (item: any) => {
      return !tagRam || item.ram === tagRam;
    }
  );
  const filteredColors = [
    ...new Set(
      productData?.productInfo?.lstProductTypeAndPrice
        .filter((item: any) => item.ram === tagRam)
        .map((item: any) => item.color)
    ),
  ];
  return (
    <div className="mb-4">
      <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
        <div className="text-gray-500 line-through">
          ₫{formatCurrency(price)}
        </div>
        <div className="ml-3 text-4xl font-medium text-mainColor">
          ₫{formatCurrency(salePrice)}
        </div>
        <div className="ml-4 rounded-sm bg-orange-300 px-1 py-[2px] text-lg font-semibold uppercase text-black">
          {rateSale(salePrice, price)} giảm
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        {[
          ...new Set(
            productData?.productInfo?.lstProductTypeAndPrice.map(
              (item: any) => item.ram
            )
          ),
        ].map((ram: any, index) => {
          const active = ram === tagRam;
          const className = clsx(
            "border border-gray-400 px-10 py-4 text-xl rounded",
            active && "text-blue-400 border-blue-400 "
          );

          return (
            <Button
              className={className}
              type={active ? "primary" : "default"}
              key={index}
              onClick={() => {
                setTagRam(ram);
                setIndexTagRam(index);
              }}
            >
              {ram}
            </Button>
          );
        })}
        {/* {productData?.productInfo?.lstProductTypeAndPrice?.map(
          (tag: any, index: number) => {
            const active = tag?.ram === tagRam;
            const className = clsx(
              "border border-gray-400 px-10 py-4 text-xl rounded",
              active && "text-blue-400 border-blue-400 "
            );

            return (
              <Button
                className={className}
                type={active ? "primary" : "default"}
                key={index}
                onClick={() => {
                  setTagRam(tag?.ram);
                  setIndexTagRam(index);
                }}
              >
                {tag?.ram}
              </Button>
            );
          }
        )} */}
      </div>
      {/* <div className="flex flex-wrap gap-4 ">
        {[
          ...new Set(
            productData?.productInfo?.lstProductTypeAndPrice.map(
              (item: any) => item.color
            )
          ),
        ].map((color: any, index) => {
          const active = color === tagColor;
          const className = clsx(
            "border border-gray-400 px-10 py-4 text-xl rounded",
            active && "text-blue-400 border-blue-400 "
          );
          return (
            <Button
              className={className}
              key={index}
              type={active ? "primary" : "default"}
              onClick={() => {
                setTagColor(color);
                setIndexTagColor(index);
              }}
            >
              {color}
            </Button>
          );
        })}
      </div> */}
      <div className="flex flex-wrap gap-4 ">
        {filteredColors.map((color: any, index) => {
          const active = color === tagColor;
          const className = clsx(
            "border border-gray-400 px-10 py-4 text-xl rounded",
            active && "text-blue-400 border-blue-400 "
          );

          return (
            <Button
              className={className}
              key={index}
              type={active ? "primary" : "default"}
              onClick={() => {
                setTagColor(color);
                setIndexTagColor(index);
              }}
              disabled={!filteredData.some((item: any) => item.color === color)}
            >
              {color}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Tag;
