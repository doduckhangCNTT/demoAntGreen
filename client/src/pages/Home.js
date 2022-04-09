import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ProductsItem from "../components/utils/ProductsItem";
import { GlobalState } from "../GlobalState";

import * as Categories from "../constrains/Categories";
import InfoEndow from "../components/utils/InfoEndow";
import { imgMain, images, image_01, image_02 } from "../img/ImgHome";
import LazyLoadImage from "../components/lazyLoad/LazyLoadImage";
import { LIMIT_PRODUCTS_HOME } from "../constrains/Products";

const Home = () => {
  const state = useContext(GlobalState);
  const [products] = state.productApi.products;

  const countRef = useRef(0);

  return (
    <>
      <h1>
        Home render:
        {countRef.current++}
      </h1>
      <div className="">
        {/* <img className="w-full max-h-96 object-cover" src={imgMain} alt="" /> */}
        {
          <LazyLoadImage
            url={imgMain}
            className="w-full max-h-96 object-cover"
          />
        }
      </div>

      <div className="grid grid-cols-3 container mx-auto object-cover gap-6 my-6 border-green-500">
        {images.map((item, index) => (
          // <img key={index} src={item.src} alt={item.src} />
          <LazyLoadImage key={index} url={item.src} className="" />
        ))}
      </div>

      <div className="container mx-auto">
        <h2>Sản phẩm mới</h2>
        <div className="grid grid-cols-5 gap-6">
          {products?.slice(0, LIMIT_PRODUCTS_HOME).map((product, index) => {
            return <ProductsItem key={index} product={product} />;
          })}
        </div>
      </div>

      <div className="container mx-auto flex">
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block text-indigo-600">
                Start your free trial today.
              </span>
            </h2>

            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow"></div>
              <div className="inline-flex rounded-md shadow mt-8">
                <Link
                  to="/learnMore"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5">
          <LazyLoadImage url={image_01} className="w-full h-80 object-cover" />
        </div>
      </div>

      <div className="container mx-auto my-6">
        <h1>Tiểu cảnh để bàn</h1>
        <div className="grid grid-cols-5 my-6">
          <div className="col-span-2">
            {/* <img className=" object-cover row-span-1" src={image_02} alt="" /> */}
            <LazyLoadImage url={image_02} className="object-cover row-span-1" />
          </div>

          <div className="flex gap-6 w-full">
            {products?.map((product, index) => {
              if (
                product.category.toUpperCase() ===
                Categories.BONSAI.toUpperCase()
              ) {
                return <ProductsItem key={index} product={product} />;
              }
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto border-t-2 border-indigo-400 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        <InfoEndow />
      </div>
    </>
  );
};

export default Home;
