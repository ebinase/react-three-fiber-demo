import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Mesh } from "three";

type Props = {
  scale?: number;
};

const Starship = forwardRef<Mesh, Props>(({ scale = 1.0 }, ref = null) => {
  // download from https://market.pmnd.rs/model/low-poly-spaceship
  const { scene: starshipModel } = useGLTF("/src/assets/starship.gltf");
  return (
    <group>
      <primitive object={starshipModel} scale={scale} ref={ref}>
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
    </group>
  );
});

export default Starship;
