// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BrainCircuit } from "lucide-react";

// function Register() {
//   const navigate = useNavigate();

//   const [name, setName] =
//     useState("");

//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const handleRegister =
//     async () => {
//       try {
//         const res =
//           await axios.post(
//             "http://localhost:5000/api/auth/register",
//             {
//               name,
//               email,
//               password,
//             }
//           );

//         alert(
//           res.data.message
//         );

//         navigate("/");
//       } catch (error) {
//         alert(
//           error.response?.data?.message ||
//             "Registration Failed"
//         );
//       }
//     };

//   return (
//     <div className="login-container">
//       <div className="login-card">

//           <h1 className="logo">
//           <BrainCircuit size={60} strokeWidth={2.3} />
//           <span>BETTERMIND LABS</span>
//         </h1>

//         <p className="tagline">
//           Create Your Account
//         </p>

//         <input
//           type="text"
//           placeholder="Enter your name"
//           className="input"
//           value={name}
//           onChange={(e) =>
//             setName(e.target.value)
//           }
//         />

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="input"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />

//         <input
//           type="password"
//           placeholder="Create password"
//           className="input"
//           value={password}
//           onChange={(e) =>
//             setPassword(
//               e.target.value
//             )
//           }
//         />

//         <button
//           className="login-btn"
//           onClick={handleRegister}
//         >
//           Create Account
//         </button>

//         <p className="register-text">
//           Already have an account?
//           <Link to="/">
//             {" "}
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api";
import { BrainCircuit } from "lucide-react";
// import Logo from "../assets/bettermind-logo.png";

const API_URL = "https://knowa-quiz-platform.onrender.com/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed. Please try again.",
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">
          <BrainCircuit size={60} strokeWidth={2.3} />
          <span>BETTERMIND LABS</span>
        </h1>
        {/* <div className="logo">
          <img src={Logo} alt="BetterMind Labs" className="logo-image" />
        </div> */}

        <p className="tagline">Create Your Account</p>

        <input
          type="text"
          placeholder="Enter your name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleRegister}>
          Create Account
        </button>

        <p className="register-text">
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
