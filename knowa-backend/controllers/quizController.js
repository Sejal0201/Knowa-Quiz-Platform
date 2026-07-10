// const quizzes = require("../data/quizzes");
const fs = require("fs");
const path = require("path");

const quizzesFile = path.join(__dirname, "../data/quizzes.json");

const getQuizzes = () => {
  const data = fs.readFileSync(quizzesFile, "utf8");

  return JSON.parse(data);
};

const saveQuizzes = (quizzes) => {
  fs.writeFileSync(quizzesFile, JSON.stringify(quizzes, null, 2));
};
// const results = require("../data/results");
// const fs = require("fs");
// const path = require("path");

const resultsFile = path.join(__dirname, "../data/results.json");

const getResultsData = () => {
  const data = fs.readFileSync(resultsFile, "utf8");

  return JSON.parse(data);
};

const saveResultsData = (results) => {
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
};
const createQuiz = (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;
    const quizzes = getQuizzes();
    const newQuiz = {
      id: Date.now(),

      title,

      description,

      duration,

      questions,

      active: true,

      createdAt: new Date(),
    };

    quizzes.push(newQuiz);
    saveQuizzes(quizzes);

    res.status(201).json({
      success: true,
      message: "Quiz Created Successfully",
      quiz: newQuiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllQuizzes = (req, res) => {
  const quizzes = getQuizzes();

  res.json({
    success: true,
    quizzes,
  });
};

const deleteQuiz = (req, res) => {
  const quizId = Number(req.params.id);
  const quizzes = getQuizzes();
  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);

  if (quizIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Quiz Not Found",
    });
  }

  quizzes.splice(quizIndex, 1);

  saveQuizzes(quizzes);

  res.json({
    success: true,
    message: "Quiz Deleted Successfully",
  });
};

