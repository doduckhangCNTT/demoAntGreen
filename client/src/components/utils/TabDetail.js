import React from "react";
import { useState } from "react";

const TabDetail = ({ detailProduct }) => {
  const [toggleBtn, setToggleBtn] = useState(1);
  const productText = [
    {
      title: "THÔNG TIN SẢN PHẨM",
    },
    {
      title: "THANH TOÁN VẬN CHUYỂN",
    },
    {
      title: "ĐÁNH GIÁ SẢN PHẨM",
    },
  ];

  const handleTest = (value) => {
    setToggleBtn(value);
  };
  return (
    <div className="">
      <div className="">
        {productText.map((item, index) => {
          return (
            <button key={index}>
              <h5
                onClick={() => handleTest(index + 1)}
                className="mr-5 font-semibold"
              >
                {item.title}
              </h5>
            </button>
          );
        })}
      </div>

      <div className="">
        <div className={toggleBtn === 1 ? "mt-4 indent-3" : "hidden"}>
          <p>{detailProduct.description}</p>
        </div>
        <div className={toggleBtn === 2 ? "mt-4 indent-3" : "hidden"}>
          <p>Chưa nội dung vận chuyển</p>
        </div>
        <div className={toggleBtn === 3 ? "mt-4 indent-3" : "hidden"}>
          <p>Chưa có đánh giá nào !!</p>
        </div>
      </div>
    </div>
  );
};

export default TabDetail;
