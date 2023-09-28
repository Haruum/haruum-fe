function Button({ text, onClick, className }) {
  return (
    <button className={className ?? "confirm-button"} onClick={onClick} style={{ border: 0 }}>
      {text}
    </button>
  )
}

export default Button;