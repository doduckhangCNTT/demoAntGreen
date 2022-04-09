const Users = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    // Tim user da gui thong tin len
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "You need to login or register" });
    }

    if (user.role === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Admin resource access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = authAdmin;
