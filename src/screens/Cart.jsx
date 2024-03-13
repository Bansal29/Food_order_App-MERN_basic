import React from "react";
import axios from "axios";
import Delete from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3" style={{ color: "white" }}>
          The Cart is Empty!
        </div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await axios.post("http://localhost:5000/api/orderdata", {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      });

      console.log("JSON RESPONSE:::::", response.status);

      if (!response.status === 200) {
        console.error("Failed to fetch. Status:", response.status);
        // Handle specific error cases, if needed
        if (response.status === 401) {
          console.error("Unauthorized access. Please log in.");
        }
        return;
      }

      dispatch({ type: "DROP" });
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Size</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}/-</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete
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
          <h1 className="fs-2" style={{ color: "white" }}>
            Total Price: {totalPrice}/-
          </h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
