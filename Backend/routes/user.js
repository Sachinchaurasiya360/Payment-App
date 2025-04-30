const express = require("express");
const router = express.Router();
const zod = require("zod");
const { string, number } = require("zod");
const { user } = require("../db"); // import only once, avoid name clash
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); // make sure to load env vars
const app = express();
app.use(express.json());

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the user route",
  });
});

router.post("/signup", async (req, res) => {
  const { username, password, FirstName, LastName, PhoneNo } = req.body;
  console.log("Request body:", req.body);
  const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    FirstName: string().min(1),
    LastName: string().min(1),
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

  const createUser = await user.create({
    username,
    password,
    FirstName,
    LastName,
    PhoneNo,
  });
  console.log("worked till");

  const token = jwt.sign(
    { userId: createUser._id },
    process.env.JWT_SECRET_KEY // Make sure this exists in your .env
  );

  res.json({
    message: "User created successfully",
    token,
  });
});

module.exports = router;
