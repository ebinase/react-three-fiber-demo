import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Mesh } from "three";

type Props = {
  scale?: number;
}

const Starship = forwardRef<Mesh, Props>(({scale = 1.0}, ref = null) => {
	// download from https://market.pmnd.rs/model/low-poly-spaceship
	const { scene: starshipModel } = useGLTF('/src/assets/starship.gltf');
	return (
		<primitive object={starshipModel} scale={scale} ref={ref}/>
	);
});

export default Starship;