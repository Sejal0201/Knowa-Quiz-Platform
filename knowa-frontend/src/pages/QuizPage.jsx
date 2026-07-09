import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api";
import QuizHeader from "../components/QuizHeader";
import QuizIntro from "../components/QuizIntro";
import StudentInfo from "../components/StudentInfo";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

function QuizPage() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const { id } = useParams();
  const [showReview, setShowReview] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizStarted, setQuizStarted] = useState(false);
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [batch, setBatch] = useState("");
  useEffect(() => {
    fetchQuiz();
  }, []);

  // const fetchQuiz = async () => {
  //   try {
  //     const res = await API.get(`/quiz/start/${id}`);

  //     setQuizData(res.data.quiz);

  //     setQuizQuestions(res.data.quiz.questions);

  //     setTimeLeft(res.data.quiz.duration * 60);
  //   } catch (error) {
  //     console.log(error);

  //     alert("Quiz Not Found");

  //     navigate("/dashboard");
  //   }
  // };
  const fetchQuiz = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      // Check Attempt
      const checkRes = await API.get(`/quiz/check-attempt/${id}/${email}`);

      if (checkRes.data.attempted) {
        alert("You have already attempted this quiz");

        navigate("/dashboard");

        return;
      }

      const res = await API.get(`/quiz/start/${id}`);

      setQuizData(res.data.quiz);

      setQuizQuestions(res.data.quiz.questions);

      setTimeLeft(res.data.quiz.duration * 60);
    } catch (error) {
      console.log(error);

      alert("Quiz Not Found");

      navigate("/dashboard");
    }
  };
  const submitQuiz = async () => {
    try {
      const answersArray = Object.values(answers);

      const res = await API.post("/quiz/submit", {
        quizId: id,
        studentName: name,
        studentEmail: email,
        batch,
        answers: answersArray,
      });

      navigate("/result", {
        state: {
          ...res.data.result,
          answers,
          questions: quizQuestions,
        },
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to Submit Quiz");
    }
  };
  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     submitQuiz();
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft]);

  useEffect(() => {
    if (!quizStarted) return;

    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted]);

  const handleOptionSelect = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const startQuiz = () => {
    if (!batch || !name || !email) {
      alert("Please fill all details");
      return;
    }

    setQuizStarted(true);
  };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (quizQuestions.length === 0) {
    return <h2 style={{ padding: "40px" }}>No Quiz Found</h2>;
  }

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      {quizStarted && <QuizHeader timeLeft={timeLeft} />}

      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
        }}
      >
        <QuizIntro
          quiz={{
            title: quizData?.title || "BETTERMIND LABS Assessment Quiz",

            description:
              quizData?.description || "Welcome to today's assessment.",
          }}
        />

        {/* <StudentInfo
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          batch={batch}
          setBatch={setBatch}
        />

        <ProgressBar current={currentQuestion} total={quizQuestions.length} />

        <QuestionCard
          question={quizQuestions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onSelect={handleOptionSelect}
        /> */}
        {!quizStarted ? (
          <div>
            <StudentInfo
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              batch={batch}
              setBatch={setBatch}
            />

            <button
              className="quiz-nav-btn"
              onClick={startQuiz}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "15px",
              }}
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            <ProgressBar
              current={currentQuestion}
              total={quizQuestions.length}
            />

            <QuestionCard
              question={quizQuestions[currentQuestion]}
              selectedAnswer={answers[currentQuestion]}
              onSelect={handleOptionSelect}
            />
          </>
        )}

        {quizStarted && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              className="quiz-nav-btn"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <button  className="quiz-nav-btn submit-btn"  onClick={submitQuiz}>
                Submit Quiz
              </button>
            ) : (
              <button className="quiz-nav-btn" onClick={nextQuestion}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
