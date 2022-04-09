const router = require("express").Router();
const categoriesCtrl = require("../controllers/categoriesCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/category")
  .get(categoriesCtrl.getCategory)
  .post(auth, authAdmin, categoriesCtrl.createCategory);

router
  .route("/category/:id")
  .put(auth, authAdmin, categoriesCtrl.updateCategory)
  .delete(auth, authAdmin, categoriesCtrl.deleteCategory);

module.exports = router;
