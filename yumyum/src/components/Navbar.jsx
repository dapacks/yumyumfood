
import React, { useState } from 'react'
import Badge from 'react-bootstrap/Badge'

import Cart from '../screens/Cart';
import Modal from '../Modal';
import { Link,useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartview,setcartview]=useState(false)
  const cartlength=useCart();
  const navigate=useNavigate();
  const handleLogout=()=>
  {
   localStorage.removeItem("authToken");
   navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">YumYum</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav me-auto mb-2">
       <li> <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
       </li>
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
  )
}
