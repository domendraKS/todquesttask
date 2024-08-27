import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const cookiesWithName = req.headers.cookie;
  if (!cookiesWithName) {
    return next(errorHandler(401, "No token, authorization denied"));
  }

  const cookies = cookiesWithName.split(";").reduce((cookiesObj, cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookiesObj[name] = value;
    return cookiesObj;
  }, {});

  const token = cookies.userTokenTodquest;
  if (!token) {
    return next(errorHandler(401, "No token, authorization denied"));
  }

  jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Token is not valid"));
    }
    req.user = user;
    next();
  });
};
