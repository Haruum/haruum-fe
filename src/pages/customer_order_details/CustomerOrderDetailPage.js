import PageTitle from "../../common/PageTitle";
import StatusPill from "../../common/Pill";
import PinkButton from "../../common/PinkButton";
import TransactionCard from "./components/TransactionCard";

function CustomerOrderDetailPage() {
	return (
		<>
			<PageTitle title={"Order Details"} />

			<div class="container--flex">
				<div class="container--flex__sub">
					<h4 class="subheader">Laundry Pak Bambang</h4>
					<StatusPill status={"pending"} />
					<PinkButton text={"Review"} onClick={() => {}} />
				</div>
				<div class="container--flex__sub">
					<TransactionCard />
				</div>
			</div>
		</>
	);
}

export default CustomerOrderDetailPage;
