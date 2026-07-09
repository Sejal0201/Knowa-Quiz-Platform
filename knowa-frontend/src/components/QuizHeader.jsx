function QuizHeader({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="quiz-header">
      <div>
        <h2>🧠 Better Mind Labs</h2>
        <p>Assessment Portal</p>
      </div>

      <div className="timer-card">
        ⏱ TIME REMAINING
        <br />
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
}

export default QuizHeader;