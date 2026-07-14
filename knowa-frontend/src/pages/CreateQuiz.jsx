import { useState, useEffect } from "react";
import API from "../api";
import { X } from "lucide-react";
import { CheckSquare } from "lucide-react";
function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("mcq");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [editingId, setEditingId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [duration, setDuration] = useState(10);
  const [quizLink, setQuizLink] = useState("");
  const [createdQuizId, setCreatedQuizId] = useState("");

  const [batchName, setBatchName] = useState("");
  const [batches, setBatches] = useState([]);
  // Load saved questions when page opens
  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };
  const addQuestion = () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }

    if (questionType !== "text" && !answer) {
      alert("Please enter correct answer");
      return;
    }

    // if (
    //   questionType !== "text" &&
    //   (!option1 || !option2 || !option3 || !option4)
    // ) {
    //   alert("Please fill all options");
    //   return;
    // }
    if (questionType !== "text" && options.some((opt) => opt.trim() === "")) {
      alert("Please fill all options");
      return;
    }
    const questionData = {
      id: Date.now(),
      questionType,
      question,
      // options:
      //   questionType === "text" ? [] : [option1, option2, option3, option4],
      options: questionType === "text" ? [] : options,
      answer: questionType === "text" ? null : answer,
    };
    setQuestions([...questions, questionData]);

    setQuestion("");
    // setOption1("");
    // setOption2("");
    // setOption3("");
    // setOption4("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setEditingId(null);
    setDuration(10);
    alert("Question Added Successfully!");
  };
  const fetchBatches = async () => {
    try {
      const res = await API.get("/batch");

      setBatches(res.data.batches);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBatches();
  }, []);
  const addBatch = async () => {
    if (!batchName.trim()) {
      alert("Enter Batch Name");
      return;
    }

    try {
      await API.post("/batch/create", {
        name: batchName,
      });

      setBatchName("");

      fetchBatches();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteBatch = async (id) => {
    try {
      await API.delete(`/batch/${id}`);

      fetchBatches();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);

    setQuestions(updatedQuestions);
  };

  const editQuestion = (q) => {
    setQuestion(q.question);
    setQuestionType(q.questionType);

    // setOption1(q.options?.[0] || "");
    // setOption2(q.options?.[1] || "");
    // setOption3(q.options?.[2] || "");
    // setOption4(q.options?.[3] || "");

    setOptions(q.options?.length ? q.options : ["", "", "", ""]);
    setAnswer(q.answer);

    setEditingId(q.id);

    // Remove old question
    setQuestions(questions.filter((item) => item.id !== q.id));
  };
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    await API.post("/quiz/upload-csv", formData);

    alert("Questions Imported");
  };
  const createQuiz = async () => {
    try {
      if (!quizTitle) {
        alert("Enter Quiz Title");
        return;
      }

      if (questions.length === 0) {
        alert("Add at least one question");
        return;
      }

      // const res = await API.post("/quiz/create", {
      //   title: quizTitle,
      //   description: `${quizTitle} Assessment`,
      //   duration: Number(duration),
      //   questions,
      // });

      // alert("Quiz Created Successfully!");

      const res = await API.post("/quiz/create", {
        title: quizTitle,
        description: `${quizTitle} Assessment`,
        duration: Number(duration),
        questions,
      });

      // Backend returns the created quiz
      const quiz = res.data.quiz;

      const shareLink = `${window.location.origin}/quiz/${quiz.id}`;

      setCreatedQuizId(quiz.id);
      setQuizLink(shareLink);

      alert("Quiz Created Successfully!");
      // localStorage.removeItem("knowaQuiz");
      setQuizTitle("");
      setQuestions([]);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.log(error);
      alert("Failed to Create Quiz");
    }
  };
  const removeOption = (index) => {
    if (index < 4) {
      alert("First 4 options cannot be removed");
      return;
    }

    const updated = options.filter((_, i) => i !== index);

    setOptions(updated);
  };
  return (
    <div className="create-page">
      <div className="create-card">
        {/* <h1>📝 Create Quiz</h1>

        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <div className="field-group"> */}
        <div className="create-header">
          <h1>Create Quiz</h1>
          <p>Build and publish professional assessments</p>
        </div>

        <div className="builder-card">
          <h3>Quiz Details</h3>

          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <h3>Quiz Duration</h3>
          <div className="field-group"></div>
          {/* <label>Quiz Duration</label> */}

          <select
            className="question-type-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="20">20 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option>
            <option value="60">60 Minutes</option>
          </select>
        </div>

        <div className="builder-card">
          <span className="section-badge">Batch Management</span>

          <h2 style={{ marginTop: "20px" }}>Manage Training Batches</h2>

          <div className="batch-input-row">
            <input
              type="text"
              placeholder="Enter Batch Name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />

            <button type="button" className="batch-add-btn" onClick={addBatch}>
              Add Batch
            </button>
          </div>

          {/* <div className="batch-list">
            {batches.map((batch) => (
              <div className="batch-chip" key={batch.id}>
                {batch.name}

                <button
                  className="batch-delete"
                  onClick={() => deleteBatch(batch.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div> */}
          <div className="batch-list">
            {batches.map((batch) => (
              <div key={batch.id} className="batch-chip">
                <span>{batch.name}</span>

                {/* <button onClick={() => deleteBatch(batch.id)}>✕</button> */}
                <button
                  className="batch-check"
                  onClick={() => deleteBatch(batch.id)}
                  title="Delete Batch"
                >
                  <CheckSquare size={20} strokeWidth={2.2} />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* <input type="file" accept=".csv" onChange={handleCSVUpload} /> */}

        {/* <input type="file" accept=".csv" onChange={handleCSVUpload} /> */}
        <div className="builder-card">
          <h3>Question Builder</h3>
          <div className="field-group">
            <label>Question Type</label>

            {/* <select
            className="question-type-select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="mcq">Multiple Choice (MCQ)</option>

            <option value="checkbox">Checkbox (Multi Select)</option>

            <option value="text">Open Text Answer</option>
          </select> */}
            <div className="question-type-cards">
              <div
                className={`type-card ${
                  questionType === "mcq" ? "active" : ""
                }`}
                onClick={() => setQuestionType("mcq")}
              >
                <h4>MCQ</h4>
                <p>Single correct answer</p>
              </div>

              <div
                className={`type-card ${
                  questionType === "checkbox" ? "active" : ""
                }`}
                onClick={() => setQuestionType("checkbox")}
              >
                <h4>Checkbox</h4>
                <p>Multiple correct answers</p>
              </div>

              <div
                className={`type-card ${
                  questionType === "text" ? "active" : ""
                }`}
                onClick={() => setQuestionType("text")}
              >
                <h4>Text</h4>
                <p>Open-ended answer</p>
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* {questionType !== "text" && (
            <>
              <input
                type="text"
                placeholder="Option 1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
              />

              <input
                type="text"
                placeholder="Option 2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
              />

              <input
                type="text"
                placeholder="Option 3"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
              />

              <input
                type="text"
                placeholder="Option 4"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
              />
            </>
          )} */}
          {questionType !== "text" && (
            <>
              {options.map((option, index) => (
                <div key={index} className="option-row">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="option-input"
                  />

                  {index >= 4 && (
                    <button
                      type="button"
                      className="delete-option-btn"
                      onClick={() => removeOption(index)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="add-option-btn"
                onClick={addOption}
              >
                + Add Option
              </button>
            </>
          )}
          {/* <input
          type="text"
          placeholder="Correct Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        /> */}

          {questionType !== "text" && (
            <select
              className="correct-answer-select"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              <option value="">Select Correct Answer</option>

              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {/* <button onClick={addQuestion}>Add Question</button> */}
          <button onClick={addQuestion}>
            {editingId ? "Update Question" : "Add Question"}
          </button>
        </div>
        <button
          className="create-quiz-btn"
          onClick={createQuiz}
          style={{
            marginTop: "15px",
            background: "#16a34a",
          }}
        >
          Create Quiz
        </button>

        {quizLink && (
          <div className="share-card">
            <h3>🎉 Quiz Published Successfully</h3>

            <p>Share this link with students</p>

            <input className="share-link-input" value={quizLink} readOnly />

            <div className="share-buttons">
              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(quizLink);
                  alert("Quiz link copied!");
                }}
              >
                Copy Link
              </button>

              <button
                className="open-btn"
                onClick={() => window.open(quizLink, "_blank")}
              >
                Open Quiz
              </button>
            </div>
          </div>
        )}
        {/* <h2 className="added-title">Added Questions ({questions.length})</h2> */}
        <div className="builder-card">
          <div className="questions-header">
            <h2>Added Questions</h2>

            <span className="question-count">{questions.length} Questions</span>
          </div>
          {/* {questions.map((q, index) => (
          <div key={q.id} className="question-item">
            <div>
              <strong>{q.question}</strong>
            </div>

            <div className="question-number">{index + 1}</div>
          </div>
        ))} */}

          {questions.map((q, index) => (
            <div key={q.id} className="question-item">
              <div>
                <strong>{q.question}</strong>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => editQuestion(q)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteQuestion(q.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="question-number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
