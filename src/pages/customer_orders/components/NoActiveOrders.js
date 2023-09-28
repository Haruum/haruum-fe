import { capitalizeWords } from "../../../utils/string";

function NoActiveOrders({ type }) {
  return <h5>You Currently Have No {capitalizeWords(type)} Orders</h5>
}

export default NoActiveOrders;