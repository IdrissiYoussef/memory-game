export default function Card({ value, onClick }) {
  return (
    <button
      className="btn btn-lg btn-outline-dark"
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {value}
    </button>
  );
}
