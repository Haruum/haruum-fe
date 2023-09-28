function FormInput({ inputField, type, value, setValue, disabled }) {
	return (
		<div class="form-input__group">
			<label class="form-input__label">{inputField.toUpperCase()}</label>
			<input
				required
				name={inputField}
				type={type}
				placeholder={`Enter your ${inputField}`}
				className="form-input"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={disabled ?? false}
			/>
		</div>
	);
}

export default FormInput;
