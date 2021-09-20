require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
//database connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
	console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
	console.log("DB connection failed with -", err);
});
//import routes
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
//server listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log("server yemchi jaw mezyan");
});
