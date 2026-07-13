// import { useEffect, useState } from "react";
// import API from "../api";

// function StudentInfo({
//   name,
//   setName,
//   email,
//   setEmail,
//   batch,
//   setBatch,
// }) {
//   return (
//     <div className="student-card">

//       <div className="form-group">
//         <label>
//           Batch Name <span>*</span>
//         </label>

//         <select
//           value={batch}
//           onChange={(e) =>
//             setBatch(e.target.value)
//           }
//         >
//           <option value="">
//             Choose
//           </option>

//           <option value="AI Crew Byte">
//             AI Crew Byte
//           </option>

//           <option value="AI Crew Drift">
//             AI Crew Drift
//           </option>

//           <option value="AI Crew Hype">
//             AI Crew Hype
//           </option>

//           <option value="AI Crew Nova">
//             AI Crew Nova
//           </option>

//           <option value="AI Crew Nexus">
//             AI Crew Nexus
//           </option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>
//           Name <span>*</span>
//         </label>

//         <input
//           type="text"
//           placeholder="Your answer"
//           value={name}
//           onChange={(e) =>
//             setName(e.target.value)
//           }
//         />
//       </div>

//       <div className="form-group">
//         <label>
//           Registered Email <span>*</span>
//         </label>

//         <input
//           type="email"
//           placeholder="Your answer"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />
//       </div>

//     </div>
//   );
// }

// export default StudentInfo;


import { useEffect, useState } from "react";
import API from "../api";

function StudentInfo({
  name,
  setName,
  email,
  setEmail,
  batch,
  setBatch,
}) {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const res = await API.get("/batch");

      setBatches(res.data.batches);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="student-card">

      <div className="form-group">
        <label>
          Batch Name <span>*</span>
        </label>

        <select
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="">
            Choose Batch
          </option>

          {batches.map((batch) => (
            <option
              key={batch.id}
              value={batch.name}
            >
              {batch.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          Name <span>*</span>
        </label>

        <input
          type="text"
          placeholder="Your answer"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>
          Registered Email <span>*</span>
        </label>

        <input
          type="email"
          placeholder="Your answer"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

    </div>
  );
}

export default StudentInfo;