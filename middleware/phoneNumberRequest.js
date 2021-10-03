// just for fun

let times = 0;
module.exports = function (req, res, next) {
	times++;
	console.log(times);
	console.log(req.verifiedUser._id);
	console.log(req.params.sellerId);
	res.append("times", times);
	next();
};
