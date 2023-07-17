const User = require("../models/user.model")
const express = require("express");
const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
    const { username, email } = req.body;
  


    try {
      let user = await User.findOne({ email });
      if (user) {
        // If user already exists, return the existing user
        return res.status(200).json(user);
      }
  
      user = new User({ username, email });
      await user.save();
      res.status(201).json(user);

    } catch (error) {

      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });

    }
});


module.exports= userRouter