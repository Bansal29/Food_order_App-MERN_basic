import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Foodcard from "../components/Foodcard";
// import Carousel from "../components/Carousel";
import burgerImage from "../assets/burger.jpg";
import pizzaImage from "../assets/pizza.jpg";
import wrapImage from "../assets/wrap.jpg";
import { useEffect, useState } from "react";
const Home = () => {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <div>
          <div
            id="carouselExampleInterval"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <h5>Good Food Good Life!!</h5>
                <div class="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="carousel-item active" data-bs-interval="5000">
                <img
                  src={burgerImage}
                  className="d-block w-100 h-75"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={pizzaImage}
                  className="d-block w-100 h-75"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={wrapImage}
                  className="d-block w-100 h-75"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="container">
          {foodCat != []
            ? foodCat.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {foodItem != [] ? (
                      foodItem
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name.toLowerCase().includes(search)
                        )
                        .map((filteritems) => {
                          return (
                            <div
                              key={filteritems._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Foodcard
                                foodItem={filteritems}
                                options={filteritems.options[0]}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div>No such item found!</div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
