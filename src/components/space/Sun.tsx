import { MeshProps } from "@react-three/fiber";

const Sun = (props: MeshProps) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[10, 32, 32]} />
      <meshPhongMaterial
        emissive={"orange"}
        emissiveIntensity={50}
      />
       <directionalLight
        intensity={7}
        color={"white"}
      />
    </mesh>
  );
};

export default Sun;
