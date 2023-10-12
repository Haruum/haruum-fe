import OutletDetail from "./components/OutletDetail";
import ServiceCard from "./components/ServiceCard";
import Cart from "./components/Cart";
import CheckoutButton from "./components/CheckoutButton";
import ReviewList from "./components/ReviewList";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getOutletByEmail, getOutletReviews } from "../../api/explore";
import Modal from "react-modal";
import CheckoutModal from "./components/CheckoutModal";
import { getCustomerData } from "../../api/customerAuth";
import { AuthContext } from "../../context/auth";
import { toast } from "../../utils/toast";
import { getAllPaymentMethods, submitOrder } from "../../api/customerOrder";

function OutletDetailPage() {
	const { email } = useParams();

	const [userAuth, setUserAuth] = useContext(AuthContext);

	const [paymentMethods, setPaymentMethods] = useState([]);

	const [outletName, setOutletName] = useState("");
	const [address, setAddress] = useState("");
	const [rating, setRating] = useState(0);
	const [reviews, setReviews] = useState([]);
	const [servicesProvided, setServicesProvided] = useState([]);
	const [cartAmount, setCartAmount] = useState(0);

	const [confirmationOpen, setConfirmationOpen] = useState(false);
	const [userAddress, setUserAddress] = useState("");
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

	const history = useNavigate();

	const setOutletData = async () => {
		const [status, data] = await getOutletByEmail(email);

		if (status !== 200) {
			history("/explore");
			throw Error(data.message);
		}

		setOutletName(data.name);
		setAddress(data.address);
		setRating(data.outlet_rating);
		setServicesProvided(
			data.items_provided.map((itemProvided, index) => ({
				...itemProvided,
				quantity: 0,
				order: index,
			}))
		);
	};

	const setCustomerData = async () => {
		const accessToken = userAuth.accessToken;

		if (accessToken === null) {
			history("/login");
			throw Error("Please login to perform order.");
		}

		const [status, data] = await getCustomerData(accessToken);

		if (status === 401) {
			history("/login");
			throw Error("Token has expired. Please login again.");
		} else if (status !== 200) {
			history("/explore");
			throw Error(data.message);
		} else {
			setUserAddress(data.latest_delivery_address);
		}
	};

	const setAvailablePaymentMethods = async () => {
		const [status, data] = await getAllPaymentMethods();

		if (status !== 200) {
			history("/explore");
			throw Error(data.message);
		} else {
			setPaymentMethods(data);
			setSelectedPaymentMethod(data[0]);
		}
	};

	const fetchReviewList = async () => {
		const [status, data] = await getOutletReviews(email);

		if (status !== 200) {
			history("/explore");
			throw Error(data.message);
		} else {
			setReviews(data);
		}
	}

	const fetchInitialData = async () => {
		try {
			await setAvailablePaymentMethods();
			await setCustomerData();
			await setOutletData();
			await fetchReviewList();
		} catch (exception) {
			toast.open(exception, "fail");
		}
	};

	useEffect(() => {
		fetchInitialData();
	}, [email]);

	const incrementServiceQuantity = (serviceId) => {
		const nonModifiedService = servicesProvided.filter(
			(serviceProvided) => serviceProvided.id !== serviceId
		);
		const modifiedService = servicesProvided.find(
			(serviceProvided) => serviceProvided.id === serviceId
		);

		const newServicesData = [
			...nonModifiedService,
			{ ...modifiedService, quantity: modifiedService.quantity + 1 },
		];
		setCartAmount(cartAmount + modifiedService.item_price);
		setServicesProvided(newServicesData.sort((a, b) => a.order - b.order));
	};

	const decrementServiceQuantity = (serviceId) => {
		const nonModifiedService = servicesProvided.filter(
			(serviceProvided) => serviceProvided.id !== serviceId
		);
		const modifiedService = servicesProvided.find(
			(serviceProvided) => serviceProvided.id === serviceId
		);

		if (modifiedService.quantity >= 1) {
			const newServicesData = [
				...nonModifiedService,
				{
					...modifiedService,
					quantity: modifiedService.quantity - 1,
				},
			];

			setCartAmount(cartAmount - modifiedService.item_price);
			setServicesProvided(newServicesData.sort((a, b) => a.order - b.order));
		}
	};

	const transformOrderedItems = (ordered_items) => {
		return ordered_items
			.filter((ordered_item) => ordered_item.quantity !== 0)
			.map((ordered_item) => ({
				category_id: ordered_item.id,
				quantity: ordered_item.quantity,
			}));
	};

	const changeAddressCallback = async () => {};

	const submitOrderCallback = async () => {
		const [status, data] = await submitOrder(
			email,
			userAddress,
			selectedPaymentMethod?.id ?? null,
			transformOrderedItems(servicesProvided),
			userAuth.accessToken
		);

		if (status === 401) {
			toast.open("Token is expired. Please login again.", "fail");
			history("/login");
		} else if (status !== 200) {
			setConfirmationOpen(false);
			toast.open(data.message, "fail");
		} else {
			toast.open(data.message, "success");
			history("/explore");
		}
	};

	const submitCallback = async () => {
		await changeAddressCallback();
		await submitOrderCallback();
	};

	return (
		<>
			<Modal
				isOpen={confirmationOpen}
				onAfterOpen={() => {}}
				onRequestClose={() => {}}
			>
				<CheckoutModal
					items={servicesProvided}
					cartAmount={cartAmount}
					submitCallback={submitCallback}
					cancelCallback={() => setConfirmationOpen(false)}
					customerAddress={userAddress}
					setCustomerAddress={setUserAddress}
					paymentMethods={paymentMethods}
					setSelectedPaymentMethod={setSelectedPaymentMethod}
				/>
			</Modal>
			<img
				src="/static/outlet/image/laundry-image.jpg"
				alt=""
				srcset=""
				style={{ width: "100%", height: "135px", "object-fit": "cover" }}
			></img>
			<div class="two-column-page">
				<div class="left-container">
					<OutletDetail
						outletName={outletName}
						address={address}
						rating={rating}
					/>
					<div class="purple-line"></div>
					<div class="light-purple-line"></div>
					<br />
					<span class="service-title">Services Provided</span>
					<br />
					<div class="list-of-categories" id="list-of-categories">
						{servicesProvided.map((serviceProvided) => (
							<ServiceCard
								key={serviceProvided.id}
								serviceName={serviceProvided.service_category_name}
								pricePerItem={serviceProvided.item_price}
								quantity={serviceProvided.quantity}
								incrementQuantity={() =>
									incrementServiceQuantity(serviceProvided.id)
								}
								decrementQuantity={() =>
									decrementServiceQuantity(serviceProvided.id)
								}
							/>
						))}
					</div>
				</div>
				<div class="right-container">
					<Cart currentTotal={cartAmount} />
					<CheckoutButton callback={() => setConfirmationOpen(true)} />
				</div>
			</div>
			<div class="two-column-page">
				<div class="decorations">
					<svg
						width="367"
						height="442"
						viewBox="0 0 367 442"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="415.378"
							y="124.647"
							width="535.422"
							height="238.171"
							rx="119.086"
							transform="rotate(136.81 415.378 124.647)"
							fill="#D187FF"
							fillOpacity="0.49"
						/>
					</svg>

					<svg
						width="223"
						height="507"
						viewBox="0 0 223 507"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="271.751"
							y="124.647"
							width="638.802"
							height="238.171"
							rx="119.086"
							transform="rotate(136.81 271.751 124.647)"
							fill="#D187FF"
							fillOpacity="0.49"
						/>
					</svg>
				</div>
				<ReviewList reviews={reviews}/>
			</div>
		</>
	);
}

export default OutletDetailPage;
