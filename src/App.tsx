import ThreeBoxes from "./components/ThreeBoxes";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <div id="canvas-container">
        <Canvas
          camera={{ fov: 70, near: 0.1, far: 2000 }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <ThreeBoxes />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
