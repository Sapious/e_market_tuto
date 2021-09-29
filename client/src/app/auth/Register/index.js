import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useClickAway } from "react-use";
import { register } from "../../actions/auth.actions";
import { connect } from "react-redux";
import Spinner from "../../shared/Spinner";
const Register = ({ closeModal, register, authState }) => {
	const modalRef = useRef(null);
	const [RegisterData, setRegisterData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		city: "",
		street: "",
		phoneNumber: "",
		lastName: "",
		firstName: "",
	});
	useClickAway(modalRef, () => {
		closeModal(false);
	});
	const onSubmitData = async (e) => {
		e.preventDefault();
		await register(RegisterData);
		closeModal(false);
	};
	const handleDataChange = (e) => {
		setRegisterData({ ...RegisterData, [e.target.name]: e.target.value });
	};
	return authState.loading ? (
		<Spinner />
	) : (
		<div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-main bg-opacity-60">
			<div ref={modalRef} className="bg-white w-1/3 relative rounded-xl p-4">
				<div className="text-main font-bold text-2xl">Register</div>
				<form onSubmit={(e) => onSubmitData(e)}>
					<div className=" space-y-4 mb-6">
						<div className="flex justify-between items-center gap-4">
							<div className="w-1/2">
								<label htmlFor="firstName">First Name</label>
								<input
									onChange={(e) => handleDataChange(e)}
									type="text"
									name="firstName"
									className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
									placeholder="firstName"
									value={RegisterData.firstName}
								/>
							</div>
							<div className="w-1/2">
								<label htmlFor="lastName">Last Name</label>
								<input
									onChange={(e) => handleDataChange(e)}
									type="text"
									name="lastName"
									className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
									placeholder="lastName"
									value={RegisterData.lastName}
								/>
							</div>
						</div>
						<div className="flex justify-between items-center gap-4">
							<div className="w-1/3">
								<label htmlFor="phoneNumber">Phone</label>
								<input
									onChange={(e) => handleDataChange(e)}
									type="number"
									name="phoneNumber"
									className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
									placeholder="phoneNumber"
									value={RegisterData.phoneNumber}
								/>
							</div>
							<div className="w-1/3">
								<label htmlFor="city">City</label>
								<input
									onChange={(e) => handleDataChange(e)}
									type="text"
									name="city"
									className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
									placeholder="city"
									value={RegisterData.city}
								/>
							</div>
							<div className="w-1/3">
								<label htmlFor="street">Street</label>
								<input
									onChange={(e) => handleDataChange(e)}
									type="text"
									name="street"
									className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
									placeholder="street"
									value={RegisterData.street}
								/>
							</div>
						</div>
						<div className="w-full">
							<label htmlFor="email">Email</label>
							<input
								onChange={(e) => handleDataChange(e)}
								type="email"
								name="email"
								className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
								placeholder="Email"
								value={RegisterData.email}
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
								value={RegisterData.password}
							/>
						</div>
						<div className="w-full">
							<label htmlFor="password">Confirm Password</label>
							<input
								onChange={(e) => handleDataChange(e)}
								type="password"
								name="confirmPassword"
								className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
								placeholder="Password"
								value={RegisterData.confirmPassword}
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="border-main border-2 bg-main py-2 px-6 rounded-full transition-all duration-200 ease-in-out w-full text-white font-bold hover:opacity-95 transform hover:scale-105">
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
Register.propTypes = {
	register: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	authState: state.authState,
});

const mapDispatchToProps = {
	register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
