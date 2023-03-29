const jwt = require("jsonwebtoken");
const userModel = require("../models/Users");
const RoleModel = require("../models/roles");

exports.loginCheck = (request, response, next) => {
  try {
    let token = request.headers['authorization'];
    console.log('token dans auth',token)
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, process.env.JWT_SECRET);
    request.userDetails = decode;
    next();
  } catch (err) {
    response.json({
      error: "You must be logged in",
    });
  }
};

exports.isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    res.status(403).json({ error: "You are not authenticate" });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  try {
    let reqUser = await userModel.findById(req.body.loggedInUserId);
    let reqRole = await RoleModel.find({type_role: reqUser.userRole})
    // If user role 0 that's mean not admin it's customer
    if (reqUser.userRole !== reqRole.type_role && reqRole.role !== "admin") {
      res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch {
    res.status(404);
  }
};
