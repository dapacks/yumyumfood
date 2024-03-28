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

      <>
       <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">YumYum</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav me-auto mb-2">
       
       {(localStorage.getItem("authToken")) ?   <li> <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
       </li>:"" }
      </ul>

      {(!localStorage.getItem("authToken"))?
      <div className='d-flex'>
      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
        <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
      </div> :
       <div>
        <div className='btn bg-white text-success mx-2' onClick={()=>{setcartview(true)}} >My Cart {' '}
        <Badge pill bg="danger">{cartlength.length > 0 ? cartlength.length : ""}</Badge>
        </div>
        {cartview ? <Modal onClose={()=>setcartview(false)}><Cart/></Modal>:null}
        <div className='btn bg-white text-danger mx-2' onClick={handleLogout} >Logout</div>
       </div>

      
      }
    </div>
  </div>
</nav>
    </div>
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
        </>
      
      )
   

}

export default Login;
