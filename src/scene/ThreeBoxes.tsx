import ClickableBox from "../components/basic/ClickableBox";
import { OrbitControls } from "@react-three/drei";

const ThreeBoxes = () => {
  return (
    <>
      <color args={["#5bbee5"]} attach={"background"} />
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <ClickableBox position={[-2, 0, 0]} />
      <ClickableBox position={[0, 0, 0]} />
      <ClickableBox position={[2, 0, 0]} />
    </>
  );
};

export default ThreeBoxes;
