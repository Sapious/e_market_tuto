const Product = require("../models/product.models");
const Category = require("../models/category.models");
const getProducts = async (req, res) => {
	const category = req.query.category ? req.query.category : null;
	const limit = req.query.limit ? parseInt(req.query.limit) : 100;
	try {
		let products = [];
		if (category) {
			products = await Product.find({ category: category })
				.limit(limit)
				.populate({
					select: "firstName lastName",
					path: "seller",
				})
				.populate({
					select: "name image",
					path: "category",
				})
				.sort("-createdAt");
		} else {
			products = await Product.find()
				.limit(limit)
				.populate({
					select: "firstName lastName",
					path: "seller",
				})
				.populate({
					select: "name image",
					path: "category",
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
		category: req.body.category,
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
	const categoryQuery = req.query.category ? req.query.category : null;
	let category = null;

	if (categoryQuery) {
		category = await Category.findOne({ slug: categoryQuery });
	}
	try {
		const products = await Product.find({
			category: category?._id,
			name: { $regex: `.*${q}.*` },
			price: { $gte: minPrice, $lte: maxPrice },
		});
		return res.status(200).json({ products: products });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

const updateProduct = async (req, res) => {
	const id = req.params.productId;
	const data = { ...req.body };
	try {
		const product = await Product.findById(id);
		if (product.seller.toString() === req.verifiedUser._id) {
			const updatedProduct = await Product.findByIdAndUpdate(id, data, {
				new: true,
			});
			return res.status(200).json({ product: updatedProduct });
		} else {
			return res.status(403).json({ message: "you are not the owner" });
		}
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
// TODO: delete of products
module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.getProductBySlug = getProductBySlug;
module.exports.createProduct = createProduct;
module.exports.searchProduct = searchProduct;
module.exports.updateProduct = updateProduct;
