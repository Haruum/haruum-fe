function PinkButton({ text, onClick }) {
	return (
		<button onClick={onClick} className="review-button">
			{text}
		</button>
	);
}

export default PinkButton;
