import React, { useContext, useEffect } from "react";
import { useMyContext } from "../context/Store";
import { GlobalState } from "../GlobalState";
import useCustomRouter from "../hooks/useCustomRouter";

const Sorting = () => {
  const state = useContext(GlobalState);
  // const [sort, setSort] = state.productApi.sort;
  // const [sortPage, setSortPage] = state.productPageApi.sortPage;
  // const [page, setPage] = state.productPageApi.page;
  const { pushQuery } = useCustomRouter();

  const { page, sortPage } = useMyContext();

  const handleSort = (e) => {
    const valueSort = e.target.value;

    console.log("Value Sort: ", valueSort);
    // setSort(valueSort);
    // setSortPage(valueSort);
    pushQuery({ page, sort: valueSort });
  };

  return (
    <div>
      <div className="row">
        <span>Sort By: </span>
        <select value={sortPage} onChange={handleSort}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best sales</option>
          <option value="-price">Price: Hight - Low</option>
          <option value="price">Price: Low - Height</option>
        </select>
      </div>
    </div>
  );
};

export default Sorting;
