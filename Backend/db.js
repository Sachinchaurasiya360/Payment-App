const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const MongodbURL = process.env.Mongodb_URL;
mongoose
  .connect(MongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  FirstName:{
    type:String,
    required:true,
  },
  LastName:{
    type:String,
    required:true,
  },
  PhoneNo:{
    type:Number,
    required:true,
  },
  
});

const AccountSchema= new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    require:true
  },
  balance:{
    type:Number,
    required:true
  }
})

const user = mongoose.model("user", userSchema);
const Account=mongoose.model("Account",AccountSchema)

module.exports = {
  user,
  Account
};
