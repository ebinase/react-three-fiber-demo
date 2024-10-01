import { Canvas } from "@react-three/fiber";
import Space from "./components/space/Space";
import React from "react";
import ThreeBoxes from "./components/ThreeBoxes";
import { match } from "ts-pattern";

function App() {
  const [worldNum, setWorldNum] = React.useState(0);

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 m-4 z-10 opacity-0 hover:opacity-100 flex gap-2">
        <button
        className="p-2 bg-gray-500/30 rounded-md text-white  "
        onClick={() => setWorldNum(worldNum + 1)}
      >
        NEXT
      </button>
      </div> 
      <div id="canvas-container">
        {match(worldNum % 2)
          .with(0, () => (
            <Canvas
              camera={{ fov: 70, near: 0.1, far: 2000 }}
              style={{ width: "100vw", height: "100vh" }}
            >
              <Space />
            </Canvas>
          ))
          .with(1, () => (
            <Canvas
              camera={{ fov: 70, near: 0.1, far: 2000 }}
              style={{ width: "100vw", height: "100vh" }}
            >
              <ThreeBoxes />
            </Canvas>
          ))
          .otherwise(() => (
            <h1 className="text-4xl text-center">ERROR!!</h1>
          ))}
      </div>
    </div>
  );
}

export default App;
