const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();
const app = express();
app.use(express.json());

router.get("/", authMiddleware, async (req, res) => {
  console.log("all good");
  const account = await Account.findOne({
    userId: req.userid,
  });
  res.json({
    balance: account.balance,
  });
});

module.exports = router;
