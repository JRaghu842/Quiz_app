let express = require("express");
let { Quiz } = require("../models/quiz.model");

let QuizRouter = express.Router();

QuizRouter.post("/api/quizzes", async (req, res) => {
  let quizData = req.body;
  try {
    let newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(200).send({ msg: "Quiz added sucessfully", newQuiz });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

QuizRouter.get("/api/quizzes", (req, res) => {
  Quiz.find()
    .then((quizzes) => {
      res.send({ quizzes });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

QuizRouter.put("/api/quizzes/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  const quizData = req.body.quiz;

  Quiz.findByIdAndUpdate(quizId, quizData, { new: true })
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json({ quiz });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

QuizRouter.delete("/api/quizzes/:quizId", (req, res) => {
  const quizId = req.params.quizId;

  Quiz.findByIdAndDelete(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json({ message: "Quiz deleted successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = {
  QuizRouter,
};
