import CartProvider from "./components/ContextReducer";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from "./screens/Cart";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import Signup from "./screens/Signup";
import MyOrders from "./screens/MyOrders";
import Authcheck from "./components/Authcheck";
 // Corrected path
               // Removed .min from the filename
       // Removed .min from the filename
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Authcheck/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/myOrder" element={<MyOrders/>}/>
        </Routes>
        
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
