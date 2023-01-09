var express = require("express");
var router = express.Router();
var Makeup = require("../../models/Makeup");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/images/uploaded");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now() + file.originalname.split(" ").join("-")}`);
  },
});
let upload = multer({ storage });
router.get("/:id", async function (req, res, next) {
  let product = await Makeup.findById(req.params.id);
  return res.send(product);
});
router.get("/", async function (req, res, next) {
  let products = await Makeup.find();

  return res.send(products);
});
router.post("/", upload.single("image"), async function (req, res, next) {
  let product = new Makeup(req.body);
  if (req.file) product.image = req.file.filename;
  await product.save();
  res.send(product);
});
router.put("/:id", async function (req, res, next) {
  let product = await Makeup.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.color = req.body.color;
  product.description = req.body.description;
  product.brand = req.body.brand;
  await product.save();
  return res.send(product);
});
router.delete("/:id", async function (req, res, next) {
  try {
    let product = await Makeup.findById(req.params.id);
    await product.delete();
    return res.send("deleted");
  } catch (err) {
    return res.status(400).send("Invalid Id");
  }
});
module.exports = router;
