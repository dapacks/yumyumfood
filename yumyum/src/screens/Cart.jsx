import React from "react";
import { MdDelete } from "react-icons/md";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { json } from "react-router-dom";
function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }



  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className="headtext">
            <tr className="">
              <th scope="col" style={{ color: "#00BC8C" }}>
                #
              </th>
              <th scope="col" style={{ color: "#00BC8C" }}>
                Name
              </th>
              <th scope="col" style={{ color: "#00BC8C" }}>
                Quantity
              </th>
              <th scope="col" style={{ color: "#00BC8C" }}>
                Option
              </th>
              <th scope="col" style={{ color: "#00BC8C" }}>
                Amount
              </th>
              <th scope="col" style={{ color: "#00BC8C" }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row" style={{ color: "white" }}>
                  {index + 1}
                </th>
                <td style={{ color: "white" }}>{food.name}</td>
                <td style={{ color: "white" }}>{food.qty}</td>
                <td style={{ color: "white" }}>{food.size}</td>
                <td style={{ color: "white" }}>{food.price}</td>
                <td style={{ color: "white" }}>
                  <button
                    type="button"
                    className="btn p-0"
                  >
                    <MdDelete
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckout}> Check Out </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
