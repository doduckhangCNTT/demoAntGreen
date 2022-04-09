const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Authentication" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Authentication" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = auth;
