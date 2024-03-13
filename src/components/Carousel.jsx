import React from "react";
import burgerImage from "../assets/burger.jpg";
import pizzaImage from "../assets/pizza.jpg";
import wrapImage from "../assets/wrap.jpg";
const carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <h5>Good Food Good Life!!</h5>
            <form class="d-flex mt-10">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success bg-success text-white"
                type="submit"
              >
                Search
              </button>
            </form>
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
  );
};

export default carousel;
