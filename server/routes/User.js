const express = require("express");
const { userSignup } = require("../controllers/User.js");
const { userLogin } = require("../controllers/User.js");
const { userDetails } = require("../controllers/User.js");
const { authenticateUser } = require("../controllers/User.js");
const { getById } = require("../controllers/User.js");
const { updatePassword } = require("../controllers/User.js");
const { deleteUser} = require("../controllers/User.js");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/getall", authenticateUser, userDetails);
router.get("/getone", authenticateUser, getById); 
router.patch('/update',authenticateUser,updatePassword);  
router.delete('/delete',authenticateUser,deleteUser)


module.exports = router;
