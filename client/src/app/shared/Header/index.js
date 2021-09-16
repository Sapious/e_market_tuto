import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "../../auth/SignIn";
const Header = () => {
	const [IsSignInOpen, setIsSignInOpen] = useState(false);
	const handleSignInClose = (e) => {
		setIsSignInOpen(e);
	};
	return (
		<header className="pt-4 border-b-2 border-minor border-solid box-border">
			<div className="container mx-auto">
				<div className="flex justify-between items-center gap-4 mb-5">
					<Link to="/" className="text-primary font-bold text-4xl w-1/12">
						BI3A
					</Link>
					<div className="focus-within:bg-main rounded-full focus-within:ring focus-within:ring-minor focus-within:ring-offset-2 transition-all duration-200 ease-in-out w-10/12">
						<input
							className="border-2 border-r-0 border-solid border-main py-2 pl-4 pr-10 rounded-l-full focus:outline-none w-11/12"
							type="text"
							placeholder="search for something"
						/>
						<button className="border-main border-2 border-l-0 hover:bg-gray-100 focus:bg-main py-2 px-6 rounded-r-full transition-all duration-200 ease-in-out w-1/12">
							<i class="fas fa-search text-minor"></i>
						</button>
					</div>
					<button
						onClick={(e) => setIsSignInOpen(true)}
						className="hover:bg-gray-100 focus:bg-gray-200 py-2 px-6 rounded-full transition-all duration-200 ease-in-out w-1/12 text-sm font-semibold">
						Sign in
					</button>
					{IsSignInOpen && (
						<SignIn
							text="this from header"
							closeModal={(e) => handleSignInClose(e)}
						/>
					)}
				</div>
				<div className="flex justify-between items-center gap-4">
					<div className="border-b capitalize hover:border-main cursor-pointer transition-all duration-200 ease-in-out delay-300 border-solid py-4 w-1/6 text-center">
						jewelry
					</div>
					<div className="border-b capitalize hover:border-main cursor-pointer transition-all duration-200 ease-in-out delay-300 border-solid py-4 w-1/6 text-center">
						craft
					</div>
					<div className="border-b capitalize hover:border-main cursor-pointer transition-all duration-200 ease-in-out delay-300 border-solid py-4 w-1/6 text-center">
						mechanic
					</div>
					<div className="border-b capitalize hover:border-main cursor-pointer transition-all duration-200 ease-in-out delay-300 border-solid py-4 w-1/6 text-center">
						kitchen
					</div>
					<div className="border-b capitalize hover:border-main cursor-pointer transition-all duration-200 ease-in-out delay-300 border-solid py-4 w-1/6 text-center">
						food
					</div>
					<div className="border-b capitalize hover:border-main cursor-pointer transition-all duration-200 ease-in-out delay-300 border-solid py-4 w-1/6 text-center">
						food
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
