import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Foodcard = (props) => {
  let data = useCart();
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddtocart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        toast("Item updated in cart!");
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        toast("Item added to cart!");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
    toast("Item added to cart!");
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          class="card-img-top"
          alt="..."
          style={{ height: "150px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/*<p className="card-text">{props.foodItem.description}</p>*/}
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100">Rs.{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className={`btn btn-success justify-center ms-2`}
            on
            onClick={handleAddtocart}
          >
            Add to cart
          </button>
          <ToastContainer position="top-right" autoClose={1500} />
        </div>
      </div>
    </div>
  );
};

export default Foodcard;
