import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Box from "./Box";

const ThreeBoxes: FC = () => {
  return (
   <Canvas
          camera={{ fov: 70, near: 0.1, far: 2000 }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <color args={["#5bbee5"]} attach={"background"} />
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} />
          <Box position={[-2, 0, 0]} />
          <Box position={[0, 0, 0]} />
          <Box position={[2, 0, 0]} />
        </Canvas>
  );
};

export default ThreeBoxes;
