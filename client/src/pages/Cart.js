import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";
import PaypalButton from "./PaypalButton";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userApi.cart;
  const [token, setToken] = state.token;

  const [quantityProduct, setQuantityProduct] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, crr) => {
        return acc + crr.quantity * crr.price;
      }, 0)
    );
  }, [cart, quantityProduct]);

  const addCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      { headers: { Authorization: token } }
    );
  };

  const decrementQuantity = (quantity, id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        const quantityAfter = quantity - 1 < 1 ? 1 : quantity - 1;
        setQuantityProduct(quantityAfter);
        item.quantity = quantityAfter;
      }
    });
    setCart([...cart]);
    addCart(cart);
  };

  const incrementQuantity = (quantity, id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        const quantityAfter = quantity + 1;
        setQuantityProduct(quantityAfter);
        item.quantity = quantityAfter;
      }
    });
    setCart([...cart]);
    addCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to remove this product")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addCart([]);
    alert("You were bought successfully");
  };

  useEffect(() => {
    console.log("CartAfter: ", cart);
  }, [quantityProduct]);

  return (
    <div className="container mx-auto">
      <h1>Gio hang</h1>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          {cart.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-4 gap-2 my-5">
                <div className="">
                  <img src={item.images.url} alt="" />
                </div>
                <div className="">
                  <h2>{item.title}</h2>
                  <button className="" onClick={() => removeProduct(item._id)}>
                    Delete
                  </button>
                </div>
                <div className="">{item.price}</div>
                <div className="">
                  <button
                    className=""
                    onClick={() => decrementQuantity(item.quantity, item._id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className=""
                    onClick={() => incrementQuantity(item.quantity, item._id)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-span-1">
          <h1>Hoa Don</h1>
          <div className="">Tong tien: {totalPrice}</div>
          <PaypalButton totalPrice={totalPrice} tranSuccess={tranSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
