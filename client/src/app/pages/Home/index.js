import React, { useEffect } from "react";
import RecentProduct from "../../shared/RecentProduct";
import { getProducts } from "../../actions/product.actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../shared/Spinner";
const Home = ({ getProducts, productState, categoryState, authState }) => {
	useEffect(() => {
		getProducts(10);
	}, []);
	return productState.loading && categoryState.loading && authState.loading ? (
		<Spinner />
	) : (
		<div>
			<div className="bg-warning">
				<h1 className="text-6xl text-center py-4">
					Find things you'll love. Support independent sellers. Only on Etsy.
				</h1>
				<div className="flex justify-center items-center gap-8">
					{categoryState.categories.slice(0, 5).map((category) => {
						return (
							<Link
								to={`/search?category=${category.slug}`}
								key={category._id}
								className="group cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out -mb-20">
								<img
									className="w-28 h-28 rounded-full my-3 group-hover:shadow-xl transition-all duration-200 ease-in-out object-cover"
									src={category.image}
									alt={category.name}
								/>
								<div className="capitalize text-center font-bold mb-2 text-main group-hover:text-opacity-80 border-b-2 border-solid border-transparent group-hover:border-main transition-all duration-200 ease-in-out">
									{category.name}
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<div className="grid grid-cols-5 gap-4 mt-32">
				{productState.products.map((product) => {
					return (
						<RecentProduct
							id={product._id}
							key={product._id}
							image={product.image}
							price={product.price}
						/>
					);
				})}
			</div>
		</div>
	);
};
Home.propTypes = {
	getProducts: PropTypes.func.isRequired,
	productState: PropTypes.object.isRequired,
	categoryState: PropTypes.object.isRequired,
	authState: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	productState: state.productState,
	categoryState: state.categoryState,
	authState: state.authState,
});

const mapDispatchToProps = {
	getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
