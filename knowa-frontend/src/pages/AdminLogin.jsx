// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       if (res.data.role !== "admin") {
//         alert("Only Admin Can Login Here");
//         return;
//       }

//       localStorage.setItem("token", res.data.token);

//       localStorage.setItem("role", res.data.role);

//       navigate("/admin");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login Failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1 className="logo">Admin Portal</h1>

//         <p className="tagline">Secure Access to Quiz Management</p>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter your password"
//           className="input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
        

//         <button className="login-btn" onClick={handleLogin}>
//           Login
//         </button>
//         <div className="secure-text">🔒 Secure Admin Access</div>
//         {/* <p className="register-text">
//           Don't have an account?
//           <Link to="/register"> Register</Link>
//         </p> */}
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res.data.role !== "admin") {
        alert("Only Admin Can Login Here");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/admin");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">Admin Portal</h1>

        <p className="tagline">
          Secure Access to Quiz Management
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="secure-text">
          🔒 Secure Admin Access
        </div>
      </div>
    </div>
  );
}

export default Login;