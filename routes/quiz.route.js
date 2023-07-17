const Quiz = require("../models/quiz.model")
const express = require("express");
const quizRouter = express.Router()

// Create a new quiz
quizRouter.post('/api/quizzes', async (req, res) => {
    const { creator, title, description, questions } = req.body;
  
    try {
      const quiz = new Quiz({ creator, title, description, questions });
      await quiz.save();
      res.status(201).json(quiz);
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all quizzes
quizRouter.get('/api/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error getting quizzes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// Get a quiz by ID
quizRouter.get('/api/quizzes/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error getting quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// Update a quiz by ID
quizRouter.put('/api/quizzes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    try {
      const quiz = await Quiz.findByIdAndUpdate(id, { title, description }, { new: true });
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error updating quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// Delete a quiz by ID
quizRouter.delete('/api/quizzes/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const quiz = await Quiz.findByIdAndDelete(id);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// Get quiz leaderboard by ID
quizRouter.get('/api/quizzes/:id/leaderboard', async (req, res) => {
    const { id } = req.params;
  
    try {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.status(200).json(quiz.leaderboard);
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = quizRouter

