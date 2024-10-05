import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Mesh } from "three";
import Earth from "../components/space/Earth";
import Starship from "../components/space/Starship";
import Sun from "../components/space/Sun";

const SpaceShootingGame: FC = () => {
  const starshipRef = useRef({} as Mesh);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    starshipRef.current.position.y += 0.001 * Math.sin(t);
  });

  return (
    <>
      <color args={["#000"]} attach={"background"} />
      {/* 太陽光 */}
      <Sun position={[1000, 500, 1000]} />
      <OrbitControls />
      {/* 裏側も見えるようにするためのライト */}
      <directionalLight
        position={[-100, -50, -100]}
        intensity={0.5}
        color={"white"}
      />
      {/* 背景の星たち */}
      <Stars />
      {/* 自転する地球 */}
      <Earth />
      {/* 宇宙船 */}
      <Starship scale={.2} ref={starshipRef} />
    </>
  );
};

export default SpaceShootingGame;
