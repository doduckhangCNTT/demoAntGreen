import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import ProductsItem from "../components/utils/ProductsItem";
import { useMyContext } from "../context/Store";
import { GlobalState } from "../GlobalState";
import useQuery from "../hooks/useQuery";
import ShowAllProducts from "./common/ShowAllProducts";

const Search = () => {
  const { value } = useParams();
  console.log("Value params: ", value);
  const state = useContext(GlobalState);

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [stop, setStop] = useState(false);
  const countRef = useRef(0);
  const [countProduct, setCountProduct] = useState(0);
  const { refetching } = useMyContext();
  // const { searchPage } = useMyContext();

  // const [sort, setSort] = state.productApi.sort;
  const { sortPage } = useMyContext();
  const [limit] = state.productApi.limit;
  const btnRef = useRef();
  const { cache } = useMyContext();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await axios.get(
  //       `/api/product?limit=${limit}${page}&sort=${sortPage}&title[regex]=${value}`
  //     );
  //     setProducts(res.data.products);
  //   };
  //   getProducts();
  // }, [value, page, sortPage, limit]);

  const { data, error, loading } = useQuery(
    `/api/product?limit=3&sort=${sortPage}&page=${page}&title[regex]=${value}`,
    { saveCache: true, refetching }
  );

  console.log("Data Search: ", data);
  useEffect(() => {
    setProducts([]);
    setStop(false);
    setPage(1);
  }, [sortPage, value]);

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
      setCountProduct(data.count);

      if (data.products.length < 2) {
        cache.current = {};
        setStop(true);
      }
    }
  }, [data?.products, data?.count, limit, cache]);

  const handleLoadMore = useCallback(() => {
    if (stop) {
      return;
    }

    setPage((prev) => prev + 1);
  }, [stop]);

  // useEffect(() => {
  //   const btn = btnRef.current;

  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       handleLoadMore();
  //     }
  //   });

  //   if (btn) {
  //     observer.observe(btn);
  //   }

  //   return () => {
  //     observer.unobserve(btn);
  //   };
  // }, [handleLoadMore]);
  return (
    <div>
      <h1>
        Search render:
        {countRef.current++}
      </h1>

      <ShowAllProducts>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {products?.map((product, index) => {
            return <ProductsItem key={index} product={product} />;
          })}
        </div>
      </ShowAllProducts>

      {/* {btnLoadMore()} */}
      <div className="flex-row text-center w-full">
        <button
          className={` bg-green text-white p-2 my-6 ${stop ? "disabled" : ""}`}
          onClick={() => handleLoadMore()}
          ref={btnRef}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Search;
