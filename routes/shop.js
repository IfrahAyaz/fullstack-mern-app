var express = require("express");
var router = express.Router();
var Makeup = require("../models/Makeup");
router.get("/cart", async function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let products = await Makeup.find({ _id: { $in: cart } });

  let total = products.reduce(
    (total, product) => total + Number(product.price),
    0
  );

  res.render("site/cart", { products, total });
});
router.get("/add-cart/:id", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  req.flash("success", "Product Added To Cart");
  res.redirect("/");
});
router.get("/delete-cart/:id", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  req.flash("success", "Product deleted from Cart");
  res.redirect("/");
});

module.exports = router;
