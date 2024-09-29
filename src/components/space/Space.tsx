import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Group } from "three";

const Space: FC = () => {
  const ref = useRef({} as Group);
  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });
  return (
    <>
      <color args={["#000"]} attach={"background"} />
      <directionalLight position={[0, 0, 500]} color={"0xffffff"} />
      <OrbitControls />
      <group ref={ref}>
        <Stars />
        <Sphere></Sphere>
      </group>
    </>
  );
};

export default Space;
