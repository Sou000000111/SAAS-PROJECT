import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, "SECRET");
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
