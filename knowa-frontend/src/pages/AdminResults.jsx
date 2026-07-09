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
import {
  Users,
  Mail,
  BookOpen,
  BarChart3,
} from "lucide-react";
import "../styles/AdminResults.css";

function AdminResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await API.get("/quiz/results");
      setResults(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  // Group Results by Batch
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.batch]) {
      acc[result.batch] = [];
    }

    acc[result.batch].push(result);

    return acc;
  }, {});

  return (
    <div className="results-page">

      <div className="page-header">

        <div>

          <span className="section-badge">
            Results
          </span>

          <h1>Student Results</h1>

          <p>
            View quiz performance batch wise.
          </p>

        </div>

      </div>

      {Object.entries(groupedResults).map(
        ([batch, students]) => (
          <div
            key={batch}
            className="batch-result-card"
          >

            <div className="batch-result-header">

              <div className="batch-title">

                {/* <div className="batch-avatar">

                  {batch.charAt(0)}

                </div> */}

                <div>

                  <h2>{batch}</h2>

                  <span>
                    {students.length} Students
                  </span>

                </div>

              </div>

            </div>

            {students.map((student) => (

              <div
                key={student.id}
                className="student-result-row"
              >

                <div className="student-left">

                  <div className="student-circle">

                    {student.studentName.charAt(0)}

                  </div>

                  <div>

                    <h3>
                      {student.studentName}
                    </h3>

                    <p>
                      <Mail size={14} />
                      {student.studentEmail}
                    </p>

                  </div>

                </div>

                <div className="student-middle">

                  <BookOpen size={18} />

                  {student.quizTitle}

                </div>

                <div className="student-score">

                  {student.score}/{student.total}

                </div>

                <div className="accuracy-chip">

                  {student.accuracy}%

                </div>

              </div>

            ))}

          </div>
        )
      )}

    </div>
  );
}

export default AdminResults;