import { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react";
import API from "../api";
function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await API.get("/quiz/all");

      setQuizzes(res.data.quizzes);
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteQuestion = (id) => {
  //   const updatedQuestions = questions.filter((q) => q.id !== id);

  //   setQuestions(updatedQuestions);

  //   const savedQuiz = JSON.parse(localStorage.getItem("knowaQuiz"));

  //   savedQuiz.questions = updatedQuestions;

  //   localStorage.setItem("knowaQuiz", JSON.stringify(savedQuiz));
  // };
  const activateQuiz = async (quizId) => {
    console.log("Activating:", quizId);

    try {
      await API.put(`/quiz/activate/${quizId}`);

      alert("Quiz Activated Successfully");

      fetchQuizzes();
    } catch (error) {
      console.log(error);
    }
  };
  const deactivateQuiz = async (quizId) => {
    console.log("Deactivating:", quizId);

    try {
      await API.put(`/quiz/deactivate/${quizId}`);

      alert("Quiz Deactivated");

      fetchQuizzes();
    } catch (error) {
      console.log(error);

      alert("Failed to Deactivate Quiz");
    }
  };
  const deleteQuiz = async (quizId) => {
    console.log("Deleting:", quizId);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/quiz/delete/${quizId}`);

      alert("Quiz Deleted Successfully");

      fetchQuizzes();
    } catch (error) {
      console.log(error);

      alert("Failed to Delete Quiz");
    }
  };
  return (
    <div className="manage-page">
      <div className="manage-card">
        <div className="manage-header">
          <div className="manage-page-header">
            <div>
              <h1>Manage Quizzes</h1>
              <p>View, activate and manage all assessments</p>
            </div>

            {/* <button
              className="create-new-btn"
              onClick={() => navigate("/admin/create")}
            >
              + Create Quiz
            </button> */}
          </div>
        </div>

        {quizzes.length === 0 ? (
          <div className="empty-state">No Quizzes Available</div>
        ) : (
          quizzes.map((quiz, index) => (
            <div key={quiz.id} className="question-card">
              <div className="question-top">
                <div className="quiz-icon">
                  <ClipboardList size={22} />
                </div>

                <div className="question-content">
                  <h3>{quiz.title}</h3>

                  <div className="quiz-meta">
                    <span>{quiz.questions.length} Questions</span>
                    <span>{quiz.duration} Minutes</span>

                    {quiz.active ? (
                      <span className="status-active">Active</span>
                    ) : (
                      <span className="status-inactive">Inactive</span>
                    )}
                  </div>
                </div>
                <div className="quiz-actions">
                  {!quiz.active && (
                    <button
                      className="action-green"
                      onClick={() => activateQuiz(quiz.id)}
                    >
                      Activate
                    </button>
                  )}

                  {quiz.active && (
                    <button
                      className="action-orange"
                      onClick={() => deactivateQuiz(quiz.id)}
                    >
                     
  Deactivate    
                    </button>
                  )}

                  <button
                    className="action-red"
                    onClick={() => deleteQuiz(quiz.id)}
                  >
                    Delete
                  </button>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {quiz.active ? (
                    <span className="active-badge">🟢 Active</span>
                  ) : (
                    <span className="inactive-badge">🔴 Inactive</span>
                  )}

                  <button
                    className="activate-btn"
                    onClick={() => activateQuiz(quiz.id)}
                  >
                    Activate
                  </button>

                  <button
                    className="deactivate-btn"
                    onClick={() => deactivateQuiz(quiz.id)}
                  >
                    Deactivate
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteQuiz(quiz.id)}
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageQuizzes;
