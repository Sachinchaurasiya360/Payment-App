const express = require("express");
const router = express.Router();
const zod = require("zod");
const { string, number } = require("zod");
const { user, Account } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

router.post("/signup", async (req, res) => {
  const { username, password, FirstName, LastName, PhoneNo } = req.body;
  const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    FirstName: string().min(1),
    LastName: string().min(1),
    PhoneNo: zod.number().min(1000000000).max(9999999999),
  });

  const parsed = signupBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(411).json({
      message: "Invalid Inputs hai bhai",
    });
  }

  const existingUser = await user.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = await user.create({
    username,
    password: hashedPassword,
    FirstName,
    LastName,
    PhoneNo,
  });

  await Account.create({
    userId: createUser._id,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign(
    { userId: createUser._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "User created successfully",
    token,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const Loginbody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
  });
  const parsed = Loginbody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid Input",
    });
  }
  console.log("body parsed");

  const finduser = await user.findOne({ username });
  const isMatch = await bcrypt.compare(password, finduser.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }
  console.log("all done");
  const token = jwt.sign(
    {
      id: finduser._id,
      username: finduser.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return res.status(200).json({
    message: "signin successful",
    token,
  });
});

router.put("/profile", authMiddleware, async (req, res) => {
  const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
  });
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await user.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

module.exports = router;
