import React, { useRef, useState, useEffect } from "react";
import { createProduct } from "../../actions/product.actions";
import { useClickAway } from "react-use";
import { connect } from "react-redux";
import { getCategories } from "../../actions/category.actions";
import PropTypes from "prop-types";

const ProductForm = ({
	closeModal,
	createProduct,
	getCategories,
	categoryState,
}) => {
	useEffect(() => {
		getCategories(10);
	}, []);
	const modalRef = useRef(null);
	const [ProductData, setProductData] = useState({
		name: "",
		image: "",
		description: "",
		price: "",
		category: "",
	});
	const [ProductFile, setProductFile] = useState(null);
	useClickAway(modalRef, () => {
		closeModal(false);
	});
	const handleDataChange = (e) => {
		setProductData({ ...ProductData, [e.target.name]: e.target.value });
		console.log(ProductData);
	};
	const handleFileChange = (e) => {
		setProductFile(e.target.files[0]);
		setProductData({ ...ProductData, [e.target.name]: e.target.value });
	};
	const onSubmitData = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", ProductData.name);
		formData.append("description", ProductData.description);
		formData.append("price", ProductData.price);
		formData.append("category", ProductData.category);
		formData.append("image", ProductFile);
		await createProduct(formData);
		closeModal(false);
	};
	return (
		<div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto bg-main bg-opacity-60">
			<div ref={modalRef} className="bg-white w-1/3 relative rounded-xl p-4 ">
				<form onSubmit={(e) => onSubmitData(e)}>
					<div className="flex w-full flex-col items-center justify-between gap-4 mb-6">
						<div className="w-full">
							<label htmlFor="name">Name</label>
							<input
								onChange={(e) => handleDataChange(e)}
								type="text"
								name="name"
								className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
								placeholder="Name"
								value={ProductData.name}
							/>
						</div>
						<div className="w-full">
							<label htmlFor="image">Image</label>
							<input
								onChange={(e) => handleFileChange(e)}
								type="file"
								name="image"
								className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
								placeholder="Image"
								value={ProductData.image}
							/>
						</div>
						<div className="w-full">
							<label htmlFor="description">Description</label>
							<textarea
								onChange={(e) => handleDataChange(e)}
								type="text"
								name="description"
								className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
								placeholder="description"
								value={ProductData.description}
							/>
						</div>
						<div className="w-full flex justify-between items-center gap-2">
							<div className="w-1/2">
								<label htmlFor="price">Price</label>
								<input
									onChange={(e) => handleDataChange(e)}
									type="number"
									min={0}
									name="price"
									className="w-full border-black rounded focus:outline-none border-solid border py-2 px-4"
									placeholder="price"
									value={ProductData.price}
								/>
							</div>
							<div className="w-1/2">
								<label htmlFor="category">Category</label>
								<select
									className="w-full capitalize border-black rounded focus:outline-none border-solid border py-2 px-4"
									name="category"
									value={ProductData.category}
									onChange={(e) => handleDataChange(e)}>
									<option value={""} hidden>
										--Select Category
									</option>
									{categoryState.categories.map((cat) => {
										return (
											<option className="capitalize" value={cat._id}>
												{cat.name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="border-main border-2 bg-main py-2 px-6 rounded-full transition-all duration-200 ease-in-out w-full text-white font-bold hover:opacity-95 transform hover:scale-105">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
ProductForm.propTypes = {
	categoryState: PropTypes.object.isRequired,
	getCategories: PropTypes.func.isRequired,
	createProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	categoryState: state.categoryState,
});

const mapDispatchToProps = {
	createProduct,
	getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
