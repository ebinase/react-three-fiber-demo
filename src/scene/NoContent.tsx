import { OrbitControls, Text } from "@react-three/drei";

const NoContent = () => {
  return (
    <>
      <Text
        color="white"
        fontSize={0.5}
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        NO CONTENT
      </Text>
      <OrbitControls />
    </>
  );
};

export default NoContent;
