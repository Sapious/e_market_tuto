import React, { Fragment } from "react";

const Spinner = () => {
	return (
		<Fragment>
			<div className="w-full h-full top-0 left-0 fixed block bg-secondary opacity-100 z-50">
				<span
					className="opacity-100 block relative w-0 h-0 "
					style={{
						top: "calc( 50% - ( 80px / 2) )",
						left: "calc( 50% - ( 80px / 2) )",
					}}>
					<i className="fas fa-circle-notch fa-spin fa-5x text-primary-shade"></i>
				</span>
			</div>
		</Fragment>
	);
};

export default Spinner;
