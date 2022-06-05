const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Chat = require('../models/Chat');
const { body, validationResult } = require('express-validator');

// Route 1: Getting all the chats. Uses Get method
router.get('/fetchallchats', fetchuser, async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id });
    res.json(chats)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
})

// Route 2: Add new chats to the screen.
router.post('/addchat', fetchuser, [
  body('text', 'You did not type anything').isLength({ min: 0 })
], async (req, res) => {

  try {
    const { text, username } = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const chat = new Chat({
      text,
      username,
      user: req.user.id
    })
  
    const savedChat = await chat.save();
  
    res.json(savedChat)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }

})

module.exports = router