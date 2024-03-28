
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Signup() {

  const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})

const handleSubmit=async (e)=>
{
  e.preventDefault();
  console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}));
  const response=await fetch("http://localhost:5000/api/createuser",{
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
  else {
    // Clear the form fields on successful submission
    setcredentials({
      name: "",
      email: "",
      password: "",
      geolocation: ""
    });
    alert("Registration successful!");
  }
}

const onChange = (e) => {
  setcredentials({ ...credentials, [e.target.name]: e.target.value });
}

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
