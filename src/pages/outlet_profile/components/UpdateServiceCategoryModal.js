import FormInput from "../../../common/FormInput";

function UpdateServiceCategoryModal({
	categoryName,
	setCategoryName,
	categoryPrice,
	setCategoryPrice,
	submitCallback,
	closeModal,
}) {
	return (
		<div className="container--flex__sub" style={{ padding: "15px" }}>
			<FormInput
				inputField={"Service Category Name"}
				type={"text"}
				value={categoryName}
				setValue={setCategoryName}
			/>
			<FormInput
				inputField={"Item Price"}
				type={"number"}
				value={categoryPrice}
				setValue={(value) => setCategoryPrice(Number(value))}
			/>
			<button className="confirm-button" onClick={submitCallback}>
				Update
			</button>
			<button className="cancel-button" onClick={closeModal}>
				Cancel
			</button>
		</div>
	);
}

export default UpdateServiceCategoryModal;
