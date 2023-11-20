import { Link } from "react-router-dom";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId,
} from "src/utils/utils";
import { ListSmartPhone } from "src/types/allProductsType.interface";
import { Rate } from "antd";

interface Props {
  product: ListSmartPhone;
  category?: string;
}

const ProductCard = ({ product, category }: Props) => {
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
          <div className="min-h-[2rem] text-2xl line-clamp-2 text-black">
            {product.name}
          </div>
          <div className="mt-3 flex items-center">
            <div className="max-w-[50%] truncate text-blue-500 line-through">
              <span className="text-xl">
                đ{formatCurrency(product.lstProductTypeAndPrice[0]?.price)}
              </span>
            </div>
            <div className="ml-1 truncate text-orange-500">
              <span className="text-2xl">
                đ{formatCurrency(product.lstProductTypeAndPrice[0]?.salePrice)}
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

            <div className="ml-2 text-lg">
              <span>
                {formatNumberToSocialStyle(product.totalReview)} Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
