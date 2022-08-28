import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get header
      token = authorization.split(" ")[1];

      console.log("token", token);

      // Verify Token

      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      console.log(userID);
      req.user = await UserModel.findById(userID).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failed", message: "Unauthorize User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorize User, NO Token" });
  }
};

export default checkUserAuth;
