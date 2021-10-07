const Product = require("../models/product.models");
const Category = require("../models/category.models");
const User = require("../models/user.models");
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

const getOwnedProducts = async (req, res) => {
	try {
		const products = await Product.find({ seller: req.verifiedUser._id });
		return res.status(200).json({ products: products });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
const getProduct = async (req, res) => {
	const id = req.params.productId;

	try {
		const product = await Product.findById(id).populate({
			path: "seller",
			select: "firstName lastName",
		});
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

const getSellerNumber = async (req, res) => {
	const sellerId = req.params.sellerId;

	try {
		const seller = await User.findById(sellerId).select("phoneNumber");

		return res.status(200).json({ seller: seller });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

const createProduct = async (req, res) => {
	let imageUrl = "";
	if (req.hostname === "localhost") {
		imageUrl =
			req.protocol + "://" + req.hostname + ":8000" + "/" + req.file.path;
	} else {
		imageUrl = req.protocol + "://" + req.hostname + "/" + req.file.path;
	}
	const newProduct = new Product({
		name: req.body.name,
		image: imageUrl,
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
	const query = {
		category: category,
		name: { $regex: `.*${q}.*` },
		price: { $gte: minPrice, $lte: maxPrice },
	};
	if (!query.category) {
		delete query["category"];
	}
	try {
		const products = await Product.find(query).populate({
			path: "seller",
			select: "firstName lastName",
		});
		return res.status(200).json({ products: products });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

const updateProduct = async (req, res) => {
	const id = req.params.productId;
	const data = { ...req.body };
	if (req.file) {
		if (req.hostname === "localhost") {
			data.image =
				req.protocol + "://" + req.hostname + ":8000" + "/" + req.file.path;
		} else {
			imageUrl = req.protocol + "://" + req.hostname + "/" + req.file.path;
		}
	} else {
		delete data["image"];
	}
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

const deleteProduct = async (req, res) => {
	const id = req.params.productId;
	let deletedProduct = null;
	try {
		const product = await Product.findById(id);
		if (product.seller.toString() === req.verifiedUser._id) {
			deletedProduct = await Product.findByIdAndDelete(id);
		}

		return res.status(200).json({ product: deletedProduct });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.getProductBySlug = getProductBySlug;
module.exports.createProduct = createProduct;
module.exports.searchProduct = searchProduct;
module.exports.updateProduct = updateProduct;
module.exports.getOwnedProducts = getOwnedProducts;
module.exports.deleteProduct = deleteProduct;
module.exports.getSellerNumber = getSellerNumber;
