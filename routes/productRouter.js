const productsCtrl = require("../controllers/productsCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = require("express").Router();

router
  .route("/product")
  .get(productsCtrl.getProducts)
  .post(auth, authAdmin, productsCtrl.createProduct);

router
  .route("/product/:id")
  .put(productsCtrl.updateProduct)
  .delete(productsCtrl.deleteProduct);

module.exports = router;
