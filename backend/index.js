// const express = require("express");
// const app = express();
// const port = 5000;
// const mongoDB = require("./db");
// mongoDB();

// // Enable CORS for all routes
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   next();
// });

// // Handle OPTIONS request for the specific route
// app.options("/api/auth/orderData", (req, res) => {
//   res.sendStatus(200);
// });

// app.use(express.json());
// app.use("/api", require("./Routes/CreateUser"));
// app.use("/api", require("./Routes/DisplayData"));
// app.use("/api", require("./Routes/OrderData"));

// app.get("/", (req, res) => {
//   res.send("Hello worldyyy!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// Handle OPTIONS request for the specific route
app.options("/api/auth/orderData", (req, res) => {
  res.sendStatus(200);
});

// Logging middleware
app.use((req, res, next) => {
  // console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello worldyyy!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
