const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const jwtkey=process.env.JWTSECRET
const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User with email already exists" });
    } 
    let password_length=password.length; 
    if(password_length<6){
      return res.status(422).json({error:'password must be minimum 6 characters'})
    }
    if (!emailRegex.test(email)) {
      return res.status(422).json({ error: 'Please provide a valid email address' });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const userDetails = new User({
      name: name,
      email: email,
      password: hashedpassword,
    });
    await userDetails.save();
    res
      .status(201)
      .json({ success: true, message: "your account is created", userDetails });
  } catch (error) {
     return res.status(500).json({ success: false, message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ error: 'Please provide a valid email address' });
    }
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const userId = {
          id: user._id,
        };
        const token = jwt.sign(userId,jwtkey);
        res.json({ token, success: true, message: "logged in" });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "password does not match" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User with mail does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      let data = jwt.verify(token, jwtkey);
      let user = await User.findOne({ _id: data.id });

      if (user) {
        next();
      } else {
        return res.status(401).json({ success: false, message: "user is unauthorized" });
      }
    } catch (error) {
     return  res.status(401).json({ success: false, message: error.message });
    }
  } else {
   return  res.status(401).json({ success: false, message: "user is unauthorized" });
  }
};

const userDetails = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const userId = req.body.id;
    if (userId == undefined) {
     return  res.status(400).json({ success: false, message: "id is not provided" });
    }
    const user = await User.findOne({ _id: userId });
    res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePassword = async (req, res) => {
  if (req.body.id == undefined) {
    return res.status(400).json({ success: false, message: "id is not provided" });
  }
  try {
    const user = await User.findOne({ _id: req.body.id });
    let password_length=req.body.password.length; 
    if(password_length<6){
      return res.status(422).json({error:'password must be minimum 6 characters'})
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    res.json({ success: true, message: "password updated" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
}; 

const deleteUser=async(req,res)=>{ 
    if (req.body.id == undefined) {
        return res.status(400).json({ success: false, message: "id is not provided" });
      } 
      try{ 
        const deleted=await User.deleteOne({_id:req.body.id})
        res.json({ success: true,message:'deleted'});


      } 
      catch(error){
        return res.status(500).json({ success: false, message: error.message });
      }


}

module.exports = {
  userSignup: userSignup,
  userLogin: userLogin,
  userDetails: userDetails,
  authenticateUser: authenticateUser,
  getById: getById,
  updatePassword: updatePassword,
  deleteUser:deleteUser
};
