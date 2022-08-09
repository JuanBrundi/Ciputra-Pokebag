export default ({ onClick, text, reverse }) => <button onClick={onClick} className={`${reverse ? "reverse" : "custom-btn"}`}>
  <span>{text}</span>
</button>