const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  "Content-Type": "Authorization",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

dotenv.config();

const PORT = process.env.PORT || 5000;

const CONNECTION = process.env.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.use("/api", restaurantRoutes);
