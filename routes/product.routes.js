const router = require("express").Router();
const productControllers = require("../controllers/product.controllers");
const verifyToken = require("../middleware/verifyToken");
const isSeller = require("../middleware/isSeller");
const multer = require("multer");
const phoneNumberRequest = require("../middleware/phoneNumberRequest");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() + "-" + Math.round(Math.random() * 1e9) + "";
		cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
	},
});
const upload = multer({ storage: storage });

router.get("/", productControllers.getProducts);
router.get("/product/by_slug", productControllers.getProductBySlug);
router.get("/search", productControllers.searchProduct);
router.get("/me", verifyToken, isSeller, productControllers.getOwnedProducts);
router.get("/:productId", productControllers.getProduct);
router.get(
	"/seller/:sellerId/number",
	verifyToken,
	phoneNumberRequest,
	productControllers.getSellerNumber
);
router.post(
	"/",
	upload.single("image"),
	verifyToken,
	isSeller,
	productControllers.createProduct
);
router.put(
	"/:productId",
	upload.single("image"),
	verifyToken,
	isSeller,
	productControllers.updateProduct
);
router.delete("/:productId", verifyToken, productControllers.deleteProduct);

module.exports = router;
