export default function History({ history }) {
  return (
    <div className="card p-3 mt-4">
      <h4>Game History</h4>
      {history.length === 0 ? (
        <p className="text-muted">No previous games recorded.</p>
      ) : (
        <ul className="list-group">
          {history.map((game, idx) => (
            <li key={idx} className="list-group-item">
              <strong>Score:</strong> {game.score} |<strong> Time:</strong>{" "}
              {game.time}s |<strong> Moves:</strong> {game.moves}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
