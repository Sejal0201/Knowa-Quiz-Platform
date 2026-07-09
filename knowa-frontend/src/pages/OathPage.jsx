import { useNavigate } from "react-router-dom";

function OathPage() {
  const navigate = useNavigate();

  return (
    <div className="oath-container">
      <div className="oath-card">
        <h1>📜 Knowa Quiz Oath</h1>

        <p className="oath-subtitle">
          Please read the instructions carefully before starting.
        </p>

        <div className="rules">
          <p>✅ I will attempt this quiz honestly.</p>
          <p>✅ I will not use unfair means.</p>
          <p>✅ I understand that my performance reflects my knowledge.</p>
          <p>✅ I will respect the integrity of the assessment.</p>
          <p>✅ I am ready to challenge myself and learn.</p>
        </div>

        <button
          className="start-quiz-btn"
          onClick={() => navigate("/quiz")}
        >
          I Accept & Start Quiz
        </button>
      </div>
    </div>
  );
}

export default OathPage;