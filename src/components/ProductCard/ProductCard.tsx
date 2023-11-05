import { Link } from "react-router-dom";
import clsx from "clsx";
import { StarFill } from "react-bootstrap-icons";
import styles from "./card.module.scss";
import { useState } from "react";
import numberWithCommas from "src/utils/numberWithCommas";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId,
} from "src/utils/utils";
import { ListSmartPhone } from "src/types/allProductsType.interface";
import { Rate } from "antd";

interface Props {
  product: ListSmartPhone;
  category: string;
}

const ProductCard = ({ product, category }: Props) => {
  console.log(product);
  return (
    <Link
      to={`${`/${category}/detail`}/${generateNameId({
        name: product.name,
        id: product.id.toString(),
      })}`}
    >
      <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src={product.lstImageUrl[0]}
            alt={product.name}
            className="absolute top-0 left-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2">
          <div className="min-h-[2rem] text-xl line-clamp-1 text-black/80">
            {product.name}
          </div>
          <div className="mt-3 flex items-center">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className="text-xs">₫</span>
              <span className="text-xl">
                {formatCurrency(product.lstProductTypeAndPrice[0].price)}
              </span>
            </div>
            <div className="ml-1 truncate text-black">
              <span className="text-xl">₫</span>
              <span className="text-3xl">
                {formatCurrency(product.lstProductTypeAndPrice[0].salePrice)}
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-start">
            <Rate
              allowHalf
              defaultValue={product.star}
              style={{
                fontSize: "15px",
              }}
            />

            <div className="ml-2 text-sm">
              <span>
                {formatNumberToSocialStyle(product.totalReview || 1500)}
              </span>
              <span className="ml-1">Review</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
