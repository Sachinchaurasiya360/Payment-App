const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Authorization Header required",
    });
  }
  const token = authheader.split(" ")[1];

  try {
    const verify=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.userId=verify.userId
    next()
  } catch(err){
    console.log(err)
    return res.status(400).json({
        message:"error"
    })
  }
};

module.exports={
    authMiddleware
}