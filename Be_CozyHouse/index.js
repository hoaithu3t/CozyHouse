require("dotenv").config();
const cool = require("cool-ascii-faces");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const router = require("./api");
const { Pool } = require("pg");
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
mongoose.connect(
  // process.env.MONGO_HOST,
  `mongodb://${process.env.MONGO_OFF_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("DB connected!");
    } else {
      console.error(err);
    }
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(morgan("common"));

app.use(router).get("/cool", (req, res) => res.send(cool()));
app.listen(process.env.PORT, () => {
  console.log("App is running " + process.env.PORT);
});
