import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMyContext } from "../context/Store";
import { GlobalState } from "../GlobalState";
import useQuery from "./useQuery";

const useInfinityQuery = (value) => {
  // const { value } = useParams();
  const state = useContext(GlobalState);
  const { sortPage } = useMyContext();
  const [limit] = state.productApi.limit;
  const btnRef = useRef();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [stop, setStop] = useState(false);
  const [countProduct, setCountProduct] = useState(0);

  const { cache } = useMyContext();
  const { data, error, loading } = useQuery(
    `/api/product?limit=2&page=${page}&sort=${sortPage}&title[regex]=${value}`,
    { saveCache: true }
  );

  console.log("Data: ", data);

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
  }, [data?.products, data?.count, cache, limit]);

  const handleLoadMore = useCallback(() => {
    // if (stop >= Math.ceil(countProduct / 2)) {
    //   setStop(true);
    // }
    if (stop) return;
    setPage((prev) => prev + 1);
  }, [stop]);

  useEffect(() => {
    const btn = btnRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleLoadMore();
      }
    });

    if (btn) {
      observer.observe(btn);
    }

    return () => {
      observer.unobserve(btn);
    };
  }, [handleLoadMore]);

  const btnLoadMore = () => {
    return (
      <div className="flex-row text-center w-full">
        <button
          ref={btnRef}
          className={` bg-green text-white p-2 my-6`}
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
    );
  };

  return { products, error, loading, btnLoadMore };
};

export default useInfinityQuery;
