const Payments = require("../models/paypalModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const paymentCtrl = {
  getPayment: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ message: "User not found" });

      const { cart, paymentID, address } = req.body;
      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        cart: cart,
        paymentID: paymentID,
        address: address,
        name: name,
        email: email,
      });
      console.log(newPayment);
      newPayment.save();

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      return res.json({ success: true, message: "Payment saved successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate({ _id: id }, { sold: oldSold + quantity });
};

module.exports = paymentCtrl;
