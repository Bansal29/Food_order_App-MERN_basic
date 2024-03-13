const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://zwigato:zwigato%40123@cluster0.a00bt1o.mongodb.net/zwigato";

const mongoDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const fetchedData1 = await mongoose.connection.db.collection("Food-items");
    const data = await fetchedData1.find({}).toArray();
    global.food_items = data;
    const fetchedData2 = await mongoose.connection.db.collection(
      "Food-category"
    );
    const categoryData = await fetchedData2.find({}).toArray();
    global.food_category = categoryData;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
