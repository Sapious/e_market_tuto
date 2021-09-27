import React from "react";
import PropTypes from "prop-types";

const SearchProduct = ({ image, name, price, seller }) => {
	return (
		<div className="h-96 group">
			<img src={image} alt={name} className="h-2/3 object-cover w-full group-hover:shadow-lg" />
			<div className="h-1/3">
				<div className="text-lg">{name}</div>
				<div className="font-bold text-lg">{price} TND</div>
				<div className="text-sm">Ad by RAED BAHRI</div>
			</div>
		</div>
	);
};
SearchProduct.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	seller: PropTypes.object.isRequired,
};
export default SearchProduct;
