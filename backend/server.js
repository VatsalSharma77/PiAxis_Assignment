const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const detailRoutes = require("./routes/detailRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", detailRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


