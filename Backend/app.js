const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
app.use(express.json());
const cors=require("cors")
app.use(cors());


app.use("/api/v1", indexRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
