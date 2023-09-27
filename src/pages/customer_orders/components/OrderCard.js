import { Link } from "react-router-dom";
import StatusPill from "../../../common/Pill";

function OrderCard() {
  const orderID = "";
  const outletName = "Laundry Pak Bambang";
  const status = "pending";
  const itemCount = 3; 
  const transactionAmount = 34000;
  
	return (
		<div class="list-card">
			<section class="list-card__section">
				<h3>{outletName}</h3>
			</section>
			<section class="list-card__section">
				<StatusPill status={status}/>
			</section>
			<section class="list-card__section">
				<div class="order-details">
					<div>
						<div class="item-amount">{itemCount} item(s)</div>
						<div class="transaction-amount">{transactionAmount}</div>
					</div>
					<Link to="" class="detail-button">
						View Details
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13 5L20 12L13 19M4 12H20H4Z"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</Link>
				</div>
			</section>
		</div>
	);
}

export default OrderCard;
