import { Canvas } from "@react-three/fiber";
import Space from "./scene/Space";
import React from "react";
import ThreeBoxes from "./scene/ThreeBoxes";
import { match } from "ts-pattern";
import { Stats } from "@react-three/drei";
import NoContent from "./scene/NoContent";

function App() {
  const [worldNum, setWorldNum] = React.useState(0);
  const [devMode, setDevMode] = React.useState(false);

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 m-4 z-10 opacity-0 hover:opacity-100 flex gap-2">
        <button
          className={`p-2 rounded-md text-white ${devMode ? 'bg-gray-500/70' : 'bg-gray-500/30'}`}
          onClick={() => setDevMode(!devMode)}
        >
          DEV MODE
        </button>
        <button
          className="p-2 bg-gray-500/30 rounded-md text-white"
          onClick={() => setWorldNum(worldNum + 1)}
        >
          NEXT
        </button>
      </div>
      <div id="canvas-container">
        <Canvas
          camera={{ fov: 70, near: 0.1, far: 2000 }}
          style={{ width: "100dvw", height: "100dvh" }}
        >
          {devMode && (
            <>
              {/** @see https://threejs.org/docs/index.html#api/en/helpers/AxesHelper */}
              <axesHelper args={[5]} />
              {/* FPS表示 */}
              <Stats />
            </>
          )}

          {match(worldNum % 3)
            .with(0, () => <Space />)
            .with(1, () => <ThreeBoxes />)
            .otherwise(() => <NoContent />)}
        </Canvas>
      </div>
    </div>
  );
}

export default App;
