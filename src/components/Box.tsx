import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Mesh } from "three";

const Box: FC = () => {
  const ref = useRef({} as Mesh);
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Box;
