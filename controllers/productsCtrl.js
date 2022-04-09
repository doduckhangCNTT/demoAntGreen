const Products = require("../models/productModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    console.log(queryObj);
    // Bởi vì filtering là lấy tất cả các tham so trên url lên có thể gây ra bị trùng với các chức khác như sort page ... lên phải delete
    const excludeField = ["page", "limit", "sort", "search"];
    excludeField.forEach((value) => delete queryObj[value]);

    let queryStr = JSON.stringify(queryObj);

    // Chuyển cái chuỗi  về dạng  "$" + match là để cho mongosse có thêm tìm các giá trị tương ứng
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g, // regex giúp có thể truy xuất theo ten
      (match) => "$" + match
    );
    console.log(queryStr);
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      // truyen key vao sort thi sort laf lay gia tri de sap xep
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createAt");
    }

    return this;
  }

  paging() {
    // lấy số lượng trang cần hiển thị
    // Viec * 1 la de chuyen gia tri chuoi thanh number
    const page = this.queryString.page * 1 || 1;
    // Số lượng sản phẩm trên 1 trang
    const limit = this.queryString.limit * 1 || 5;
    // skip nó sẽ bỏ quả số lương phần tử ở trong mảng products
    const skip = (page - 1) * limit;
    // việc bỏ qua skip giá trị là để tránh sự lặp lại các giá trị products trước đó, với hạn số phần tử limit
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productsCtrl = {
  getProducts: async (req, res) => {
    try {
      console.log(req.query);
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paging();

      // const products = await features.query;

      // Sd Promise.allSettled để thực hiện song song 2 đoạn code bên trong
      const result = await Promise.allSettled([
        features.query,
        Products.countDocuments(),
      ]);
      console.log(result);

      const products = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      // res.json({ length: products.length, products: products });
      res.json({ products: products, count: count });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        oldPrice,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) {
        return res
          .status(404)
          .json({ success: false, message: "Image not uploaded!" });
      }

      // Kiem product da ton tai hay chua
      const product = await Products.findOne({ product_id });
      if (product) {
        return res
          .status(400)
          .json({ success: false, message: "Product already exists!" });
      }

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        oldPrice,
        description,
        content,
        images,
        category,
      });
      newProduct.save();
      res.json({ success: true, message: "Product created successfully" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        oldPrice,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) {
        return res
          .status(404)
          .json({ success: false, message: "No image upload" });
      }

      const product = await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title: title.toLowerCase(),
          price,
          oldPrice,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ success: true, message: "Updated product", product: product });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });
      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = productsCtrl;
