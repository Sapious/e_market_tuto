const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
	{
		avatar: { type: String },
		firstName: { type: String, maxlength: 64, required: true },
		lastName: { type: String, maxlength: 64, required: true },
		email: {
			type: String,
			unique: true,
			index: true,
			required: true,
			lowercase: true,
		},
		password: { type: String, minlength: 8, maxlength: 1024, required: true },
		isSeller: { type: Boolean, default: false },
		phoneNumber: { type: Number },
		address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
	},
	{ timestamps: true }
);
UserSchema.plugin(uniqueValidator, { message: "not unique" });
module.exports = mongoose.model("User", UserSchema);
