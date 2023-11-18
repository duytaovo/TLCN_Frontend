import { useEffect, useState } from "react";
import clsx from "clsx";
import { formatCurrency, rateSale } from "src/utils/utils";

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
        {productData?.productInfo?.lstProductTypeAndPrice?.map(
          (tag: any, index: number) => {
            const active = tag?.ram === tagRam;
            const className = clsx(
              "border border-gray-400 px-10 py-4 text-xl rounded",
              active && "text-blue-400 border border-blue-400"
            );

            return (
              <button
                className={className}
                key={index}
                onClick={() => {
                  setTagRam(tag?.ram);
                  setIndexTagRam(index);
                }}
              >
                {tag?.ram}
              </button>
            );
          }
        )}
      </div>
      <div className="flex flex-wrap gap-4 ">
        {productData?.productInfo?.lstProductTypeAndPrice?.map(
          (tag: any, index: number) => {
            const active = tag?.color === tagColor;
            const className = clsx(
              "border border-gray-400 px-10 py-4 text-xl rounded",
              active && "text-blue-400 border-blue-400"
            );
            return (
              <button
                className={className}
                key={index}
                onClick={() => {
                  setTagColor(tag?.color);
                  setIndexTagColor(index);
                }}
              >
                {tag?.color}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Tag;
