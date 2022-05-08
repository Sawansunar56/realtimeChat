const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "Youare@#INsane";

// req takes the data from the user
// res is what the coder sends it to the user
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5}),
  ], async (req, res) => {

    let success = false;
  
    /* this checks if the value of any given data is valid.
     the body in the header are what gets passed here.
     So if there are any errors. and array of that is given */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {

      // This checks whether the user exists in the database or not
      let user = await User.findOne({ email: req.body.email });

      // If the user does exist we will return the error
      if(user) {
        return res.status(400).json({ success, error: "Sorry this email is already occupied"})
      }

      // A random word which attaches itself to the end of the password to produce a different hash.
      const salt = await bcrypt.genSalt(10);
      // Attaches the password and salt and then hashes them into a hash form.
      const secPass = await bcrypt.hash(req.body.password, salt);
      
      // If the user doesn't already exist we will create and put them in
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        date: req.body.date
      })

      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken })
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
)


// Router 2: This handles the login aspect of backend
router.post('/login', [
    body('email', 'Type a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
  ], async (req, res) => {
  
  // Success is only used for the front end. So that you can know the condition of the api fetch.
  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // You should return here because you don't want anything to run after this. 
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  // validates whether the user is inside the database or not
  try {
    let user = await User.findOne({email});
    if(!user){
      success = false;
      // You should return here because you don't want anything to run after this. 
      return res.status(400).json({ error: "Sorry there was an error, please give the correct credentials"});
    }

    // This compares the hash and the password that we got
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Sorry there was an error, please give the correct credentials"});
    }

    const data = {
      user: {
        id: user.id
      }
    }

    // This creates the a hash like pattern for our user data and stores it. SO that we will know when it's tampered with.
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
})


// Router 3: This function gets the user
router.post('/getuser', fetchuser ,async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
)

module.exports = router