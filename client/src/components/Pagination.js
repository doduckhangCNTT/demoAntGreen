/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMyContext } from "../context/Store";
import { GlobalState } from "../GlobalState";
import usePagination from "../hooks/usePagination";

const Pagination = React.memo(({ totalPages }) => {
  const state = useContext(GlobalState);
  // const [page] = state.productPageApi.page;
  const { page, sortPage } = useMyContext();
  const [limit] = state.productPageApi.limit;
  const [totalProducts] = state.productPageApi.totalProducts;
  const countRef = useRef(1);
  const { firstArr, lastArr, prev, next, jump } = usePagination(totalPages);

  return (
    <>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1>{countRef.current++}</h1>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {page === 1 ? 1 : limit * (page - 1)}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {page * limit > totalProducts ? totalProducts : page * limit}
              </span>{" "}
              of <span className="font-medium">{totalProducts}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={prev}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
              {firstArr.map((item) => (
                <button
                  aria-current="page"
                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  onClick={() => jump(item)}
                >
                  {item}
                </button>
              ))}
              {lastArr.length > 0 && (
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
              )}
              {lastArr.map((item) => (
                <button
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                  onClick={() => jump(item)}
                >
                  {item}
                </button>
              ))}
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={next}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
});

export default Pagination;
