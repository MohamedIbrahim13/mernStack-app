const User = require("../models/User");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  // const { authorization } = req.headers;
  // const token = authorization.split(" ")[1];
  // try {
  //   const { _id } = jwt.verify(token, process.env.SECRET);
  //   req.user = await User.findOne({ _id }).select({ _id });
  //   console.log(req.user);
  //   next();
  // } catch (error) {
  //   console.log(error);
  //   res.status(401).json({ error: "Request is not authorized" });
  // }

  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        let user = await User.findById({ _id: decodedToken._id });
        req.user = user;
        //req.locals.user = user;
        //console.log(req.user);
        next();
      }
    });
  }
};

module.exports = requireAuth;
