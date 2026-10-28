require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.get("/api/products", async (req, res) => {
  res.json(await Product.find());
});

app.post("/api/products", async (req, res) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.put("/api/products/:id", async (res, req) => {
  res.json(
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  );
});

app.delete("/api/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});


app.listen(process.env.PORT, () =>
  console.log(`API running on http://localhost:${process.env.PORT}`),
);