const updateQuiz = (req, res) => {
  try {
    const { id } = req.params;
    const quizzes = getQuizzes();
    const { title, questions } = req.body;

    const quizIndex = quizzes.findIndex((quiz) => quiz.id == id);

    if (quizIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Quiz Not Found",
      });
    }

    quizzes[quizIndex] = {
      ...quizzes[quizIndex],
      title,
      questions,
    };

    saveQuizzes(quizzes);

    res.json({
      success: true,
      message: "Quiz Updated Successfully",
      quiz: quizzes[quizIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const startQuiz = (req, res) => {
  try {
    const quizId = Number(req.params.id);
    const quizzes = getQuizzes();
    const quiz = quizzes.find((quiz) => quiz.id === quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz Not Found",
      });
    }

    const questionsWithoutAnswers = quiz.questions.map((question) => ({
      questionType: question.questionType,

      question: question.question,

      options: question.options || [],

      answer: question.answer,
    }));

    res.json({
      success: true,
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        duration: quiz.duration,
        questions: questionsWithoutAnswers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const submitQuiz = (req, res) => {
  try {
    const { quizId, answers, studentName, studentEmail, batch } = req.body;

    const quizzes = getQuizzes();

    const quiz = quizzes.find((quiz) => quiz.id == quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz Not Found",
      });
    }

    // let score = 0;

    // quiz.questions.forEach((question, index) => {
    //   if (answers[index] === question.answer) {
    //     score++;
    //   }
    // });

    const results = getResultsData();

    const existingAttempt = results.find(
      (result) =>
        result.quizId == quizId &&
        result.studentEmail.toLowerCase() === studentEmail.toLowerCase(),
    );

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        message: "You have already attempted this quiz",
      });
    }
    let score = 0;

    let totalScoredQuestions = 0;

    // quiz.questions.forEach((question, index) => {
    //   // Skip open text questions
    //   if (question.questionType === "text") {
    //     return;
    //   }

    //   totalScoredQuestions++;

    //   if (JSON.stringify(answers[index]) === JSON.stringify(question.answer)) {
    //     score++;
    //   }
    // });

    quiz.questions.forEach((question, index) => {
      if (question.questionType === "text") {
        score++;
        totalScoredQuestions++;
        return;
      }

      totalScoredQuestions++;

      if (JSON.stringify(answers[index]) === JSON.stringify(question.answer)) {
        score++;
      }
    });

    const result = {
      id: Date.now(),

      quizId,
      quizTitle: quiz.title,

      studentName,
      studentEmail,
      batch,

      answers,

      score,

      // total: quiz.questions.length,

      // accuracy: ((score / quiz.questions.length) * 100).toFixed(2),
      total: totalScoredQuestions,

      accuracy:
        totalScoredQuestions > 0
          ? ((score / totalScoredQuestions) * 100).toFixed(2)
          : 0,
      submittedAt: new Date(),
    };
    // const results = getResultsData();

    results.push(result);

    saveResultsData(results);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// const getResults = (req, res) => {
//   const results = getResultsData();

//   res.json({
//     success: true,
//     results,
//   });
// };

const getResults = (req, res) => {
  try {
    const results = getResultsData();

    const latestResults = [...results].reverse();

    res.json({
      success: true,
      results: latestResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const viewAccuracy = (req, res) => {
  try {
    const resultId = Number(req.params.id);
    const results = getResultsData();
    const result = results.find((result) => result.id === resultId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
    }

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const getActiveQuiz = (req, res) => {
//   try {
//     const quizzes = getQuizzes();
//     const activeQuiz = quizzes.find((quiz) => quiz.active === true);

//     if (!activeQuiz) {
//       return res.status(404).json({
//         success: false,
//         message: "No Active Quiz",
//       });
//     }

//     res.json({
//       success: true,
//       quiz: activeQuiz,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const getActiveQuiz = (req, res) => {
  try {
    const quizzes = getQuizzes();

    const activeQuizzes = quizzes.filter((quiz) => quiz.active === true);

    res.json({
      success: true,
      quizzes: activeQuizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// const activateQuiz = (req, res) => {
//   try {
//     const quizId = Number(req.params.id);
//     const quizzes = getQuizzes();

//     quizzes.forEach((quiz) => {
//       quiz.active = false;
//     });

//     const quiz = quizzes.find((quiz) => quiz.id === quizId);

//     if (!quiz) {
//       return res.status(404).json({
//         success: false,
//         message: "Quiz Not Found",
//       });
//     }

//     quiz.active = true;

//     saveQuizzes(quizzes);

//     res.json({
//       success: true,
//       message: "Quiz Activated",
//       quiz,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const activateQuiz = (req, res) => {
  try {
    const quizId = Number(req.params.id);

    const quizzes = getQuizzes();

    const quiz = quizzes.find((quiz) => quiz.id === quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz Not Found",
      });
    }

    quiz.active = true;

    saveQuizzes(quizzes);

    res.json({
      success: true,
      message: "Quiz Activated Successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deactivateQuiz = (req, res) => {
  try {
    const quizId = Number(req.params.id);
    const quizzes = getQuizzes();
    const quiz = quizzes.find((quiz) => quiz.id === quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz Not Found",
      });
    }

    quiz.active = false;

    saveQuizzes(quizzes);

    res.json({
      success: true,
      message: "Quiz Deactivated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getDashboardStats = (req, res) => {
  try {
    const quizzes = getQuizzes();
    const results = getResultsData();

    const totalQuizzes = quizzes.length;

    const activeQuiz = quizzes.filter((quiz) => quiz.active).length;

    const totalAttempts = results.length;

    const uniqueStudents = [
      ...new Set(results.map((result) => result.studentEmail)),
    ];

    const totalStudents = uniqueStudents.length;

    res.json({
      success: true,

      stats: {
        totalQuizzes,
        activeQuiz,
        totalStudents,
        totalAttempts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getQuizPerformance = (req, res) => {
  try {
    const results = getResultsData();

    const performanceMap = {};

    results.forEach((result) => {
      if (!performanceMap[result.quizTitle]) {
        performanceMap[result.quizTitle] = {
          totalAccuracy: 0,
          attempts: 0,
        };
      }

      performanceMap[result.quizTitle].totalAccuracy += Number(result.accuracy);

      performanceMap[result.quizTitle].attempts += 1;
    });

    const performance = Object.keys(performanceMap).map((quizTitle) => ({
      quizTitle,

      averageAccuracy: Math.round(
        performanceMap[quizTitle].totalAccuracy /
          performanceMap[quizTitle].attempts,
      ),
    }));

    res.json({
      success: true,
      performance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getStudentDashboard = (req, res) => {
  try {
    const { email } = req.params;

    const quizzes = getQuizzes();
    const results = getResultsData();

    const activeQuiz = quizzes.find((q) => q.active);
    const activeQuizzes = quizzes.filter((quiz) => quiz.active);
    const studentResults = results.filter(
      (result) => result.studentEmail === email,
    );

    res.json({
      success: true,
      // stats: {
      //   activeQuiz: activeQuiz ? 1 : 0,
      //   duration: activeQuiz?.duration || 0,
      //   totalAttempts: studentResults.length,
      // },
      stats: {
        activeQuiz: activeQuizzes.length,
        duration: activeQuiz?.duration || 0,
        totalAttempts: studentResults.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getStudentResults = (req, res) => {
  try {
    const { email } = req.params;

    const results = getResultsData();

    const studentResults = results.filter(
      (result) => result.studentEmail === email,
    );

    res.json({
      success: true,
      results: studentResults.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const checkAttempt = (req, res) => {
  const { quizId, email } = req.params;

  const results = getResultsData();

  const attempted = results.some(
    (result) =>
      result.quizId == quizId &&
      result.studentEmail.toLowerCase() === email.toLowerCase(),
  );

  res.json({
    success: true,
    attempted,
  });
};
const getBatchAnalytics = (req, res) => {
  try {
    const results = getResultsData();

    const batchMap = {};

    results.forEach((result) => {
      if (!batchMap[result.batch]) {
        batchMap[result.batch] = {
          batch: result.batch,
          students: new Set(),
          attempts: 0,
        };
      }

      batchMap[result.batch].students.add(result.studentEmail);

      batchMap[result.batch].attempts += 1;
    });

    const analytics = Object.values(batchMap).map((batch) => ({
      batch: batch.batch,
      students: batch.students.size,
      attempts: batch.attempts,
    }));

    res.json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getRecentStudents = (req, res) => {
  try {
    const results = getResultsData();

    const studentsMap = {};

    results.forEach((result) => {
      if (!studentsMap[result.studentEmail]) {
        studentsMap[result.studentEmail] = {
          name: result.studentName,
          email: result.studentEmail,
          batch: result.batch,
          date: result.submittedAt,
        };
      }
    });

    const recentStudents = Object.values(studentsMap)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      success: true,
      students: recentStudents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAverageMarks = (req, res) => {
  const results = getResultsData();
  const quizStats = {};

  results.forEach((result) => {
    if (!quizStats[result.quizTitle]) {
      quizStats[result.quizTitle] = {
        totalScore: 0,
        totalStudents: 0,
        totalMarks: result.total,
      };
    }

    quizStats[result.quizTitle].totalScore += result.score;
    quizStats[result.quizTitle].totalStudents += 1;
  });

  const averages = Object.entries(quizStats).map(([quizTitle, data]) => ({
    quizTitle,
    averageMarks: (data.totalScore / data.totalStudents).toFixed(2),
    totalMarks: data.totalMarks,
  }));

  res.json({
    success: true,
    averages,
  });
};
module.exports = {
  createQuiz,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz,
  deactivateQuiz,
  getActiveQuiz,
  startQuiz,
  submitQuiz,
  checkAttempt,
  getAverageMarks,
  getBatchAnalytics,
  viewAccuracy,
  activateQuiz,
  getResults,
  getStudentDashboard,
  getDashboardStats,
  getQuizPerformance,
  getStudentResults,
  getRecentStudents,
};
