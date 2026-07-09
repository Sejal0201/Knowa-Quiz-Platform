function QuizIntro({ quiz }) {
  return (
    <div className="intro-card">

      <h1>
        {quiz.title}
      </h1>

      <p>
        {quiz.description}
      </p>

    </div>
  );
}

export default QuizIntro;