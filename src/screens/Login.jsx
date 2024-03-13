import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setcredentials] = useState({
    useremail: "",
    userpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        useremail: credentials.useremail,
        userpassword: credentials.userpassword,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentails!");
    } else {
      alert("Login in successfull!");
      // document.location.reload();
      localStorage.setItem("userEmail", credentials.useremail);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="useremail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="useremail"
              value={credentials.useremail}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userpassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="userpassword"
              value={credentials.userpassword}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success m-3">
            Log In
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
