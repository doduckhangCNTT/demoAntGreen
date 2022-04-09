import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const HistoryPage = () => {
  const state = useContext(GlobalState);
  const [history] = state.userApi.history;

  return (
    <div className="container mx-auto">
      {history.map((item, index) => {
        return (
          <div className="grid gap-y-6 lg:grid-cols-4 " key={index}>
            <div className="">{item._id}</div>
            <div className="">{item.paymentID}</div>
            <div className="">{item.createdAt}</div>
            <div>
              <Link to={`/user/history/${item._id}`}>View</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryPage;
