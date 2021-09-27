const router = require("express").Router();
const productControllers = require("../controllers/product.controllers");
const verifyToken = require("../middleware/verifyToken");
const isSeller = require("../middleware/isSeller");


router.get("/", productControllers.getProducts);
router.get("/product/by_slug", productControllers.getProductBySlug);
router.get("/search", productControllers.searchProduct);
router.get("/:productId", productControllers.getProduct);
router.post("/", verifyToken, isSeller, productControllers.createProduct);
router.put("/:productId", verifyToken, isSeller, productControllers.updateProduct);

module.exports = router;
