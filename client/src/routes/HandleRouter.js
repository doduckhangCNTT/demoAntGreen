import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { infoNavbar } from "../components/header/InfoNavbar";
import Login from "../components/mainpage/auth/Login";
import Register from "../components/mainpage/auth/Register";
import DetailHistory from "../components/mainpage/history/DetailHistory";
import History from "../components/mainpage/history/History";
import Pages from "../components/mainpage/Pages";
import { GlobalState } from "../GlobalState";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import DetailProduct from "../pages/DetailProduct";
import Categories from "../pages/manager/Categories";
import HistoryPage from "../pages/manager/HistoryPage";
import ProductsPage from "../pages/manager/ProductsPage";
import ManagerPage from "../pages/ManagerPage";
import NotFound from "../pages/NotFound";
import Search from "../pages/Search";

const HandleRoute = () => {
  const state = useContext(GlobalState);
  const [isLogin, setIsLogin] = state.userApi.isLogin;
  return (
    <Routes>
      <Route path="/" element={<Pages />}>
        {infoNavbar.map((info) => {
          return <Route key={info.id} path={info.path} element={info.main} />;
        })}
        <Route path="detail/:id" element={<DetailProduct />} />
        <Route
          path="account/login"
          element={isLogin ? <NotFound /> : <Login />}
        />
        <Route
          path="account/register"
          element={isLogin ? <NotFound /> : <Register />}
        />
        <Route path="manager" element={<ManagerPage />} />
        <Route path="user/cart" element={<Cart />} />
        <Route path="user/history" element={<History />} />
        <Route path="user/history/:id" element={<DetailHistory />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="*" element={<NotFound />} />;
      </Route>

      <Route path="/manager" element={<ManagerPage />}>
        <Route path="history" element={<HistoryPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<Categories />} />
      </Route>
    </Routes>
  );
};

export default HandleRoute;
