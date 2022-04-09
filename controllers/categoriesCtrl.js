const Categories = require("../models/categoryModel");

const categoriesCtrl = {
  getCategory: async (req, res) => {
    try {
      const categories = await Categories.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Categories.findOne({ name });
      if (category) {
        return res
          .status(400)
          .json({ success: false, message: "Category already exists" });
      }

      const newCategory = new Categories({ name });
      await newCategory.save();
      res.json({ success: true, message: "Created a category" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Categories.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ success: true, message: "Update category successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Categories.findByIdAndDelete({ _id: req.params.id });
      res.json({ success: true, message: "Delete category successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = categoriesCtrl;
