import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignIn from "../../auth/SignIn";
import Register from "../../auth/Register";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories } from "../../actions/category.actions";
const Header = ({ authState, getCategories, categoryState }) => {
	useEffect(() => {
		getCategories(8);
	}, []);
	const [IsSignInOpen, setIsSignInOpen] = useState(false);
	const [IsRegisterOpen, setIsRegisterOpen] = useState(false);
	const handleSignInClose = (e) => {
		setIsSignInOpen(e);
		setIsRegisterOpen(e);
	};
	return (
		<header className="pt-4 border-b-2 border-minor border-solid box-border">
			<div className="container mx-auto">
				<div className="flex justify-between items-center gap-4 mb-5">
					<Link to="/" className="text-primary font-bold text-4xl w-1/12">
						BI3A
					</Link>
					<div className="focus-within:bg-main rounded-full focus-within:ring focus-within:ring-minor focus-within:ring-offset-2 transition-all duration-200 ease-in-out w-8/12">
						<input
							className="border-2 border-r-0 border-solid border-main py-2 pl-4 pr-10 rounded-l-full focus:outline-none w-11/12"
							type="text"
							placeholder="search for something"
						/>
						<button className="border-main border-2 border-l-0 hover:bg-gray-100 focus:bg-main py-2 px-6 rounded-r-full transition-all duration-200 ease-in-out w-1/12">
							<i class="fas fa-search text-minor"></i>
						</button>
					</div>
					{!authState.isAuthenticated ? (
						<div className="flex justify-between items-center w-4/12">
							<button
								onClick={(e) => setIsSignInOpen(true)}
								className="hover:bg-gray-100 focus:bg-gray-200 py-2 px-6 rounded-full transition-all duration-200 ease-in-out w-1/2 text-sm font-semibold text-center whitespace-nowrap">
								Sign in
							</button>
							<button
								onClick={(e) => setIsRegisterOpen(true)}
								className="hover:bg-gray-100 focus:bg-gray-200 py-2 px-6 rounded-full transition-all duration-200 ease-in-out w-1/2 text-sm font-semibold text-center whitespace-nowrap">
								Register
							</button>
						</div>
					) : (
						<div className="flex justify-start items-center gap-4">
							<div className="w-10 h-10 bg-primary text-sm text-main font-bold uppercase flex justify-center items-center rounded-full">
								<span>{authState.user.firstName[0]}</span>
								<span>{authState.user.lastName[0]}</span>
							</div>
							<div className="capitalize font-semibold whitespace-nowrap">
								{authState.user.firstName} {authState.user.lastName}
							</div>
						</div>
					)}
					{IsSignInOpen && <SignIn closeModal={(e) => handleSignInClose(e)} />}
					{IsRegisterOpen && (
						<Register closeModal={(e) => handleSignInClose(e)} />
					)}
				</div>
				<div className="flex justify-between items-center gap-4">
					{categoryState.categories.map((category) => {
						return (
							<div
								key={category._id}
								className="border-b capitalize hover:border-main cursor-pointer transition-all duration-200 ease-in-out delay-300 border-solid py-4 w-1/6 text-center">
								{category.name}
							</div>
						);
					})}
				</div>
			</div>
		</header>
	);
};
Header.propTypes = {
	authState: PropTypes.object.isRequired,
	getCategories: PropTypes.func.isRequired,
	categoryState: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	authState: state.authState,
	categoryState: state.categoryState,
});

const mapDispatchToProps = {
	getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
