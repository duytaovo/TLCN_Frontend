import ProductCard from "src/components/ProductCard/ProductCard";
import "./thinkbook.scss";
import ListProduct from "src/components/ListProduct/ListProduct";

const products = [
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
  ProductCard,
];
const Thinkbook = () => {
  return (
    <section id="thinkbook" className=" group g4403 bg-thinkbookLenovo">
      <h3>
        <img src="https://cdn.tgdd.vn/2022/06/campaign/Frame-46771-1076x235-1.png"></img>
      </h3>

      <div className="listProduct-thinkbookLenovo">
        <ListProduct products={products} isSlide={true}></ListProduct>
      </div>
    </section>
  );
};
export default Thinkbook;
