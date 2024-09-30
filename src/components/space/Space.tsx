import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Group } from "three";

const Space: FC = () => {
  const earthRef = useRef({} as Group);
  const starsRef = useRef({} as Group);
  useFrame(() => {
    earthRef.current.rotation.y += 0.003;
    starsRef.current.rotation.y += 0.0003;
  });
  const texture = useTexture("/src/assets/earch1024x512.png");
  return (
    <>
      <color args={["#000"]} attach={"background"} />
      <OrbitControls />
      {/* 太陽光 */}
      <directionalLight
        position={[100, 50, 100]}
        intensity={7}
        color={"white"}
      />
      {/* 裏側も見えるようにするためのライト */}
      <directionalLight
        position={[-100, -50, -100]}
        intensity={0.5}
        color={"white"}
      />
      {/* 背景の星たち */}
      <group ref={starsRef}>
        <Stars />
      </group>
      {/* 自転する地球 */}
      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial map={texture} emissive={"white"} emissiveIntensity={0.01} />
        </mesh>
      </group>
    </>
  );
};

export default Space;
