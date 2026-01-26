// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllUsers } from "../api/userApi";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await getAllUsers();

//       const user = response.data.find(
//         (u) => u.email === email && u.password === password
//       );

//       if (!user) {
//         setError("Invalid email or password");
//         return;
//       }

//       // 🔐 ROLE BASED REDIRECT
//       if (user.role.roleName === "ADMIN") {
//         navigate("/admin");
//       } else if (user.role.roleName === "OWNER") {
//         navigate("/owner");
//       } else if (user.role.roleName === "CUSTOMER") {
//         navigate("/customer");
//       }
//     } catch (err) {
//       setError("Backend error");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Login</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleLogin}>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <br />

//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;


// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";

// function Login() {

//   const navigate = useNavigate();

//   // For testing: navigate directly to dashboard
//   const handleLogin = (e) => {
//     e.preventDefault(); // prevent page reload
//     navigate("/dashboard");
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">
      
//       <Navbar />

//       {/* BODY */}
//       <div className="container flex-grow-1 d-flex align-items-center">
//         <div className="row w-100 justify-content-center">

//           {/* LEFT INFO PANEL */}
//           <div className="col-md-6 d-none d-md-flex align-items-center">
//             <div>
//               <h1 className="fw-bold text-success">
//                 Find • Book • Charge
//               </h1>
//               <p className="text-muted fs-5">
//                 Locate EV charging stations near you and book chargers instantly.
//               </p>
//               <ul className="list-unstyled mt-3">
//                 <li>✔ Live charger availability</li>
//                 <li>✔ Secure OTP-based charging</li>
//                 <li>✔ Admin verified stations</li>
//               </ul>
//             </div>
//           </div>

//           {/* LOGIN CARD */}
//           <div className="col-md-5">
//             <div className="card shadow-lg border-0 rounded-4">
//               <div className="card-body p-4">

//                 <h3 className="text-center fw-bold mb-3">
//                   Login to EV Charge
//                 </h3>

//                 <form onSubmit={handleLogin}>

//                   <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter email"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       placeholder="Enter password"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Login As</label>
//                     <select className="form-select">
//                       <option value="CUSTOMER">Customer</option>
//                       <option value="OWNER">Station Owner</option>
//                       <option value="ADMIN">Admin</option>
//                     </select>
//                   </div>

//                   <button type="submit" className="btn btn-success w-100 mt-2">
//                     Login
//                   </button>

//                 </form>

//                 <div className="text-center mt-3">
//                   <small>
//                     New user?{" "}
//                     <a href="/register" className="text-decoration-none">
//                       Register here
//                     </a>
//                   </small>
//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <Footer />

//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllUsers } from "../api/userApi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("CUSTOMER"); // ✅ default
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await getAllUsers();

      const user = response.data.find(
        (u) =>
          u.email === email &&
          u.password === password &&
          u.role.roleName === loginAs
      );

      if (!user) {
        setError("Invalid credentials or role mismatch");
        return;
      }

      // ✅ ROLE BASED REDIRECT
      if (loginAs === "OWNER") {
        navigate("/owner");
      } else if (loginAs === "CUSTOMER") {
        navigate("/customer");
      } else if (loginAs === "ADMIN") {
        navigate("/admin");
      } else {
        setError("Unauthorized user");
      }

    } catch (err) {
      console.error(err);
      setError("Backend error. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      <Navbar />

      {/* BODY */}
      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">

          {/* LEFT INFO PANEL */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div>
              <h1 className="fw-bold text-success">
                Find • Book • Charge
              </h1>
              <p className="text-muted fs-5">
                Locate EV charging stations near you and book chargers instantly.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Live charger availability</li>
                <li>✔ Secure OTP-based charging</li>
                <li>✔ Verified charging stations</li>
              </ul>
            </div>
          </div>

          {/* LOGIN CARD */}
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

                <h3 className="text-center fw-bold mb-3">
                  Login to EV Charge
                </h3>

                {error && (
                  <p className="text-danger text-center">{error}</p>
                )}

                <form onSubmit={handleLogin}>

                  {/* EMAIL */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* ✅ LOGIN AS */}
                  <div className="mb-3">
                    <label className="form-label">Login As</label>
                    <select
                      className="form-select"
                      value={loginAs}
                      onChange={(e) => setLoginAs(e.target.value)}
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="OWNER">Station Owner</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-2"
                  >
                    Login
                  </button>

                </form>

                <div className="text-center mt-3">
                  <small>
                    New user?{" "}
                    <a href="/register" className="text-decoration-none">
                      Register here
                    </a>
                  </small>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
