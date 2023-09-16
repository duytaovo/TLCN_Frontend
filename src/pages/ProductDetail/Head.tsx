import { Link } from "react-router-dom";
import {
  ChevronRight,
  StarFill,
  Plus,
  HandThumbsUpFill,
} from "react-bootstrap-icons";
import { useAppSelector } from "src/hooks/useRedux";
import { Rate } from "antd";
function Head() {
  const initProductDetail: any = useAppSelector(
    (state) => state.products.productDetail.data
  );
  const { title, slug, category, star, totalVote, rating } = initProductDetail;

  const data = {
    like: "910",
    breadcrumb: [
      { name: category, path: `/${category}` },
      { name: title, path: `/${category}/${slug}` },
    ],
  };
  console.log(data);

  // const sum = function (items = [], prop: any) {
  //   console.log(items);
  //   return items?.reduce(function (a, b) {
  //     const star = b[prop] ? b[prop] : 0;
  //     return a + star;
  //   }, 0);
  // };

  // let avgStar = sum(rating, "star") / rating?.length;
  // avgStar = Number.isNaN(avgStar) ? 0 : avgStar;

  // const numberStar = Math.floor(avgStar) || 0;
  // const Star = () => {
  //   return [...Array(numberStar)].map((e, i) => (
  //     <i key={i}>
  //       <StarFill />
  //     </i>
  //   ));
  //   return "";
  // };
  return (
    <div className="p-4">
      <ul className="breadcrumb flex text-blue-600 text-2xl list-none">
        {data.breadcrumb.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path || "/"}>
                {item.name || "Điện thoại Iphone 15 promax"}{" "}
              </Link>
              <i>
                <ChevronRight />
              </i>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        &emsp;
        <span className="text-yellow-300">
          <Rate allowHalf defaultValue={2.5} />
        </span>
        &nbsp;
        <span className="text-blue-400">{rating?.length} đánh giá</span>&emsp;
        <span className="text-blue-400">
          <i>
            <Plus />
          </i>
          So sánh
        </span>
        <div className="ml-auto text-xl">
          <button className="bg-blue-500 text-white p-4 rounded">
            <i>
              <HandThumbsUpFill />
            </i>
            &nbsp; Thích&nbsp;<span>{data.like}</span>
          </button>
          &emsp;
          <button className="bg-blue-500 text-white p-4 rounded">
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Head;
