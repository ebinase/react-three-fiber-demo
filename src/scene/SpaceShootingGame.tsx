import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Mesh } from "three";
import Earth from "../components/space/Earth";
import Starship from "../components/space/Starship";
import Sun from "../components/space/Sun";
import FollowCamera from "../components/camera/FollowCamera";

const SpaceShootingGame: FC = () => {
  const starshipRef = useRef({} as Mesh);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    starshipRef.current.rotation.y += Math.sin(t) * 0.01;
  });

  return (
    <group>
      <color args={["#000"]} attach={"background"} />
      {/* 太陽光 */}
      <Sun position={[1000, 500, 1000]} />
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
      <Starship scale={0.2} ref={starshipRef} />
      <FollowCamera targetRef={starshipRef} />
    </group>
  );
};

export default SpaceShootingGame;
