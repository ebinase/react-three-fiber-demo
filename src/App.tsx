import { Canvas } from "@react-three/fiber";
import Space from "./components/space/Space";
import React from "react";
import ThreeBoxes from "./components/ThreeBoxes";

function App() {
  const [workNum, setWorkNum] = React.useState(1);

  return (
    <div className="relative">
      <button
        className="absolute top-0 right-0 m-4 p-2 bg-gray-500 text-white z-10"
        onClick={() => setWorkNum(workNum + 1)}
      >
        切り替え
      </button>
      <div id="canvas-container">
        {workNum ? (
          <Canvas
            camera={{ fov: 70, near: 0.1, far: 2000 }}
            className="w-[100vw] h-[100vh]"
          >
            <Space />
          </Canvas>
        ) : (
          <Canvas
            camera={{ fov: 70, near: 0.1, far: 2000 }}
            className="w-[100vw] h-[100vh]"
          >
            <ThreeBoxes />
          </Canvas>
        )}
      </div>
    </div>
  );
}

export default App;
