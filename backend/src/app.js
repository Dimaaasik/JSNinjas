const express = require("express");
const cors = require("cors");
const path = require("path");
const heroRoutes = require("./routes/superhero");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // віддавати картинки
app.use("/api/superheroes", heroRoutes);

module.exports = app;