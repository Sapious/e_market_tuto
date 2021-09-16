import React from "react";
import PropTypes from "prop-types";

const SignIn = ({ text, closeModal }) => {
	return (
		<div
			onClick={() => closeModal(false)}
			className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-main bg-opacity-60">
			<div className="bg-white w-1/2 h-1/2">{text}</div>
		</div>
	);
};
SignIn.propTypes = {
	text: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
};
export default SignIn;
