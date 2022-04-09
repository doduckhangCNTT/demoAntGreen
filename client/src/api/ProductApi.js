import React, { useEffect, useRef, useState } from "react";
import { LIMIT_PRODUCTS_MANAGER } from "../constrains/Products";
import { useMyContext } from "../context/Store";
import useQuery from "../hooks/useQuery";

const ProductApi = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  // const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [limit, setLimit] = useState(LIMIT_PRODUCTS_MANAGER);
  const [totalProducts, setTotalProducts] = useState();
  const countRef = useRef(0);
  const { sortPage, refetching } = useMyContext();

  // useEffect(() => {
  //   console.log("Product api: ", countRef.current++);
  //   const getProducts = async () => {
  //     const res = await axios.get(
  //       `/api/product?limit=${limit}&${category}&sort=${sortPage}&title[regex]=${search}`
  //     );
  //     setProducts(res.data.products);
  //     setTotalProducts(res.data.count);
  //   };
  //   getProducts();
  // }, [callback, sortPage, search, category, limit]);

  const { data } = useQuery(
    `/api/product?limit=${limit}&page=${page}&category=${category}&sort=${sortPage}&title[regex]=${search}`,
    { saveCache: true, refetching }
  );

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
      setTotalProducts(data.count);
    }
  }, [data?.products, data?.count]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],

    category: [category, setCategory],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    limit: [limit, setLimit],

    totalProducts: [totalProducts, setTotalProducts],
  };
};

export default ProductApi;
