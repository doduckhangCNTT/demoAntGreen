import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useCustomRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pushQuery = ({ page, sort }) => {
    const query = {};

    if (page) query.page = page;
    if (sort) query.sort = sort;
    // if (search) query.search = search;
    const newQuery = new URLSearchParams(query).toString();
    console.log("New query: ", JSON.stringify(newQuery));
    navigate(`${pathname}?${newQuery}`);
  };

  return { pushQuery };
};

export default useCustomRouter;
