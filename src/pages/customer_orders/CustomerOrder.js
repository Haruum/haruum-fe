import PageTitle from "../../common/PageTitle";
import OrdersList from "./components/OrdersList";

function CustomerOrdersPage() {
  return (
    <>
      <PageTitle title={"List of Orders"}/>
      <OrdersList />
      <div class="blob-1"></div>
			<div class="blob-2"></div>
    </>
  )
}

export default CustomerOrdersPage;