// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// function Register() {
//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">

//       <Navbar />

//       {/* BODY */}
//       <div className="container flex-grow-1 d-flex align-items-center">
//         <div className="row w-100 justify-content-center">

//           {/* INFO SECTION */}
//           <div className="col-md-6 d-none d-md-flex align-items-center">
//             <div>
//               <h1 className="fw-bold text-primary">
//                 Join EV Charge Network
//               </h1>
//               <p className="text-muted fs-5">
//                 Register and become part of the smart EV charging ecosystem.
//               </p>
//               <ul className="list-unstyled mt-3">
//                 <li>✔ Book chargers instantly</li>
//                 <li>✔ Manage stations as owner</li>
//                 <li>✔ Secure & verified platform</li>
//               </ul>
//             </div>
//           </div>

//           {/* REGISTER CARD */}
//           <div className="col-md-5">
//             <div className="card shadow-lg border-0 rounded-4">
//               <div className="card-body p-4">

//                 <h3 className="text-center fw-bold mb-3">
//                   Create Account
//                 </h3>

//                 <form>

//                   <div className="mb-3">
//                     <label className="form-label">Full Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter full name"
//                     />
//                   </div>

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
//                       placeholder="Create password"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Register As</label>
//                     <select className="form-select">
//                       <option value="CUSTOMER">Customer</option>
//                       <option value="OWNER">Station Owner</option>
//                     </select>
//                   </div>

//                   <div className="alert alert-info py-2">
//                     <small>
//                       Station Owners will be able to add charging stations after admin approval.
//                     </small>
//                   </div>

//                   <button className="btn btn-primary w-100 mt-2">
//                     Register
//                   </button>

//                 </form>

//                 <div className="text-center mt-3">
//                   <small>
//                     Already have an account?{" "}
//                     <a href="/login" className="text-decoration-none">
//                       Login
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

// export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../api/userApi";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER"); // default
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Role → role_id mapping
    const roleIdMap = {
      CUSTOMER: 1,
      OWNER: 2
    };

    const payload = {
      name,
      email,
      password,
      role_id: roleIdMap[role],
      status: "ACTIVE"
    };

    try {
      await registerUser(payload);
      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      <Navbar />

      {/* BODY */}
      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">

          {/* INFO SECTION */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div>
              <h1 className="fw-bold text-primary">
                Join EV Charge Network
              </h1>
              <p className="text-muted fs-5">
                Register and become part of the smart EV charging ecosystem.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Book chargers instantly</li>
                <li>✔ Manage stations as owner</li>
                <li>✔ Secure & verified platform</li>
              </ul>
            </div>
          </div>

          {/* REGISTER CARD */}
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

                <h3 className="text-center fw-bold mb-3">
                  Create Account
                </h3>

                {error && (
                  <p className="text-danger text-center">{error}</p>
                )}

                {success && (
                  <p className="text-success text-center">{success}</p>
                )}

                <form onSubmit={handleRegister}>

                  {/* FULL NAME */}
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

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
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* REGISTER AS */}
                  <div className="mb-3">
                    <label className="form-label">Register As</label>
                    <select
                      className="form-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="OWNER">Station Owner</option>
                    </select>
                  </div>

                  <div className="alert alert-info py-2">
                    <small>
                      Station Owners can add charging stations after admin approval.
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-2"
                  >
                    Register
                  </button>

                </form>

                <div className="text-center mt-3">
                  <small>
                    Already have an account?{" "}
                    <a href="/login" className="text-decoration-none">
                      Login
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

export default Register;
