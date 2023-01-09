var express = require("express");
var router = express.Router();
var Makeup = require("../../../models/Makeup");

router.get("/", async function (req, res, next) {
  console.log("inside");
  setTimeout(async () => {
    let products = await Makeup.find();

    res.send(products);
  }, 5000);
});
module.exports = router;
