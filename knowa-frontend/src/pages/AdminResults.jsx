// import { useEffect, useState } from "react";
// import API from "../api";

// function AdminResults() {
//   const [results, setResults] =
//     useState([]);

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   const fetchResults =
//     async () => {
//       try {
//         const res =
//           await API.get(
//             "/quiz/results"
//           );

//         setResults(
//           res.data.results
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     };

//   return (
//     <div
//       style={{
//         padding: "40px",
//       }}
//     >
//       <h1>
//         📊 Student Results
//       </h1>

//       <div
//         style={{
//           marginTop: "30px",
//         }}
//       >
//         {results.map(
//           (result) => (
//             <div
//               key={result.id}
//               style={{
//                 background:
//                   "#fff",
//                 padding:
//                   "20px",
//                 marginBottom:
//                   "15px",
//                 borderRadius:
//                   "12px",
//               }}
//             >
//               <h3>
//                 {result.studentName}
//               </h3>

//               <p>
//                 📧 {result.studentEmail}
//               </p>

//               <p>
//                 🎓 {result.batch}
//               </p>

//               <p>
//                 📝 {
//                   result.quizTitle
//                 }
//               </p>

//               <p>
//                 📊 Score:
//                 {" "}
//                 {result.score}
//                 /
//                 {result.total}
//               </p>

//               <p>
//                 Accuracy:
//                 {" "}
//                 {
//                   result.accuracy
//                 }
//                 %
//               </p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminResults;

import { useEffect, useState } from "react";
import API from "../api";
import { Users, Mail, BookOpen, BarChart3 } from "lucide-react";
import "../styles/AdminResults.css";

function AdminResults() {
  const [groupedResults, setGroupedResults] = useState([]);
  const [openBatch, setOpenBatch] = useState(null);
  const [openQuiz, setOpenQuiz] = useState(null);

  // useEffect(() => {
  //   fetchResults();
  // }, []);

  useEffect(() => {
    fetchResults();

    const interval = setInterval(() => {
      fetchResults();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // const fetchResults = async () => {
  //   try {
  //     const res = await API.get("/quiz/results");
  //     setResults(res.data.results);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchResults = async () => {
    try {
      const res = await API.get("/quiz/grouped-results");

      setGroupedResults(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Group Results by Batch
  // const groupedResults = results.reduce((acc, result) => {
  //   if (!acc[result.batch]) {
  //     acc[result.batch] = [];
  //   }

  //   acc[result.batch].push(result);

  //   return acc;
  // }, {});

  return (
    <div className="results-page">
      <div className="page-header">
        <div>
          <span className="section-badge">Results</span>

          <h1>Student Results</h1>

          <p>View quiz performance batch wise.</p>
        </div>
      </div>

      {groupedResults.map((batch) => (
        <div key={batch.batch} className="batch-result-card">
          <div
            className="batch-header"
            onClick={() =>
              setOpenBatch(openBatch === batch.batch ? null : batch.batch)
            }
          >
            <h2>{batch.batch}</h2>

            <span>{batch.quizzes.length} Quizzes</span>
          </div>

          {openBatch === batch.batch && (
            <div className="quiz-list">
              {/* {batch.quizzes.map((quiz) => (
                <div key={quiz.quizTitle} className="quiz-item">
                  <BookOpen size={18} />

                  {quiz.quizTitle}
                </div>
              ))} */}

              {batch.quizzes.map((quiz) => (
                <div key={quiz.quizTitle}>
                  <div
                    className="quiz-item"
                    onClick={() =>
                      setOpenQuiz(
                        openQuiz === `${batch.batch}-${quiz.quizTitle}`
                          ? null
                          : `${batch.batch}-${quiz.quizTitle}`,
                      )
                    }
                  >
                    <div className="quiz-left">
                      <BookOpen size={18} />

                      <span>{quiz.quizTitle}</span>
                    </div>

                    <div className="quiz-right">
                      <span>{quiz.students.length} Attempts</span>
                    </div>
                  </div>

                  {openQuiz === `${batch.batch}-${quiz.quizTitle}` && (
                    <div className="students-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>

                            <th>Email</th>

                            <th>Score</th>

                            <th>Accuracy</th>
                          </tr>
                        </thead>

                        <tbody>
                          {quiz.students.map((student) => (
                            <tr key={student.studentEmail}>
                              <td>{student.studentName}</td>

                              <td>{student.studentEmail}</td>

                              <td>
                                {student.score}/{student.total}
                              </td>

                              <td>{student.accuracy}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminResults;
