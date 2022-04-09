import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

const DetailHistory = () => {
  const state = useContext(GlobalState);
  const [history] = state.userApi.history;
  const [detailHistory, setDetailHistory] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) {
          setDetailHistory(item);
        }
      });
    }
  }, [params.id, history]);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          {detailHistory.cart?.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-4 gap-2 my-5">
                <div className="">
                  <img src={item.images.url} alt="" />
                </div>
                <div className="">
                  <h2>{item.title}</h2>
                </div>
                <div className="">{item.price}</div>
              </div>
            );
          })}
        </div>
      </div>
      DetailHistory
    </div>
  );
};

export default DetailHistory;
