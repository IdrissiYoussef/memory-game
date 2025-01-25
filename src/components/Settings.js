export default function Settings({ onModeChange, onBgChange }) {
  return (
    <div className="card p-3">
      <h4>Settings</h4>
      <div className="mb-3">
        <label className="form-label">Game Mode:</label>
        <select
          className="form-select"
          onChange={(e) => onModeChange(parseInt(e.target.value))}
        >
          <option value={4}>4 Cards</option>
          <option value={16} selected>
            16 Cards
          </option>
          <option value={32}>32 Cards</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Background Color:</label>
        <input
          type="color"
          className="form-control form-control-color"
          onChange={(e) => onBgChange(e.target.value)}
        />
      </div>
    </div>
  );
}
