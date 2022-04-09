import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LIMIT_PRODUCTS_PAGE } from "../constrains/Products";
import useCustomRouter from "../hooks/useCustomRouter";
import { useMyContext } from "../context/Store";
import useQuery from "../hooks/useQuery";
import { useParams } from "react-router-dom";

const ProductApi = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  // const [sortPage, setSortPage] = useState("");
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [limit, setLimit] = useState(LIMIT_PRODUCTS_PAGE);
  const [totalProducts, setTotalProducts] = useState();
  const countRef = useRef(0);
  const { page, sortPage } = useMyContext();

  const { categoryId } = useParams();
  // useEffect(() => {
  //   console.log("Product api: ", countRef.current++);
  //   const getProducts = async () => {
  //     const res = await axios.get(
  //       `/api/product?limit=${limit}&${category}&page=${page}&sort=${sortPage}&title[regex]=${search}`
  //     );
  //     setProducts(res.data.products);
  //     setTotalProducts(res.data.count);
  //   };
  //   getProducts();
  // }, [callback, sortPage, search, category, page, limit]);

  const { data, error, loading } = useQuery(
    `/api/product?limit=${limit}&page=${page}&sort=${sortPage}&title[regex]=${search}`
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
    result: [result, setResult],
    limit: [limit, setLimit],

    totalProducts: [totalProducts, setTotalProducts],
  };
};

export default ProductApi;
