const express = require("express");

const router = express.Router();

const {
  createQuiz,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz,
  startQuiz,
  submitQuiz,
  viewAccuracy,
  deactivateQuiz,
  getActiveQuiz,
  getQuizById,
  activateQuiz,
  getResults,
  getDashboardStats,
  getQuizPerformance,
  getStudentDashboard,
  getStudentResults,
  getBatchAnalytics,
  getRecentStudents,
  checkAttempt,
} = require("../controllers/quizController");

router.post("/create", createQuiz);

router.get("/share/:id", getQuizById);

router.get("/all", getAllQuizzes);

router.delete("/delete/:id", deleteQuiz);

router.put("/update/:id", updateQuiz);

router.get("/start/:id", startQuiz);

router.post("/submit", submitQuiz);

router.get("/accuracy/:id", viewAccuracy);

router.get("/active", getActiveQuiz);

router.put("/activate/:id", activateQuiz);
router.put("/deactivate/:id", deactivateQuiz);
router.delete("/delete/:id", deleteQuiz);

router.get("/results", getResults);
router.get("/dashboard-stats", getDashboardStats);
router.get("/performance", getQuizPerformance);
router.get("/check-attempt/:quizId/:email", checkAttempt);
router.get("/student-dashboard/:email", getStudentDashboard);
router.get("/student-results/:email", getStudentResults);
router.get("/batch-analytics", getBatchAnalytics);
router.get("/recent-students", getRecentStudents);

module.exports = router;
