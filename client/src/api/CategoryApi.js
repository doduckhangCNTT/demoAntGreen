import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryApi = () => {
  const [categories, setCategories] = useState();
  const [callBack, setCallBack] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };

    getCategory();
  }, []);

  return {
    categories: [categories, setCategories],
    callback: [callBack, setCallBack],
  };
};

export default CategoryApi;
