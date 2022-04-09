import axios from "axios";
import { createContext, useEffect, useState } from "react";
import CategoryApi from "./api/CategoryApi";
import ProductApi from "./api/ProductApi";
import ProductPageApi from "./api/ProductPageApi";
import UserApi from "./api/UserApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  // const { search } = useLocation();

  // Cung cấp token mới cho user mỗi khi đăng nhập vào trang

  // Xác định user đã đăng nhập
  const firstLogin = localStorage.getItem("FirstLogin");

  useEffect(() => {
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
        console.log(res);
        setToken(res.data.accesstoken);
        // Sau 1 khoangr time nhat dinh thi lai lam moi token
        setTimeout(() => {
          refreshToken();
        }, 10 * 6 * 1000);
      };
      refreshToken();
    }
  }, [firstLogin]);

  const state = {
    token: [token, setToken],
    productApi: ProductApi(),
    productPageApi: ProductPageApi(),
    userApi: UserApi(token),
    categoriesApi: CategoryApi(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
