import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";

const Categories = () => {
  const state = useContext(GlobalState);
  const [callBack, setCallBack] = state.categoriesApi.callback;
  const [token] = state.token;
  const [category, setCategory] = useState("");
  const [categories, setCategories] = state.categoriesApi.categories;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState(false);

  const createCategory = async (e) => {
    e.preventDefault();
    if (onEdit) {
      await axios.put(
        `/api/category/${id}`,
        { name: category },
        { headers: { Authorization: token } }
      );
      setCategory("");
    } else {
      await axios.post(
        "/api/category",
        { name: category },
        {
          headers: { Authorization: token },
        }
      );
      alert("Add category successfully");
    }

    setCallBack(!callBack);
  };

  const editCategory = (id, name) => {
    setOnEdit(true);
    setId(id);
    setCategory(name);
  };

  const deleteCategory = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        await axios.delete(`/api/category/${id}`, {
          headers: { Authorization: token },
        });
      }
    } catch (error) {
      return alert(error);
    }

    setCallBack(!callBack);
  };

  return (
    <div className="">
      <div className="">
        <form action="" onSubmit={createCategory}>
          <input
            type="text"
            className="border"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit" className="border bg-green text-white">
            Save
          </button>
        </form>
      </div>

      <div className="">
        <h1 className="font-medium mt-5">Danh sach Categories</h1>
        <div className="">
          {categories?.map((category, index) => {
            return (
              <div className="grid grid-cols-2 gap-3" key={index}>
                <div className="">{category.name}</div>
                <div className="flex">
                  <button
                    onClick={() => editCategory(category._id, category.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-3"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
