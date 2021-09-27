const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slug = require("slug");
const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxlength: 256,
			unique: true,
			index: true,
			lowercase: true,
		},
		slug: {
			type: String,
			maxlength: 512,
			unique: true,
			index: true,
			lowercase: true,
		},
		image: { type: String },
	},
	{
		timestamps: true,
	}
);
CategorySchema.plugin(uniqueValidator, { message: "not unique" });

CategorySchema.pre("validate", function (next) {
	if (!this.slug) {
		this.slugify();
	}
	next();
});
CategorySchema.methods.slugify = function () {
	this.slug = slug(this.name);
};
module.exports = mongoose.model("Category", CategorySchema);
