// import { useNavigate } from "react-router-dom";

// function RoleSelection() {
//   const navigate = useNavigate();

//   return (
//     <div className="login-container">
//       <div className="login-card">
// <div className="home-badge">BETTERMIND PLATFORM</div>
//         <h1 className="logo">
//           🧠BETTERMIND LABS
//         </h1>

//         <p className="tagline">
//           Choose Your Role
//         </p>

//         <button
//           className="login-btn"
//           onClick={() =>
//             navigate("/student-login")
//           }
//         >
//            Student Portal
//         </button>

//         <button
//           className="login-btn role-btn"
//           onClick={() =>
//             navigate("/admin-login")
//           }
//         >
//           Admin Portal
//           </button>

//       </div>
//     </div>
//   );
// }

// export default RoleSelection;


import { useNavigate } from "react-router-dom";
import Logo from "../assets/bettermind-logo.png";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="home-badge">
          BETTERMIND PLATFORM
        </div>

        <div className="logo">
          <img
            src={Logo}
            alt="BetterMind Labs"
            className="brand-logo-img"
          />
        </div>

        <p className="tagline">
          Choose Your Portal
        </p>

        <button
          className="login-btn"
          onClick={() => navigate("/student-login")}
        >
          🎓 Student Portal
        </button>

        <button
          className="login-btn role-btn"
          onClick={() =>
            navigate("/admin-bettermind-2025")
          }
        >
          🛠 Admin Portal
        </button>

      </div>
    </div>
  );
}

export default RoleSelection;