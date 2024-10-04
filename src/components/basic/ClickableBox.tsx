import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

const ClickableBox = (props: MeshProps) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const ref = useRef({} as Mesh);
  useFrame(() => {
    ref.current.rotation.x += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => setClicked(!clicked)}
      scale={clicked ? 2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={hovered ? "orange" : "hotpink"} />
    </mesh>
  );
};

export default ClickableBox;
