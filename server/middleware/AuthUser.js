import jwt from "jsonwebtoken";
import "dotenv/config.js";

const AuthUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "authorization token required" });
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_KEY);

    req.userid = _id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not authorized" });
  }
};

export default AuthUser;
