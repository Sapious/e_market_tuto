const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
	{
		city: { type: String, maxlength: 128 },
		street: { type: String, maxlength: 128 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
