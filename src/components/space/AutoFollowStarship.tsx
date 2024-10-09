import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, RefObject, useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";

type Props = {
  targetRef: RefObject<THREE.Object3D>;
  scale?: number;
};

const AutoFollowStarship: FC<Props> = ({ targetRef, scale = 1.0 }) => {
  // download from https://market.pmnd.rs/model/low-poly-spaceship
  const { scene: starshipModel } = useGLTF("/starship.gltf");
  const starshipRef = useRef({} as Mesh);
  useFrame(() => {
    if (!targetRef.current) return;

    // 現在の位置
    const currentPosition = starshipRef.current.position;

    // ターゲット方向ベクトルを計算
    const targetDirection = new THREE.Vector3()
    .subVectors(targetRef.current.position, currentPosition)
    .normalize();
    
    // 現在向いている方向ベクトル（前方）
    const currentDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(starshipRef.current.quaternion).normalize();


    const maxTurnRate = 1;

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
    <primitive object={starshipModel} scale={scale} ref={starshipRef}>
      <mesh rotation={[(Math.PI * 3) / 2, 0, 0]} position={[0, -0.44, -2]}>
        <coneGeometry args={[0.2, 1]} />
        <meshPhongMaterial
          color={"#3cd4e8"}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      <pointLight
        position={[0, 0.5, -5]}
        intensity={50 * scale}
        distance={4.25 * scale}
        color={"#3cd4e8"}
      />
    </primitive>
  );
};

export default AutoFollowStarship;
