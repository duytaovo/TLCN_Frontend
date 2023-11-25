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

  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // const [price, setPrice] = useState<number | null>(null);
  // const [salePrice, setSalePrice] = useState<number | null>(null);
  useEffect(() => {
    if (selectedRam !== null) {
      // Lấy danh sách màu sắc tương ứng với loại RAM đã chọn
      const colorsForSelectedRam =
        productData?.productInfo?.lstProductTypeAndPrice
          .filter((item: any) => item.ram === selectedRam)
          .map((item: any) => item.color);

      // Nếu danh sách không rỗng, chọn màu đầu tiên làm màu mặc định
      if (colorsForSelectedRam && colorsForSelectedRam.length > 0) {
        setSelectedColor(colorsForSelectedRam[0]);
      }
    }
  }, [selectedRam, productData]);
  useEffect(() => {
    if (selectedRam !== null && selectedColor !== null) {
      const selectedProduct =
        productData?.productInfo?.lstProductTypeAndPrice.find(
          (item: any) =>
            item.ram === selectedRam && item.color === selectedColor
        );

      if (selectedProduct) {
        setPrice(selectedProduct.price);
        setSalePrice(selectedProduct.salePrice);
        onClick &&
          onClick({
            price: selectedProduct.price,
            salePrice: selectedProduct.salePrice,
          });
      }
    }
  }, [selectedRam, selectedColor, productData, onClick]);

  // useEffect(() => {
  //   onClick && onClick({ price, salePrice });
  // }, [price, salePrice]);

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
          const active = ram === selectedRam;
          const className = clsx(
            "border  px-10 py-4 text-xl rounded",
            active && "text-blue-400 border-blue-400 "
          );

          return (
            <Button
              className={className}
              type={active ? "primary" : "default"}
              key={index}
              onClick={() => {
                setSelectedRam(ram);
                setSelectedColor(null); // Đặt màu sắc về null khi chọn loại RAM mới
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
              "border  px-10 py-4 text-xl rounded",
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
            "border  px-10 py-4 text-xl rounded",
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
        {productData?.productInfo?.lstProductTypeAndPrice
          .filter((item: any) => item.ram === selectedRam)
          .map((product: any, index: number) => {
            const active = product.color === selectedColor;
            const className = clsx(
              "border  px-10 py-4 text-xl rounded",
              active && "text-blue-400 border-blue-400 "
            );

            return (
              <Button
                className={className}
                type={active ? "primary" : "default"}
                key={index}
                onClick={() => {
                  setSelectedColor(product.color);
                }}
                disabled={product.quantity === 0} // Ví dụ: Disable nút nếu hết hàng
              >
                {product.color}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default Tag;
