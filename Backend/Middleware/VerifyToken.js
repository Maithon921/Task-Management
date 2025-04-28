import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid Token or expired token" });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
