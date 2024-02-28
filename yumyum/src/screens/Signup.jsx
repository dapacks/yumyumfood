import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Signup() {

  const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})

const handleSubmit=async (e)=>
{
  e.preventDefault();
  console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}));
  const response=await fetch("https://deepak-fqpy.onrender.com//api/createuser",{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
  });

  const json=await response.json()
  console.log(json);

  if(!json.success)
  {
   alert("enter valid Credentials")
  }
}

const onChange = (e) => {
  setcredentials({ ...credentials, [e.target.name]: e.target.value });
}

  return (
    <>
     <div className="container">
    <form onSubmit={handleSubmit}>
       <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" 
      name="email" value={credentials.email}
      id="exampleInputEmail1" 
      aria-describedby="emailHelp"
      onChange={onChange}
      />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" 
      name="password" value={credentials.password}
      id="exampleInputPassword1"
      onChange={onChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
      <input type="text" className="form-control" 
      name="geolocation" value={credentials.geolocation}
      id="exampleInputPassword1"
      onChange={onChange}
      />
    </div>
   
   
    <button type="submit" className="btn btn-success">Submit</button>
    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
  </form>
  </div>
  </>
  )
}

export default Signup
