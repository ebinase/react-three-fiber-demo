import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const Earth = () => {
    const texture = useTexture("/src/assets/earth1024x512.png");
    const earthRef = useRef({} as Mesh);
    useFrame(() => {
    earthRef.current.rotation.y += 0.003;
    });
    return (
        <mesh ref={earthRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            map={texture}
            emissive={"white"}
            emissiveIntensity={0.01}
          />
        </mesh>
    );
};

export default Earth;