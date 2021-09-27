const Product = require("../models/product.models");

const getProducts = async (req, res) => {
	const category = req.query.category ? req.query.category : null;
	try {
		const products = [];
		if (category) {
			products = await Product.find({ category: category })
				.populate({
					select: "firstName lastName",
					path: "seller",
				})
				.sort("-createdAt");
		} else {
			products = await Product.find()
				.populate({
					select: "firstName lastName",
					path: "seller",
				})
				.sort("-createdAt");
		}

		return res.status(200).json({ products: products });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
const getProduct = async (req, res) => {
	const id = req.params.productId;

	try {
		const product = await Product.findById(id);
		return res.status(200).json({ product: product });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
const getProductBySlug = async (req, res) => {
	const slug = req.query.slug;

	try {
		const product = await Product.findOne({ slug: slug });
		return res.status(200).json({ product: product });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

const createProduct = async (req, res) => {
	const newProduct = new Product({
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		price: req.body.price,
		seller: req.verifiedUser._id,
	});
	try {
		const savedProduct = await newProduct.save();
		return res.status(201).json({ product: savedProduct });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
const searchProduct = async (req, res) => {
	const q = req.query.q ? req.query.q : "";
	const maxPrice = req.query.maxPrice ? req.query.maxPrice : 999999999;
	const minPrice = req.query.minPrice ? req.query.minPrice : 0;
	try {
		const products = await Product.find({
			name: { $regex: `.*${q}.*` },
			price: { $gte: minPrice, $lte: maxPrice },
		});
		return res.status(200).json({ products: products });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

// TODO: update, delete of products
module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.getProductBySlug = getProductBySlug;
module.exports.createProduct = createProduct;
module.exports.searchProduct = searchProduct;
