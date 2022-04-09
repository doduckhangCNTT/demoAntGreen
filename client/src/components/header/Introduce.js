import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import axios from "axios";
import LazyLoadImage from "../lazyLoad/LazyLoadImage";
import useCustomRouter from "../../hooks/useCustomRouter";
import { useMyContext } from "../../context/Store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Introduce = () => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userApi.isAdmin;
  const [isLogin, setIsLogin] = state.userApi.isLogin;
  const [search, setSearch] = state.productApi.search;
  // const [sort] = state.productApi.sort;
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const { pushQuery } = useCustomRouter();
  const { page, sortPage } = useMyContext();

  const btnSearch = (e) => {
    e.preventDefault();
    if (e.target.value !== value && value !== "") {
      setSearch(value);
      navigate(`/search/${value}`);
      // pushQuery({ page, sortPage, value });
      setValue("");
    }
  };

  const loggedRouter = () => {
    return (
      <>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative z-10">
            <div>
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <LazyLoadImage
                  url={
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  className="h-8 w-8 rounded-full"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 text-black"
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                {isAdmin ? (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/manager"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 text-black"
                        )}
                      >
                        Manager
                      </Link>
                    )}
                  </Menu.Item>
                ) : (
                  ""
                )}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/user/settings"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 text-black"
                      )}
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                {isAdmin ? (
                  ""
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/user/history"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 text-black"
                        )}
                      >
                        History
                      </Link>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <Link to="/" onClick={logoutUser}>
          Logout
        </Link>
      </>
    );
  };

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsLogin(false);
    window.location.href = "/";
  };

  return (
    <div>
      <div className="flex justify-between border-b-2 py-2">
        <div className="">Monitor:</div>

        {isLogin ? (
          loggedRouter()
        ) : (
          <div className="flex gap-4">
            <Link to={"/account/login"}>Login</Link>
            <Link to={"/account/register"}>Register</Link>
          </div>
        )}
      </div>

      <div className="flex my-4 justify-between">
        <div className="">Logo</div>

        <div className="text-black">
          <form action="" onSubmit={btnSearch}>
            <input
              type="text"
              className=""
              placeholder="Search..."
              value={value}
              onChange={(e) => setValue(e.target.value.toLowerCase())}
            />
            <button type="submit" className="border-2 rounded">
              Search
            </button>
          </form>
        </div>

        <div className="flex gap-5">
          <span>Holine 19006750</span>
          {isAdmin ? "" : <Link to="/user/cart">Cart</Link>}
        </div>
      </div>
    </div>
  );
};

export default Introduce;
