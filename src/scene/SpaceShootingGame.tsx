import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef, useState } from "react";
import { Mesh } from "three";
import Earth from "../components/space/Earth";
import Starship from "../components/space/Starship";
import Sun from "../components/space/Sun";
import FollowCamera from "../components/camera/FollowCamera";
import * as THREE from "three";

const SpaceShootingGame: FC = () => {
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));
  const starshipRef = useRef({} as Mesh);
  useFrame(() => {
    // 現在の位置
    const currentPosition = starshipRef.current.position;

    // ターゲット方向ベクトルを計算
    const targetDiff = new THREE.Vector3().subVectors(targetPosition, currentPosition);

    if (targetDiff.length() < 1.5) {
      setTargetPosition(new THREE.Vector3(
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
      ));
      return;
    }
    
    const targetDirection = targetDiff.normalize();
    
    // 現在向いている方向ベクトル（前方）
    const currentDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(starshipRef.current.quaternion).normalize();

    // 向きをターゲット方向に少しずつ変える（0.1ずつ）
    const maxTurnRate = .1; // 向きの変化率（1フレームごとに0.1ずつ）

    // 現在の向きからターゲット方向に少しずつ補間
    const newDirection = new THREE.Vector3().lerpVectors(currentDirection, targetDirection, maxTurnRate).normalize();

    // クォータニオンを使って、新しい向きに回転
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), newDirection); // 新しい方向に基づく回転を計算

    // 徐々に回転させる
    starshipRef.current.quaternion.slerp(quaternion, maxTurnRate);

    // 現在の向きに沿って移動
    const speed = 0.05; // 移動速度
    starshipRef.current.position.add(newDirection.multiplyScalar(speed));
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
