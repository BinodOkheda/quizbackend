const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors");
const userRouter = require('./routes/user.route');
const quizRouter = require('./routes/quiz.route');
require("dotenv").config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send(
        "Home Page"
    )
})

app.use("/user",userRouter);
app.use("/quiz",quizRouter)



// Start the server
app.listen(port, async () => {

    try {
        
      await  mongoose.connect(process.env.DB_CONNECTION_STRING)
      console.log("connected to DB..")

    } catch (error) {
        console.log(error.message)
    }


    console.log(`Server listening on port ${port}`);
  });