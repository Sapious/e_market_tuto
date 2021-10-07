import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getOwnedProducts } from "../../actions/product.actions";
import Spinner from "../../shared/Spinner";
import PropTypes from "prop-types";
import SellerItem from "../../shared/SellerItem";

const SellerProducts = ({ productState, getOwnedProducts }) => {
	useEffect(() => {
		getOwnedProducts();
	}, [getOwnedProducts]);
	return productState.loading ? (
		<Spinner />
	) : (
		<div className="grid grid-cols-5 gap-8">
			{productState.products.map((product) => {
				return (
					<SellerItem
						key={product._id}
						data={product}
					/>
				);
			})}
		</div>
	);
};
SellerProducts.propTypes = {
	getOwnedProducts: PropTypes.func.isRequired,
	productState: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	productState: state.productState,
});

const mapDispatchToProps = {
	getOwnedProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProducts);
