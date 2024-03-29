import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousal from "../components/Carousal";
import Card from "../components/Card";

export default function Home() {
  const [search,setsearch]=useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://deepak-fqpy.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
  <div id="carouselExampleFade" className="carousel slide carousel-fade"  style={{objectFit:"contain !important"}}>
  <div className="carousel-inner " id="carousel">
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
      
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?Food" className="d-block w-100" style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?Pasta" className="d-block w-100" style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?Burger" className="d-block w-100" style={{filter:"brightness(30%)"}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

  </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? 
                  foodItem.filter(
                    (item) => item.CategoryName === data.CategoryName
                  
                 && item.name.toLowerCase().includes(search.toLowerCase())).map(filterItems =>
                  {
                    return (
                      <div key={filterItems._id}  className="col-12 col-md-6 col-lg-3 mb-4 card-box">
                        <Card className="card-con"
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                       
                        />
                      </div>
                    )
                  }) : (
                  <p>No foodItem available</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No food categories available</p>
        )}
        
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
