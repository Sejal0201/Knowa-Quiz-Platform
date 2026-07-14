// function QuizHeader({ timeLeft }) {
//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   return (
//     <div className="quiz-header">
//       <div>
//         <h2>🧠 Better Mind Labs</h2>
//         <p>Assessment Portal</p>
//       </div>

//       <div className="timer-card">
//         ⏱ TIME REMAINING
//         <br />
//         {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//       </div>
//     </div>
//   );
// }

// export default QuizHeader;


import Logo from "../assets/bettermind-logo.png";

function QuizHeader({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="quiz-header">
      <div className="quiz-brand">
        <img
          src={Logo}
          alt="BetterMind Labs"
          className="quiz-logo"
        />

        <div>
          <h2>Assessment Portal</h2>
          <p>BetterMind Labs Assessment</p>
        </div>
      </div>

      <div className="timer-card">
        <span className="timer-title">TIME REMAINING</span>

        <h2>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
    </div>
  );
}

export default QuizHeader;