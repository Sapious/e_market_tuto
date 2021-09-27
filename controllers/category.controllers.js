const Category = require("../models/category.models");
const getCategories = async (req, res) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : 100;
	try {
		const categories = await Category.find().limit(limit).sort("-createdAt");

		return res.status(200).json({ categories: categories });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
const createCategory = async (req, res) => {
	const newCategory = new Category({
		name: req.body.name,
		image: req.body.image,
	});
	try {
		const savedCategory = await newCategory.save();
		return res.status(201).json({ category: savedCategory });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

module.exports.createCategory = createCategory;
module.exports.getCategories = getCategories;
