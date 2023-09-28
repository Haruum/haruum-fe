import { Rating } from "react-simple-star-rating";
import {
	BluePill,
	BluePillHollow,
	DatePill,
	GreenPill,
	PurplePill,
	RedPill,
} from "../../common/Pill";
import UpdateBasicDataModal from "./components/UpdateBasicDataModal";
import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router";
import {
	getOutletDataToken,
	updateOutletData,
	updateOutletService,
} from "../../api/outletAuth";
import { toast } from "../../utils/toast";
import Loader from "../../common/Loader";
import Button from "../../common/Button";
import { getLatitudeLongitudeFromAddress } from "../../utils/geocoder";
import ServicesComponent from "./components/ServicesComponent";
import UpdateServiceCategoryModal from "./components/UpdateServiceCategoryModal";

function OutletProfilePage() {
	const [userAuth, setAuthUser] = useContext(AuthContext);
	const [userData, setUserData] = useState({});
	const [userServices, setUserServices] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isModifyingCategory, setIsModifiyingCategory] = useState(false);

	const [newIsAvailable, setNewIsAvailable] = useState(true);
	const [newQuota, setNewQuota] = useState(0);
	const [newAddress, setNewAddress] = useState(null);
	const [newPhoneNumber, setNewPhoneNumber] = useState("");

	const [modifiedCategoryName, setModifiedCategoryName] = useState("");
	const [modifiedCategoryPrice, setModifiedCategoryPrice] = useState(0);

	const history = useNavigate();

	const fetchUserData = async () => {
		setIsLoading(true);
		if (userAuth.accessToken === null) {
			history("/login");
		}

		const [status, data] = await getOutletDataToken(userAuth.accessToken);

		if (status === 401) {
			toast.open("Access token is expired. Please login again.");
			history("/login");
		} else if (status !== 200) {
			toast.open(data.message, "fail");
		} else {
			setUserData(data);
			setUserServices(
				data.items_provided.sort(
					(a, b) => a.service_category_name - b.service_category_name
				)
			);
			setNewIsAvailable(data.is_available);
			setNewQuota(data.total_quota);
			setNewAddress(data.address);
			setNewPhoneNumber(data.phone_number);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const updateOutletDataCallback = async () => {
		try {
			if (userAuth.accessToken === null) {
				history("/login");
			}

			const { lat, lng } = await getLatitudeLongitudeFromAddress(newAddress);
			const [status, data] = await updateOutletData(
				newIsAvailable,
				newQuota,
				newAddress,
				lat,
				lng,
				newPhoneNumber,
				userAuth.accessToken
			);

			if (status !== 200) {
				setIsUpdating(false);
				toast.open(data.message, "fail");
			} else {
				setIsUpdating(false);
				toast.open(data.message, "success");
				setUserData({
					...userData,
					is_available: newIsAvailable,
					total_quota: newQuota,
					address: newAddress,
					phone_number: newPhoneNumber,
				});
			}
		} catch (exception) {
			toast.open(exception.message, "fail");
		}
	};

	const setupModalForCategoryModification = (categoryName, categoryPrice) => {
		setModifiedCategoryName(categoryName);
		setModifiedCategoryPrice(categoryPrice);
		setIsModifiyingCategory(true);
	};

	const locallyModifyUpdatedService = (categoryName, categoryPrice) => {
		const nonModifiedServices = userServices.filter(
			(service) => service.service_category_name !== categoryName
		);

		setUserServices(
			[
				...nonModifiedServices,
				{ service_category_name: categoryName, item_price: categoryPrice },
			].sort((a, b) => a.service_category_name - b.service_category_name)
		);
	};

	const updateServiceCallback = async () => {
		if (userAuth.accessToken === null) {
			history("/login");
		}

		const [status, data] = await updateOutletService(
			modifiedCategoryName,
			modifiedCategoryPrice,
			userAuth.accessToken
		);

		setIsModifiyingCategory(false);
		if (status !== 200) {
			toast.open(data.message, "fail");
		} else {
			toast.open(data.message, "success");
			locallyModifyUpdatedService(modifiedCategoryName, modifiedCategoryPrice);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="container--flex">
					<Modal isOpen={isUpdating}>
						<UpdateBasicDataModal
							isAvailable={newIsAvailable}
							setIsAvailable={setNewIsAvailable}
							quota={newQuota}
							setQuota={setNewQuota}
							address={newAddress}
							setAddress={setNewAddress}
							phoneNumber={newPhoneNumber}
							setPhoneNumber={setNewPhoneNumber}
							submitCallback={updateOutletDataCallback}
							cancelCallback={() => setIsUpdating(false)}
						/>
					</Modal>
					<div
						className="container--flex__sub"
						style={{ alignItems: "flex-start", gap: "10px" }}
					>
						<h1 style={{ margin: 0 }}>{userData.name}</h1>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<DatePill date={userData.email} />
							<BluePill text={userData.phone_number} />
							<PurplePill text={userData.address} />
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Rating
								initialValue={userData.outlet_rating}
								readonly={true}
								allowFraction={true}
								size={40}
							/>
							<span style={{ fontSize: 20 }}>{userData.outlet_rating}</span>
						</div>
						<BluePill text={`Total Quota: ${userData.total_quota}`} />
						<PurplePill
							text={`Current Active Items: ${userData.amount_of_active_items}`}
						/>
						{userData.is_available ? (
							<GreenPill text={"Outlet is currently Available"} />
						) : (
							<RedPill text={"Outlet is currently NOT Available"} />
						)}
						<Button
							className={"review-button"}
							text="Update Profile"
							onClick={() => setIsUpdating(true)}
						/>
					</div>
					<div className="container--flex__sub">
						<ServicesComponent
							services={userServices}
							setupModifyCategoryModal={setupModalForCategoryModification}
						/>
					</div>
				</div>
			)}
			<Modal isOpen={isModifyingCategory}>
				<UpdateServiceCategoryModal
					categoryName={modifiedCategoryName}
					setCategoryName={setModifiedCategoryName}
					categoryPrice={modifiedCategoryPrice}
					setCategoryPrice={setModifiedCategoryPrice}
					submitCallback={updateServiceCallback}
					closeModal={() => setIsModifiyingCategory(false)}
				/>
			</Modal>
		</>
	);
}

export default OutletProfilePage;
