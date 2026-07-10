import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Trophy,
  Settings,
  LogOut,
  PlayCircle,
  BrainCircuit,
  Clock3,
} from "lucide-react";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  // const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const location = useLocation();

  const previewMode = location.state?.previewMode || false;
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeQuiz: 0,
    duration: 0,
    totalAttempts: 0,
  });
  useEffect(() => {
    fetchActiveQuiz();
    fetchResults();
    fetchDashboardStats();
  }, []);
  const userName = localStorage.getItem("userName") || "Student";
  const fetchResults = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      const res = await API.get(`/quiz/student-results/${email}`);

      setResults(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchActiveQuiz = async () => {
    try {
      const res = await API.get("/quiz/active");

      setActiveQuizzes(res.data.quizzes);
    } catch (error) {
      setActiveQuizzes([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchDashboardStats = async () => {
    try {
      const email = localStorage.getItem("userEmail");

      const res = await API.get(`/quiz/student-dashboard/${email}`);
      console.log("Response:", res.data);
      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };
  // const startQuiz = async () => {
  //   try {
  //     console.log("Button clicked");

  //     const email = localStorage.getItem("userEmail");

  //     console.log("Email:", email);
  //     console.log("Quiz:", activeQuiz);

  //     const res = await API.get(
  //       `/quiz/check-attempt/${activeQuiz.id}/${email}`,
  //     );

  //     console.log("API Response:", res.data);

  //     if (res.data.attempted) {
  //       alert("You have already attempted this quiz");
  //       return;
  //     }

  //     navigate(`/quiz/${activeQuiz.id}`);
  //   } catch (error) {
  //     console.log("ERROR:", error);
  //     alert("Unable to start quiz");
  //   }
  // };
  const startQuiz = async (quiz) => {
    try {
      const email = localStorage.getItem("userEmail");

      const res = await API.get(`/quiz/check-attempt/${quiz.id}/${email}`);

      if (res.data.attempted) {
        alert("You have already attempted this quiz");
        return;
      }

      navigate(`/quiz/${quiz.id}`);
    } catch (error) {
      console.log(error);
      alert("Unable to start quiz");
    }
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="student-brand">
          <BrainCircuit size={32} />
          <span>BetterMind Labs</span>
        </div>

        <ul className="sidebar-menu">
          <li>
            <LayoutDashboard size={18} />
            Dashboard
          </li>

          {/* <li>
            <Trophy size={18} />
            Results
          </li> */}

          <li>
            <Settings size={18} />
            Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* {localStorage.getItem("role") === "admin" && (
            <div className="preview-banner">👁️ Admin Preview Mode</div>
          )} */}
        {previewMode && (
          <div className="preview-banner">
            <span>👁 Admin Preview Mode</span>

            <button
              onClick={() => navigate("/admin")}
              className="back-admin-btn"
            >
              Back to Admin
            </button>
          </div>
        )}
        <div className="topbar">
          <div>
            <h1>Welcome Back, {userName} !</h1>

            <p>
              Continue learning and test your knowledge with active assessments.
            </p>
          </div>

          <div className="user-section">
            <div className="student-profile">
              <div className="profile-avatar">{userName.charAt(0)}</div>

              <div>
                <h4>{userName}</h4>
                <p>Student</p>
              </div>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="stats-grid">
          {/* <div className="stat-card">
              <h2>12</h2>
              <p>Total Quizzes</p>
            </div>

            <div className="stat-card">
              <h2>85%</h2>
              <p>Average Score</p>
            </div>

            <div className="stat-card">
              <h2>98%</h2>
              <p>Best Score</p>
            </div> */}

          <div className="stat-card">
            <h2>{stats.activeQuiz}</h2>
            <p>Active Quiz</p>
          </div>

          <div className="stat-card">
            <h2>{stats.duration} Min</h2>
            <p>Quiz Duration</p>
          </div>

          <div className="stat-card">
            <h2>{stats.totalAttempts}</h2>
            <p>Total Attempts</p>
          </div>
        </div>

        <h2
          style={{
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          Available Quizzes
        </h2>

        {loading ? (
          <p>Loading Quiz...</p>
        ) : activeQuizzes.length > 0 ? (
          <div className="quiz-grid">
            {activeQuizzes.map((quiz) => (
              <div className="quiz-hero-card" key={quiz.id}>
                <div>
                  <h2>{quiz.title}</h2>

                  <div className="quiz-info">
                    <span>
                      <Clock3 size={16} />
                      {quiz.duration} Minutes
                    </span>
                  </div>
                </div>

                <button
                  className="start-quiz-btn"
                  onClick={() => startQuiz(quiz)}
                >
                  <PlayCircle size={18} />
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "12px",
            }}
          >
            No Active Quiz Right Now
          </div>
        )}
        <div className="results-card">
          <div className="section-header">
            <h2>Recent Results</h2>
          </div>

          {results.length === 0 ? (
            <div className="empty-results">
              <h3>No Quiz Attempts Yet</h3>
              <p>Complete your first quiz to see performance analytics here.</p>
            </div>
          ) : (
            results.map((result) => (
              <div key={result.id} className="result-row">
                <div>
                  <h4>{result.quizTitle}</h4>
                  <span>
                    Score {result.score}/{result.total}
                  </span>
                </div>

                <div className="result-score">{result.accuracy}%</div>
              </div>
            ))
          )}
        </div>

        {/* <button
            onClick={() => navigate("/admin")}
            style={{
              marginTop: "30px",
              padding: "12px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            ⚙️ Go To Admin Panel
          </button> */}
      </div>
    </div>
  );
}

export default Dashboard
