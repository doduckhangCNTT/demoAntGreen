import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CreateProduct from "../../components/mainpage/createProduct/CreateProduct";
import axios from "axios";
import { useMyContext } from "../../context/Store";
import useCustomRouter from "../../hooks/useCustomRouter";

const ProductsPage = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productApi.products;
  const [id, setId] = useState("");
  const [token, setToken] = state.token;
  const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
  const [callback, setCallback] = state.productApi.callback;
  const [isChecked, setIsChecked] = useState(false);

  const { pushQuery } = useCustomRouter();

  // const [sort, setSort] = state.productApi.sort;
  const { sortPage } = useMyContext();

  console.log("ID: ", id);

  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleDelete = async (productId, public_id) => {
    try {
      if (isAdmin) {
        await axios.post(
          "/api/destroy",
          { public_id },
          { headers: { Authorization: token } }
        );
        await axios.delete(`/api/product/${productId}`, {
          headers: { Authorization: token },
        });
        setCallback(!callback);
        alert("Successfully deleted product");
      }
    } catch (error) {
      return alert(error);
    }
  };

  const handleCheckAll = () => {
    products.forEach((item) => {
      item.checked = !isChecked;
    });
    setProducts([...products]);
    setIsChecked(!isChecked);
  };

  const handleCheckItem = (id) => {
    products.forEach((item) => {
      if (item._id === id) {
        item.checked = !item.checked;
      }
      setProducts([...products]);
    });
  };

  const deleteAllProduct = () => {
    products.forEach((product) => {
      if (product.checked) {
        handleDelete(product._id, product.images.public_id);
      }
    });
    setProducts([...products]);
  };

  const handleSortProducts = (e) => {
    pushQuery({ sort: e.target.value });
  };
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex ">
          <button
            type="button"
            onClick={openModal}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Create Product
          </button>

          <div>
            <h1>SelectAll</h1>
            <input type="checkbox" onChange={handleCheckAll} />
            <button onClick={deleteAllProduct}>Delete All</button>
          </div>

          <div>
            Xep theo:
            <div className="row">
              <span>Sort By: </span>
              <select value={sortPage} onChange={handleSortProducts}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="-sold">Best sales</option>
                <option value="-price">Price: Hight - Low</option>
                <option value="price">Price: Low - Height</option>
              </select>
            </div>
          </div>
        </div>

        <Transition show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <CreateProduct id={id} closeModal={closeModal} />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div>
        {products?.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-4 gap-2 my-5">
              <div>
                <img
                  className="w-[50px] h-[50px] object-cover"
                  src={item.images.url}
                  alt=""
                />
              </div>
              <div className="">
                <h2>{item.title}</h2>
              </div>
              <div className="">{item.price}</div>

              <div className=" flex">
                <button
                  className=""
                  onClick={() => (setId(item._id), setIsOpen(true))}
                >
                  Edit
                </button>
                <button className="ml-3" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>

                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckItem(item._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
