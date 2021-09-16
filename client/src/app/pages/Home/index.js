import React from "react";

const Home = () => {
	return (
		<div>
			<div className="bg-warning">
				<h1 className="text-6xl text-center py-4">
					Find things you'll love. Support independent sellers. Only on Etsy.
				</h1>
				<div className="flex justify-center items-center gap-8">
					{[1, 2, 3, 4, 5].map((el) => {
						return (
							<div className="group cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out -mb-20">
								<div className="w-28 h-28 bg-danger rounded-full my-3 group-hover:shadow-xl transition-all duration-200 ease-in-out"></div>
								<div className="capitalize text-center font-bold mb-2 text-main group-hover:text-opacity-80 border-b-2 border-solid border-transparent group-hover:border-main transition-all duration-200 ease-in-out">
									Face mask
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Home;
