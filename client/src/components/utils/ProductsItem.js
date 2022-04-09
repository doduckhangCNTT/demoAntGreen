import React from "react";
import { Link } from "react-router-dom";
import LazyLoadImage from "../lazyLoad/LazyLoadImage";

const ProductsItem = ({ product }) => {
  return (
    <Link className="w-full" to={`/detail/${product._id}`}>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="lg:space-y-0 lg:grid lg:gap-x-3">
              <div
                key={product.title}
                className="group relative flex flex-col justify-between"
              >
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <LazyLoadImage
                    url={product.images.url}
                    className="w-full h-full object-center object-cover"
                  />
                </div>

                <div className="mt-2">
                  <div className="capitalize font-medium text-lg">
                    {product.title}
                  </div>

                  <div className="text-green font-semibold">
                    {product.price}đ
                    <span className="line-through ml-2 text-slate-400 text-sm text-gray">
                      {product.oldPrice}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductsItem;
