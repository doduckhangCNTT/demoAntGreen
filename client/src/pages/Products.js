import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ProductsItem from "../components/utils/ProductsItem.js";
import { GlobalState } from "../GlobalState.js";
import ShowAllProducts from "./common/ShowAllProducts.js";
import Pagination from "../components/Pagination";

const Products = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productPageApi.products;
  const [limit, setLimit] = state.productPageApi.limit;
  const countRef = useRef(1);
  const [totalProducts, setTotalProducts] = state.productApi.totalProducts;

  // Caculator totalPages
  const totalPages = useMemo(() => {
    if (!totalProducts) return 0;
    return Math.ceil(totalProducts / limit);
  }, [totalProducts, limit]);

  return (
    <>
      <ShowAllProducts>
        <h1>Products render: {countRef.current++} </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {products?.map((product, index) => {
            return <ProductsItem key={index} product={product} />;
          })}
        </div>
      </ShowAllProducts>

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default Products;
