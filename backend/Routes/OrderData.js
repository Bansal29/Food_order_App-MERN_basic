const express = require("express");
const router = express.Router();
const Order = require(".././models/Orders");

router.post("/orderdata", async (req, res) => {
  console.log("Recieved post request!");
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  let eId = await Order.findOne({ email: req.body.email });
  if (eId === null) {
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post("/myorderdata", async (req, res) => {
  try {
    let mydata = await Order.findOne({ email: req.body.email });
    res.json({ orderData: mydata });
  } catch (error) {
    res.send("Server Error", error.message);
  }
});
module.exports = router;
