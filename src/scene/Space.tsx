import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Group, Mesh, Vector3 } from "three";
import Earth from "../components/space/Earth";
import Starship from "../components/space/Starship";

const Space: FC = () => {
  const starsRef = useRef({} as Group);
  const satelliteRef = useRef({} as Mesh);
  const starshipRef = useRef({} as Mesh);
  const { camera, size } = useThree();
  useFrame((state) => {
    starsRef.current.rotation.y += 0.0003;

    const t = state.clock.getElapsedTime();
    satelliteRef.current.position.x = 1.2 * Math.cos(t);
    satelliteRef.current.position.z = 1.2 * Math.sin(t);
    satelliteRef.current.lookAt(0, 0, 0);

    // スクリーン座標での位置（例えば、右下に固定したい場合）
    const screenX = size.width * 0.5;
    const screenY = size.height * (0.8 + 0.02 * Math.sin(t));

    // スクリーン座標をワールド座標に変換
    const vector = new Vector3(
      (screenX / size.width) * 2 - 1,
      -(screenY / size.height) * 2 + 1,
      0
    ).unproject(camera);

    // モデルの位置を更新
    starshipRef.current.position.set(vector.x, vector.y, vector.z);
    starshipRef.current.lookAt(0, 0, 0);
  });

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
      <Earth />
      {/* 軌道上を回るキューブ */}
      <mesh ref={satelliteRef} position={[1.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshPhongMaterial emissive={"white"} emissiveIntensity={2} />
        <pointLight intensity={1.5} distance={10} decay={2} color={"white"} />
      </mesh>
      {/* 宇宙船 */}
      <Starship scale={0.02} ref={starshipRef} />
    </>
  );
};

export default Space;
