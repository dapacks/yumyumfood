import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
let navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid Credentials");
    }
    if(json.success)
    { localStorage.setItem("userEmail",credentials.email);
    localStorage.setItem("authToken",json.authtoken);
      console.log(localStorage.getItem("authToken"));
      navigate("/ ");

    }
  
  };



  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
      
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                id="exampleInputPassword1"
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/createuser" className="m-3 btn btn-danger">
              I'm a new user
            </Link>
          </form>
        </div>
        
      
      )
   

}

export default Login;
