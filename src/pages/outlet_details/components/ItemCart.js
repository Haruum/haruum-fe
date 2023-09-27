import { capitalizeWords } from "../../../utils/firebase/string";

function ItemCart({ quantity, item, subtotal }) {
  return (
    <div className="item-card">
      <h1>{quantity}</h1>
      <h1>{capitalizeWords(item)}</h1>
      <h1>Rp{subtotal}</h1>
    </div>
  )
}

export default ItemCart;