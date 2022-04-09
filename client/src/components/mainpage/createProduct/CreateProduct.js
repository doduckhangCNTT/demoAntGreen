import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GlobalState } from "../../../GlobalState";

const CreateProduct = React.memo(({ id, closeModal }) => {
  console.log("Id product: ", id, closeModal);

  const initialState = useMemo(() => {
    return {
      product_id: "",
      title: "",
      price: 0,
      oldPrice: 0,
      description:
        "Lorem Ipsum, Lorem Ipsum 💗If you feel good, please subscribe and donate to help us out. Thanks!💗",
      content:
        "Lorem Ipsum, Lorem Ipsum 💗If you feel good, please subscribe and donate to help us out. Thanks!💗 Lorem Ipsum, Lorem Ipsum 💗If you feel good, please subscribe  ",
      category: "",
      _id: "",
    };
  }, []);

  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [setOnDelete] = useState(false);

  const [categories] = state.categoriesApi.categories;
  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;
  const [products] = state.productApi.products;

  const [callback, setCallback] = state.productApi.callback;

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      setOnDelete(true);
      products.forEach((item) => {
        if (item._id === id) {
          setProduct(item);
          setImages(item.images);
        }
      });
    } else {
      setProduct(initialState);
      setImages(false);
      setOnEdit(false);
    }
  }, [id, products, initialState, setOnDelete]);

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("File: ", e.target);
    try {
      if (!isAdmin) {
        return alert("You must be an admin");
      }

      // Kiem tra chat luong file gui len
      const file = e.target.files[0];
      if (file.size > 1024 * 1024 * 1024) {
        return alert("File too large");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("File format not incorrect");
      }

      // Tap doi tuong de luu tru file
      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload", formData, {
        headers: { Authorization: token },
      });

      setImages(res.data);
    } catch (error) {
      return alert(error);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) {
        return alert("You must be an admin");
      }

      await axios.post(
        "/api/destroy",
        {
          public_id: images.public_id,
        },
        {
          headers: { Authorization: token },
        }
      );
      setImages(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("You must be an admin");
      }
      if (!images) {
        return alert("Image is not upload");
      }

      if (onEdit) {
        await axios.put(
          `/api/product/${id}`,
          { ...product, images },
          { headers: { Authorization: token } }
        );
        setCallback(!callback);
      } else {
        await axios.post(
          "/api/product",
          { ...product, images },
          { headers: { Authorization: token } }
        );
        setProduct(initialState);
        setImages(false);
        setCallback(!callback);
        alert("Create product successfully");
      }
    } catch (error) {
      return alert(error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1 relative">
        <input
          type="file"
          className="border w-full h-full"
          onChange={handleUpload}
        />
        <div className="absolute top-0 ">
          <img
            className="w-full h-full object"
            src={images ? images.url : ""}
            alt=""
          />
          <span onClick={handleDestroy}>X</span>
        </div>
      </div>

      <div className="col-span-2 ">
        <form action="" onSubmit={handleSubmit} className="gird gap-y-2">
          <div className="flex flex-col">
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="price">Old Price</label>
            <input
              type="number"
              name="oldPrice"
              id="oldPrice"
              required
              value={product.oldPrice}
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              rows="7"
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="categories">Categories: </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">Please select a category</option>
              {categories?.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-green text-white p-2"
            onClick={closeModal}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
});

export default CreateProduct;
