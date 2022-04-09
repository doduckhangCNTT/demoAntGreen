import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoEndow from "../components/utils/InfoEndow";
import ProductsItem from "../components/utils/ProductsItem";
import TabDetail from "../components/utils/TabDetail";
import { GlobalState } from "../GlobalState";

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productApi.products;
  const addCart = state.userApi.addCart;

  const [quantity, setQuantity] = useState(1);

  const [detailProduct, setDetailProduct] = useState([]);
  console.log(detailProduct.images);

  useEffect(() => {
    products.forEach((product) => {
      if (product._id === params.id) {
        setDetailProduct(product);
      }
    });
  }, [params.id, products]);

  const decrementQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto">
      <div className="">
        <h1 className="capitalize text-[30px]">{detailProduct.title}</h1>
        <div className="border-b-2 py-3  border-b-gray mb-5">
          Ma san pham:
          <span className="border-r-2 text-green pr-2">
            {detailProduct._id}
          </span>
          <span className="ml-3">Danh gia: </span>
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div className="grid grid-cols-2 gap-6 col-span-3">
          <div className="h-[500px]">
            <img
              className="h-full w-full object-cover"
              src={detailProduct.images?.url}
              alt=""
            />
          </div>
          <div className="">
            <div className="">
              <h1 className="text-[30px] text-green font-semibold">
                {detailProduct.price}đ
              </h1>
              <div>
                Gia thi truong:
                <span className="text-gray line-through ml-2">
                  {detailProduct.oldPrice}
                </span>
              </div>
              <div className="">
                <span className="font-semibold">Tinh trang:</span>
                <span className="text-green mx-2">Con Hang</span>
                <span>Sold: {detailProduct.sold}</span>
              </div>
              <div className="text-green">
                Tiet kiem :
                <span className="text-green font-semibold ml-2">
                  {Math.abs(detailProduct.price - detailProduct.oldPrice)}đ
                </span>
              </div>
            </div>

            <div className="">
              <div className="border border-gray inline-block">
                <button
                  className="p-3 border-r-2 border-gray hover:text-opacity-5"
                  onClick={() => decrementQuantity()}
                >
                  -
                </button>
                <span className="p-3">{quantity}</span>
                <button
                  className="p-3 border-l-2 border-gray hover:text-opacity-5"
                  onClick={() => incrementQuantity()}
                >
                  +
                </button>
              </div>

              <button
                className="bg-green p-3 lg:ml-3 rounded-sm text-white"
                onClick={() => addCart(detailProduct, quantity)}
              >
                Mua Hang
              </button>
            </div>

            <div className="mt-5">
              Gọi điện để được tư vấn:
              <span className="text-green font-semibold">1900 6750</span>
              <div>Chấp nhận thanh toán bằng: </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <h1>Ho Tro</h1>
          <div className="flex flex-col">
            <InfoEndow />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 my-5">
        <div className="my-5 col-span-3">
          <TabDetail detailProduct={detailProduct} />
        </div>
        <div className="col-span-1">Bạn có thể thích</div>
      </div>

      <div className="">
        <h1 className="text-lg my-3 font-semibold">San pham lien quan</h1>
        <div className="">
          <div className="grid grid-cols-5 gap-6">
            {products.map((product, index) => {
              if (product.category === detailProduct.category) {
                return <ProductsItem key={index} product={product} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
