import React, { useEffect } from "react";
import { useQuery } from "../../hooks";
import SearchProduct from "../../shared/SearchProduct";
import { filterProduct } from "../../actions/product.actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../shared/Spinner";

const Search = ({ filterProduct, productState }) => {
	const query = useQuery();
	useEffect(() => {
		filterProduct(query);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query.get("q"), query.get("category")]);

	return productState.loading ? (
		<Spinner />
	) : (
		<div className="pb-20">
			<div className="grid grid-cols-4 gap-4">
				{productState.products.map((product) => {
					return (
						<SearchProduct
							key={product._id}
							seller={product.seller}
							id={product._id}
							image={product.image}
							name={product.name}
							price={product.price}
						/>
					);
				})}
			</div>
		</div>
	);
};
Search.propTypes = {
	productState: PropTypes.object.isRequired,
	filterProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	productState: state.productState,
});

const mapDispatchToProps = {
	filterProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
