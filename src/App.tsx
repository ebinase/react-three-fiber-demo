import { Canvas } from "@react-three/fiber";
import Box from "./components/Box";

function App() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ fov: 70, near: 0.1, far: 2000 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <Box position={[-2, 0, 0]} />
        <Box position={[0, 0, 0]} />
        <Box position={[2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
