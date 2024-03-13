import React, { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [credentials, setcredentials] = useState({
    username: "",
    useremail: "",
    userpassword: "",
    userlocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        userpassword: credentials.userpassword,
        useremail: credentials.useremail,
        userlocation: credentials.userlocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentails!");
    } else {
      alert("Sign Up successfull! Please Login");
      document.location.reload();
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
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={credentials.username}
              onChange={onChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="userlocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              name="userlocation"
              value={credentials.userlocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success m-3">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
