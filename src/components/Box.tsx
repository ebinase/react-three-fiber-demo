import { MeshProps, useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Mesh } from "three";

const Box: FC = (props: MeshProps) => {
  const ref = useRef({} as Mesh);
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Box;
