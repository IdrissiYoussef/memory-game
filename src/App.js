import { useState } from "react";
import Game from "./pages/Game";
import Settings from "./components/Settings";
import History from "./components/History";

export default function App() {
  const [mode, setMode] = useState(16);
  const [bg, setBg] = useState("#ffffff");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const handleGameEnd = (newHistory) => {
    setHistory(newHistory);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setHistory([]); // Clear history state
    localStorage.setItem("history", JSON.stringify([])); // Clear storage history
  };

  return (
    <div
      className="container py-4"
      style={{ background: bg, minHeight: "100vh" }}
    >
      <h1 className="text-center mb-4">Memory Card Game</h1>
      <div className="row">
        <div className="col-md-4">
          <Settings onModeChange={handleModeChange} onBgChange={setBg} />
        </div>
        <div className="col-md-8">
          <Game mode={mode} onGameEnd={handleGameEnd} />
        </div>
      </div>
      <History history={history} />
    </div>
  );
}
