import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";
import Earth from "../components/space/Earth";
import Starship from "../components/space/Starship";
import * as THREE from "three";

const Space: FC = () => {
  const starsRef = useRef({} as Group);
  const satelliteRef = useRef({} as Mesh);
  const starshipRef = useRef({} as Mesh);
  const { camera, size } = useThree();

  // 弾丸の位置
  const bulletRef = useRef({} as Mesh);
  const [isShooting, setIsShooting] = useState(false);

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


    // ====== 弾丸の処理 ======
    if (!isShooting) {
      // bulletの位置をstarshipの位置に合わせる
      bulletRef.current.position.set(
        starshipRef.current.position.x,
        starshipRef.current.position.y - 0.05,
        starshipRef.current.position.z
      );
    }

    // 現在の位置
    const currentPosition = bulletRef.current.position;

    // ターゲット方向ベクトルを計算
    const targetDiff = new THREE.Vector3().subVectors(
      satelliteRef.current.position,
      currentPosition
    );

    if (targetDiff.length() < .01) {
      setIsShooting(false);
      return;
    }

    const targetDirection = targetDiff.normalize();

    // 現在向いている方向ベクトル（前方）
    const currentDirection = new THREE.Vector3(0, 0, 1)
      .applyQuaternion(starshipRef.current.quaternion)
      .normalize();

    // 向きをターゲット方向に少しずつ変える（0.1ずつ）
    const maxTurnRate = 1; // 向きの変化率（1フレームごとに0.1ずつ）

    // 現在の向きからターゲット方向に少しずつ補間
    const newDirection = new THREE.Vector3()
      .lerpVectors(currentDirection, targetDirection, maxTurnRate)
      .normalize();

    // クォータニオンを使って、新しい向きに回転
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), newDirection); // 新しい方向に基づく回転を計算

    // 徐々に回転させる
    bulletRef.current.quaternion.slerp(quaternion, maxTurnRate);

    // 現在の向きに沿って移動
    const speed = .05; // 移動速度
    bulletRef.current.position.add(newDirection.multiplyScalar(speed));
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
      {/* 地球の上にテキストを表示 */}
      {/* <Text3D font="/Bangers-Regular.ttf" position={[0, 1, 0]} size={0.1}>
      {`Hello\nWorld`}
      </Text3D> */}
      {"hello"}

      {/* 自転する地球 */}
      <Earth />
      {/* 軌道上を回るキューブ */}
      <mesh ref={satelliteRef} position={[1.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshPhongMaterial emissive={"white"} emissiveIntensity={2} />
        <pointLight intensity={1.5} distance={10} decay={2} color={"white"} />
      </mesh>
      {/* 宇宙船 */}
      <mesh onClick={() => setIsShooting(!isShooting)}>
        <Starship scale={0.02} ref={starshipRef}  /> 
      </mesh>
    
      {/* 弾丸 */}
      <mesh ref={bulletRef} position={[0, 1, 0]}>
        <sphereGeometry args={[.01, 32, 32]} />
        <meshPhongMaterial
          color={"#3cd4e8"}
          transparent={true}
          opacity={0.7}
        />
        <pointLight intensity={1.5} distance={10} decay={2} color={"white"} />
      </mesh>
    </>
  );
};

export default Space;
