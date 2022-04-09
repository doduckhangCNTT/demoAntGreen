import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-[#151515] text-white">
      <div className="container mx-auto grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1 text-center">
        <div className="">
          <img src="" alt="" />
          <div>Địa chỉ: 70 Lu Gia, Ward 15, District 11, Ho Chi Minh City</div>
          <div>Điện thoại: 1900 6750</div>
          <div>Email: support@sapo.vn</div>
          <div>Icon</div>
        </div>

        <div className="">
          <h5>Về chúng tôi</h5>
          <ul>
            <li>
              <Link to="">Trang chủ</Link>
            </li>
            <li>
              <Link to="">Giới thiệu</Link>
            </li>
            <li>
              <Link to="">Sản phẩm</Link>
            </li>
            <li>
              <Link to="">Tin tức</Link>
            </li>
            <li>
              <Link to="">Liên hệ</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h5>Chính sách</h5>
          <ul>
            <li>
              <Link to="">Trang chủ</Link>
            </li>
            <li>
              <Link to="">Giới thiệu</Link>
            </li>
            <li>
              <Link to="">Sản phẩm</Link>
            </li>
            <li>
              <Link to="">Tin tức</Link>
            </li>
            <li>
              <Link to="">Liên hệ</Link>
            </li>
          </ul>
        </div>

        <div className="">
          {" "}
          <h5>Hỗ trợ</h5>
          <ul>
            <li>
              <Link to="">Trang chủ</Link>
            </li>
            <li>
              <Link to="">Giới thiệu</Link>
            </li>
            <li>
              <Link to="">Sản phẩm</Link>
            </li>
            <li>
              <Link to="">Tin tức</Link>
            </li>
            <li>
              <Link to="">Liên hệ</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
