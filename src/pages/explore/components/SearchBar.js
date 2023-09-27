import { useState } from "react";

function SearchBar({ searchKey, setSearchKey }) {
	const [currentValue, setCurrentValue] = useState(searchKey);

	const onEnter = (event) => {
		if (event.key === "Enter") {
			setSearchKey(currentValue);
		}
	};

	return (
		<div class="input-icons">
			<i class="fa fa-search icon"></i>
			<input
				type="text"
				name="outlet-name"
				className="search-input"
				placeholder="Type and enter to search for laundry outlets"
				value={currentValue}
				onChange={(e) => setCurrentValue(e.target.value)}
				onKeyDown={onEnter}
			/>
		</div>
	);
}

export default SearchBar;
