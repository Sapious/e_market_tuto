import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProduct, getSellerNumber } from "../../actions/product.actions";
import { useParams } from "react-router";
import Spinner from "../../shared/Spinner";
const ProductDetails = ({ productState, getProduct, getSellerNumber }) => {
	const { productId } = useParams();
	useEffect(() => {
		getProduct(productId);
	}, [productId]);
	return productState.loading ? (
		<Spinner />
	) : (
		<div>
			<div className="flex justify-between items-start gap-20 w-full">
				<img className="w-1/2" src={productState.product?.image} alt="" />
				<div className="w-1/2">
					<div className="font-bold text-3xl capitalize mb-4">
						{productState.product?.name}
					</div>
					<div className="mb-4">{productState.product?.description}</div>
					<div className="text-xl mb-4">{productState.product?.price} TND</div>
					<div className="uppercase mb-4">
						By {productState.product?.seller.firstName}{" "}
						{productState.product?.seller.lastName}
					</div>
					{productState.product?.seller.phoneNumber ? (
						<div>{productState.product?.seller.phoneNumber}</div>
					) : (
						<button
							onClick={(e) => getSellerNumber(productState.product.seller._id)}
							type="submit"
							className="border-main border-2 bg-main py-2 px-6 rounded-full transition-all duration-200 ease-in-out w-1/2 text-white font-bold hover:opacity-95 transform hover:scale-105">
							Get Seller Number
						</button>
					)}
				</div>
			</div>
			<div></div>
		</div>
	);
};

ProductDetails.propTypes = {
	productState: PropTypes.object.isRequired,
	getProduct: PropTypes.func.isRequired,
	getSellerNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	productState: state.productState,
});

const mapDispatchToProps = {
	getProduct,
	getSellerNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
