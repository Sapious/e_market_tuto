import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct } from "../../actions/product.actions";
import ProductForm from "../../pages/ProductForm";
const SellerItem = ({ data, deleteProduct }) => {
	const [IsUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const handleProductFormClose = (e) => {
		setIsUpdateModalOpen(e);
	};
	return (
		<div>
			<div className="h-96 group">
				<img
					src={data.image}
					alt={data.name}
					className="h-2/4 object-cover w-full group-hover:shadow-lg"
				/>
				<div className="h-1/4">
					<div className="text-lg">{data.name}</div>
					<div className="font-bold text-lg">{data.price} TND</div>
				</div>
				<div className="flex justify-between gap-4 items-center">
					<button
						onClick={(e) => setIsUpdateModalOpen(true)}
						type="button"
						className=" capitalize text-sm bg-main py-1 px-4 rounded-full transition-all duration-200 ease-in-out w-full text-white font-bold hover:opacity-95 transform hover:scale-105">
						update
					</button>
					<button
						onClick={(e) => deleteProduct(data._id)}
						type="button"
						className=" capitalize text-sm bg-danger py-1 px-4 rounded-full transition-all duration-200 ease-in-out w-full text-white font-bold hover:opacity-95 transform hover:scale-105">
						delete
					</button>
					{IsUpdateModalOpen && (
						<ProductForm
							data={data}
							method="put"
							closeModal={(e) => handleProductFormClose(e)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
SellerItem.propTypes = {
	productId: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
	deleteProduct,
};

export default connect(null, mapDispatchToProps)(SellerItem);
