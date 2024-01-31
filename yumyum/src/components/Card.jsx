import React, { useEffect } from "react";
import { useState ,useRef} from "react";
import { useDispatchCart,useCart } from "./ContextReducer";
function Card(props) {
  const priceRef=useRef()
  let dispatch =useDispatchCart()
  let data=useCart()
  let options=props.options;
  let priceOptions=Object.keys(options);
  const [qty,setqty]=useState(1)
  const [size,setsize]=useState("")
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
  
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        return;
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
  
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
  }
  
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[])
  let finalPrice=qty*Number(options[size])
  
  return (
    <div class="carboxup">
      <div class="cardbox">
        <div
          className="card mt-3 card-inside"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">this is some important text</p>
            <div className="d-flex align-items-center">
              <select className="m-2 h-100  bg-success rounded" onChange={(e)=>setqty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={(i + 1)} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100  bg-success rounded" 
             ref={priceRef}
              onChange={(e)=>setsize(e.target.value)} id="">
                {priceOptions
                .map((data)=>{
                  return <option key={data} value={data}>
                    {data}
                  </option> 
                  })}
              </select>

              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
            <hr /> 
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
