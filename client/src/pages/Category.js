import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import ProductsItem from "../components/utils/ProductsItem";
import { GlobalState } from "../GlobalState";
import useQuery from "../hooks/useQuery";
// import useInfinityQuery from "../hooks/useInfinityQuery";
import ShowAllProducts from "./common/ShowAllProducts";
import { useMyContext } from "../context/Store";

const Category = () => {
  const state = useContext(GlobalState);
  // const [categories, setCategories] = state.categoriesApi.categories;
  const [products, setProducts] = state.productApi.products;
  const { categoryId } = useParams();
  const { sortPage } = useMyContext();
  const [category, setCategory] = state.productApi.category;
  const btnRef = useRef();
  const [stop, setStop] = useState(false);
  // const [page, setPage] = state.productApi.page;
  const [page, setPage] = useState(1);
  const [productsCategory, setProductsCategory] = useState([]);
  const [limit, setLimit] = state.productApi.limit;

  useEffect(() => {
    setCategory(categoryId);
  }, [categoryId, setCategory]);

  return (
    <>
      <ShowAllProducts>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {products?.map((product, index) => {
            if (product.category.toString() === categoryId) {
              return <ProductsItem key={index} product={product} />;
            }
          })}
        </div>
      </ShowAllProducts>
    </>
  );
};

export default Category;
