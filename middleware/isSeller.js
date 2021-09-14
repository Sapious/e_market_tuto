module.exports = function (req, res, next) {
	if (!req.verifiedUser.isSeller) {
		return res.status(403).json({ message: "you are not a seller" });
	}
	next();
};
