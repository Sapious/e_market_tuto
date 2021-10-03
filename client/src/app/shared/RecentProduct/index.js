import React from "react";
import { Link } from "react-router-dom";

const RecentProduct = ({ image, price, id }) => {
	return (
		<Link to={`/products/${id}`} className="h-40 rounded-xl hover:shadow-md relative cursor-pointer">
			<img
				className="object-cover rounded-xl h-full w-full"
				src={image}
				alt=""
			/>
			<div className="absolute bottom-2 left-2 bg-white rounded-full py-1 px-2 font-semibold text-sm">
				{price} TND
			</div>
		</Link>
	);
};

export default RecentProduct;
