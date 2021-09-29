import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";
import Spinner from "../shared/Spinner";

const PrivateRoute = ({ authState, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				authState.loading ? (
					<Spinner />
				) : authState.isAuthenticated ? (
					authState.user.isSeller ? (
						<Component {...props} />
					) : (
						<Redirect to="/" />
					)
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};
PrivateRoute.propTypes = {
	authState: PropTypes.object.isRequired,
	component: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	authState: state.authState,
});

export default connect(mapStateToProps)(PrivateRoute);
