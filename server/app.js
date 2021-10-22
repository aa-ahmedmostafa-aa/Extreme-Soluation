const express = require("express");
const connection = require("./configration/configDb");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRoutes = require("./modules/users/routes/user.route");
const artPiecesRoutes = require("./modules/artPieces/routes/artPieces.route");

const port = process.env.PORT || 5000;

// ** public middelware **//
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/api/v0", async (req, res) => {
  res.send("Hello World");
});

//** application routes */
app.use("/api/v0", userRoutes);
app.use("/api/v0", artPiecesRoutes);

//** DB connection */
connection();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
