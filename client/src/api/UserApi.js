import axios from "axios";
import React, { useEffect, useState } from "react";

const UserApi = (token) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  console.log("History: ", history);
  console.log("Cart: ", cart);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/user/info", {
        headers: { Authorization: token },
      });
      console.log("Thong tin user: ", res);
      setIsLogin(true);

      setCart(res.data.cart);

      res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
    };

    getUser();
  }, [token]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };

      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  const addCart = async (product, quantity = 1) => {
    if (!isLogin) {
      return alert("Please login / register");
    }
    let checkCart = true;
    cart.forEach((item) => {
      if (item._id === product._id) {
        item.quantity += quantity;
        checkCart = false;
      }
    });
    setCart([...cart]);
    console.log(checkCart);
    if (checkCart) {
      setCart([...cart, { ...product, quantity }]);

      await axios.patch(
        "/user/addcart",
        {
          cart: [...cart, { ...product, quantity }],
        },
        { headers: { Authorization: token } }
      );
    }
    console.log("Cart: ", cart);
  };
  return {
    isLogin: [isLogin, setIsLogin],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    history: [history, setHistory],
    addCart: addCart,
  };
};

export default UserApi;
