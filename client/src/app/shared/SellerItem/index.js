import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct } from "../../actions/product.actions";
const SellerItem = ({
	image,
	name,
	price,
	seller,
	productId,
	deleteProduct,
}) => {
	return (
		<div>
			<div className="h-96 group">
				<img
					src={image}
					alt={name}
					className="h-2/4 object-cover w-full group-hover:shadow-lg"
				/>
				<div className="h-1/4">
					<div className="text-lg">{name}</div>
					<div className="font-bold text-lg">{price} TND</div>
				</div>
				<div className="flex justify-between gap-4 items-center">
					<button
						type="button"
						className=" capitalize text-sm bg-main py-1 px-4 rounded-full transition-all duration-200 ease-in-out w-full text-white font-bold hover:opacity-95 transform hover:scale-105">
						update
					</button>
					<button
						onClick={(e) => deleteProduct(productId)}
						type="button"
						className=" capitalize text-sm bg-danger py-1 px-4 rounded-full transition-all duration-200 ease-in-out w-full text-white font-bold hover:opacity-95 transform hover:scale-105">
						delete
					</button>
				</div>
			</div>
		</div>
	);
};
SellerItem.propTypes = {
	productId: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	seller: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
	deleteProduct,
};

export default connect(null, mapDispatchToProps)(SellerItem);
