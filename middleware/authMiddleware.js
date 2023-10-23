import jwt from "jsonwebtoken";

export const virifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const virified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = virified;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
