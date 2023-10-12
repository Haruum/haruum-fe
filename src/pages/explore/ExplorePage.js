import { useEffect, useState } from "react";
import LaundryCard from "./components/LaundryCard";
import SearchBar from "./components/SearchBar";
import SortToggler from "./components/SortToggler";
import { getOutlet } from "../../api/explore";
import { useNavigate } from "react-router";

function ExplorePage() {
	const [nameSearch, setNameSearch] = useState("");
	const [outlets, setOutlets] = useState([]);

	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	const history = useNavigate();

	const setCoordinateAndFetchOutletData = () => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
			const outletData = await getOutlet(nameSearch, position.coords.latitude, position.coords.longitude);
			setOutlets(outletData);
		});
	};

	useEffect(() => {
		setCoordinateAndFetchOutletData();
	}, []);

	const setOutletData = async () => {
		const outletData = await getOutlet(nameSearch, latitude, longitude);
		setOutlets(outletData);
	};

	useEffect(() => {
		if (nameSearch !== "") {
			setOutletData();
		}
	}, [nameSearch]);

	return (
		<>
			<SearchBar searchKey={nameSearch} setSearchKey={setNameSearch} />
			<div class="two-column-page pl-50">
				<div class="left-container width-30">
					<SortToggler />
					<div class="purple-line"></div>
					<div class="light-purple-line"></div>
				</div>
				<div className="laundry-outlets" id="laundry-outlets">
					{outlets.map((outlet) => (
						<LaundryCard
							outletName={outlet.name}
							address={outlet.address}
							rating={outlet.outlet_rating}
							onOrderClick={() => history(`/explore/outlet/${outlet.email}`)}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default ExplorePage;
