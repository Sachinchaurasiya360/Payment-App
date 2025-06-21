const express = require("express");
const router = express.Router();
const app = express();
const userRouter = require("./user");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const accountRouter = require("./account");

router.use("/user", userRouter);
router.use("/account", accountRouter);

// router.use("/account", accountRouter);

module.exports = router;
