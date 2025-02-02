import {
  OrbitControls,
  Stars,
  Text,
  Sparkles,
  useTexture,
  Html,
} from "@react-three/drei";
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

  // ターゲット
  const texture = useTexture("/dragon.png");
  const targetRef1 = useRef({} as Mesh);
  const [targets, setTargets] = useState([
    { ref: satelliteRef, alive: true },
    { ref: targetRef1, alive: true },
  ]);

  const aliveTargets = targets.filter((target) => target.alive);

  // シーン管理
  const messageRef = useRef({} as Group<THREE.Object3DEventMap>);

  useFrame((state) => {
    // ====== 背景の星の回転 ======
    starsRef.current.rotation.y += 0.0003;

    // ====== 衛星の回転 ======
    const t = state.clock.getElapsedTime();
    if (satelliteRef.current) {
      satelliteRef.current.position.x = 1.2 * Math.cos(t);
      satelliteRef.current.position.z = 1.2 * Math.sin(t);
      satelliteRef.current.lookAt(starshipRef.current.position);
    }

    // ====== メッセージ表示処理 ======
    if (
      targets.every((target) => !target.alive) &&
      messageRef.current.scale.x < 1
    ) {
      messageRef.current.scale.addScalar(0.005);
    }

    // ====== 宇宙船の位置をカメラと同期 ======
    // スクリーン座標での位置
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

    // 原点(=地球の中心)からの距離を計算
    const earthDiff = new THREE.Vector3().subVectors(
      new THREE.Vector3(),
      currentPosition
    );

    // ターゲット方向ベクトルを計算
    const currentTarget = aliveTargets[0];
    const targetDiff = new THREE.Vector3().subVectors(
      currentTarget?.ref.current.position ?? new THREE.Vector3(),
      currentPosition
    );

    // ターゲットに衝突したら、撃墜判定
    if (targetDiff.length() < 0.05) {
      console.log("HIT!");
      setTargets(
        targets.map((target) =>
          target.ref === currentTarget.ref
            ? { ...target, alive: false }
            : target
        )
      );
    }

    // 弾丸が地球もしくはターゲットに衝突したら、弾丸を消す
    if (earthDiff.length() < 1 || targetDiff.length() < 0.01) {
      setIsShooting(false);
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
    const speed = 0.05; // 移動速度
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

      {/* Drei の Html コンポーネントを利用して、固定オーバーレイを作成 */}
      {/* 要素を傾け、さらにすこし上下に揺らす */}
      <Html fullscreen>
        <div
          style={{
            position: 'absolute',
            top: "1vh",
            left: "1vw",
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontSize: '12px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid white',
          }}
        >
          <h1>すべてのターゲットを倒せ！</h1>
          <p>宇宙船を長押しで操作し、クリックで追尾弾を発射</p>
        </div>
      </Html>

      <group scale={0} ref={messageRef}>
        {/* 巨大メッセージ */}
        <Text
          position={[0, 0, -200]}
          color={"white"}
          fontSize={40}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {"HAPPY BIRTHDAY\n\nYOSHIDA 2025"}
        </Text>

        <Text
          position={[0, 0, 200]}
          // 反転させる
          rotation={[0, Math.PI, 0]}
          color={"white"}
          fontSize={40}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {"HAPPY BIRTHDAY\n\nYOSHIDA 2025"}
        </Text>
        <Text
          position={[200, 0, 0]}
          rotation={[0, Math.PI*3/2, 0]}
          color={"white"}
          fontSize={40}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {"HAPPY BIRTHDAY\n\nYOSHIDA 2025"}
        </Text>
        <Text
          position={[-200, 0, 0]}
          rotation={[0, Math.PI/2, 0]}
          color={"white"}
          fontSize={40}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {"HAPPY BIRTHDAY\n\nYOSHIDA 2025"}
        </Text>

        {/* スパークル */}
        <Sparkles
          count={1000}
          color={""}
          size={40}
          opacity={0.5}
          scale={20}
          speed={0.7}
        />
      </group>

      {/* 自転する地球 */}
      <Earth />

      {/* ターゲット */}
      {targets.find((target) => target.ref.current === targetRef1.current)?.alive && (
        <mesh position={[0, 1, 0]} ref={targetRef1}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshPhongMaterial
          map={texture}
          emissive={"bule"}
          emissiveIntensity={0.1}
        />
      </mesh>
      )}

      {/* 軌道上を回るキューブ */}
      {targets.find((target) => target.ref.current === satelliteRef.current)?.alive && (
        <mesh ref={satelliteRef} position={[1.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshPhongMaterial
          map={texture}
          emissive={"bule"}
          emissiveIntensity={0.1}
        />
        <pointLight intensity={1.5} distance={10} decay={2} color={"white"} />
      </mesh>
      )}

      {/* 宇宙船 */}
      <mesh onClick={() => setIsShooting(!isShooting)}>
        <Starship scale={0.02} ref={starshipRef} />
      </mesh>

      {/* 弾丸 */}
      <mesh ref={bulletRef} position={[0, 1, 0]}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshPhongMaterial color={"#3cd4e8"} transparent={true} opacity={0.7} />
        <pointLight intensity={15} distance={2} decay={2} color={"#3cd4e8"} />
      </mesh>
    </>
  );
};

export default Space;
