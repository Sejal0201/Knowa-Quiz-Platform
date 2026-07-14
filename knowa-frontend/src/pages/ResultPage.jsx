import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showReview, setShowReview] = useState(false);

  const answers = location.state?.answers || {};

  const questions = location.state?.questions || [];

  const score = location.state?.score || 0;

  const totalQuestions = location.state?.total || 0;

  const percentage = Number(location.state?.accuracy || 0);

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-icon">{percentage >= 50 ? "🏆" : "📚"}</div>

        <h1>Quiz Completed!</h1>

        <p className="result-subtitle">BetterMind Labs Quiz Platform</p>

        <div
          className="score-circle"
          style={{
            "--score": percentage,
          }}
        >
          <span>{percentage}%</span>
        </div>

        <div className="result-stats">
          <div>
            <h3>{score}</h3>
            <p>Correct</p>
          </div>

          <div>
            <h3>{totalQuestions - score}</h3>
            <p>Wrong</p>
          </div>

          <div>
            <h3>{totalQuestions}</h3>
            <p>Total</p>
          </div>
        </div>

        <div className="result-buttons">
          <button
            className="result-btn"
            onClick={() => setShowReview(!showReview)}
          >
            View Accuracy
          </button>

          <button className="result-btn" onClick={() => navigate("/dashboard")}>
            Back To Dashboard
          </button>
        </div>

        {showReview && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            <h2>Accuracy Review</h2>

            {questions.map((question, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  padding: "20px",
                  marginTop: "15px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h4>
                  Q{index + 1}. {question.question}
                </h4>

                <p>
                  Your Answer:
                  <strong> {answers[index] || "Not Answered"}</strong>
                </p>

                <p>
                  Correct Answer:
                  <strong> {question.answer}</strong>
                </p>

                <p>
                  {answers[index] === question.answer ? (
                    <span
                      style={{
                        color: "green",
                      }}
                    >
                      ✅ Correct
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      ❌ Wrong
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
