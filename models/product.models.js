const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slug = require("slug");
const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, maxlength: 256 },
		slug: {
			type: String,
			maxlength: 512,
			unique: true,
			index: true,
			lowercase: true,
		},
		image: { type: String },
		description: { type: String, maxlength: 1024 },
		price: { type: Number, min: 0 },
		seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	},
	{
		timestamps: true,
	}
);
ProductSchema.plugin(uniqueValidator, { message: "not unique" });

ProductSchema.pre("validate", function (next) {
	if (!this.slug) {
		this.slugify();
	}
	next();
});
ProductSchema.methods.slugify = function () {
	this.slug =
		slug(this.name) +
		"-" +
		(+(Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Product", ProductSchema);
