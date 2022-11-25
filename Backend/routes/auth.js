const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "pakistan3628@372";  // signature for token
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
// Create a user using :POST "/api/auth/createUser"  Does not require authentication
// ROUTE 1

router.post('/createuser', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Enter a va;id name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 chracters').isLength({ min: 5 }),

], async (req, res) => {

  // if there are errors, return bad request and the errors

  const errors = validationResult(req);
  let success = false
  if (!errors.isEmpty()) {
    let success = false
    return res.status(400).json({ errors: errors.array() });
  }

  // check whether the user or email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false
      return res.status(400).json({ error: "Sorry the this user email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    //   res.json({error:"Please enter a unique value for email",message:err.message})})
    //res.send(req.body);
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true
    console.log(authToken);
    // res.json(user);
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})


// json web token send as a response of authentication (jwt io (website))

// ROUTE 2
// Login  :POST "/api/auth/login"  Does not require authentication

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be empty').exists()
], async (req, res) => {

  // if there are errors, return bad request and the errors

  const errors = validationResult(req);
  let success = false
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });

    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });

    }
    const payLoad = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(payLoad, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

})


// GET user details using :POST "/api/auth/getuser" require authentication
// ROUTE 3

router.post('/getuser', fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})
module.exports = router;