import React, { useContext, useMemo } from "react";
import { useMyContext } from "../context/Store";
import { GlobalState } from "../GlobalState";
import useCustomRouter from "./useCustomRouter";

const usePagination = (totalPages) => {
  const state = useContext(GlobalState);
  // const [page, setPage] = state.productPageApi.page;
  const { page, sortPage } = useMyContext();
  // const [sort, setSort] = state.productApi.sort;
  const { pushQuery } = useCustomRouter();

  const { firstArr, lastArr } = useMemo(() => {
    // convert number ==> array
    const newArr = [...Array(totalPages)].map((_, i) => i + 1);

    if (totalPages < 4) {
      return {
        firstArr: newArr,
        lastArr: [],
      };
    }
    if (totalPages - page >= 4) {
      return {
        firstArr: newArr.slice(page - 1, page + 2),
        lastArr: newArr.slice(totalPages - 1),
      };
    } else {
      return {
        firstArr: newArr.slice(page - 4, totalPages),
        lastArr: [],
      };
    }
  }, [page, totalPages]);

  const prev = () => {
    const newPage = Math.max(page - 1, 1);
    // setPage(newPage);
    pushQuery({ page: newPage, sort: sortPage });
  };

  const next = () => {
    const newPage = Math.min(page + 1, totalPages);
    // setPage(newPage);
    pushQuery({ page: newPage, sort: sortPage });
  };

  const jump = (num) => {
    // setPage(num);
    pushQuery({ page: num, sort: sortPage });
  };

  return { firstArr, lastArr, prev, next, jump };
};

export default usePagination;
