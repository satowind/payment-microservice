const express = require("express");
const morgan = require("morgan");
const paymentRoutes = require("./routes/paymentRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/payments", paymentRoutes);
// Catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});
app.use(errorHandler);

module.exports = app;
