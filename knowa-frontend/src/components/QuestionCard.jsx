function QuestionCard({ question, selectedAnswer, onSelect }) {
  if (!question) return null;

  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      {/* MCQ */}
      {question.questionType === "mcq" &&
        question.options.map((option, index) => (
          <label key={index} className="option">
            <input
              type="radio"
              checked={selectedAnswer === option}
              onChange={() => onSelect(option)}
            />

            {option}
          </label>
        ))}

      {/* Checkbox */}
      {question.questionType === "checkbox" && (
        <div className="options">
          {question.options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="checkbox"
                checked={selectedAnswer?.includes(option) || false}
                onChange={(e) => {
                  let updated = selectedAnswer ? [...selectedAnswer] : [];

                  if (e.target.checked) {
                    updated.push(option);
                  } else {
                    updated = updated.filter((item) => item !== option);
                  }

                  onSelect(updated);
                }}
              />

              {option}
            </label>
          ))}
        </div>
      )}

      {/* Text */}
      {question.questionType === "text" && (
        <input
          type="text"
          placeholder="Type your answer..."
          className="text-answer"
          value={selectedAnswer || ""}
          onChange={(e) => onSelect(e.target.value)}
        />
      )}
    </div>
  );
}

export default QuestionCard;
