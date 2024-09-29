import { Canvas } from "@react-three/fiber";
import Space from "./components/space/Space";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <div id="canvas-container">
        <Canvas
          camera={{ fov: 70, near: 0.1, far: 2000 }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <Space />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
