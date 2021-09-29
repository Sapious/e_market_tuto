import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useClickAway } from "react-use";
import { login } from "../../actions/auth.actions";
import { connect } from "react-redux";
import Spinner from "../../shared/Spinner";

const SignIn = ({ closeModal, login, authState }) => {
	const modalRef = useRef(null);
	const [LoginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	useClickAway(modalRef, () => {
		closeModal(false);
	});
	const onSubmitData = async (e) => {
		e.preventDefault();
		await login(LoginData);
		closeModal(false);
	};
	const handleDataChange = (e) => {
		setLoginData({ ...LoginData, [e.target.name]: e.target.value });
	};
	return authState.loading ? (
		<Spinner />
	) : (
		<div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-main bg-opacity-60">
			<div ref={modalRef} className="bg-white w-1/3 relative rounded-xl p-4">
				<div className="text-main font-bold text-2xl">Sign in</div>
				<form onSubmit={(e) => onSubmitData(e)}>
					<div className="flex w-full flex-col items-center justify-between gap-4 mb-6">
						<div className="w-full">
							<label htmlFor="email">Email</label>
							<input
								onChange={(e) => handleDataChange(e)}
								type="email"
								name="email"
								className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
								placeholder="Email"
								value={LoginData.email}
							/>
						</div>
						<div className="w-full">
							<label htmlFor="password">Password</label>
							<input
								onChange={(e) => handleDataChange(e)}
								type="password"
								name="password"
								className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
								placeholder="Password"
								value={LoginData.password}
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="border-main border-2 bg-main py-2 px-6 rounded-full transition-all duration-200 ease-in-out w-full text-white font-bold hover:opacity-95 transform hover:scale-105">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
SignIn.propTypes = {
	login: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	authState: state.authState,
});

const mapDispatchToProps = {
	login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
