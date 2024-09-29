import { useState } from "react";
import ThreeBoxes from "./components/ThreeBoxes";

function App() {
  const [content, setContent] = useState("boxes");

  let canvas = <ThreeBoxes />;
  switch (content) {
    case "boxes":
      canvas = <ThreeBoxes />;
      break;
    default:
      canvas = <ThreeBoxes />;
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", zIndex: 100 }}>
        <button style={{backgroundColor: "none"}} onClick={() => setContent("boxes")}>BOXES</button>
      </div>
      <div id="canvas-container">
        {canvas}
      </div>
    </div>
  );
}

export default App;
