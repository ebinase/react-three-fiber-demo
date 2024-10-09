import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import { Object3D, Vector3 } from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

type Props = {
  targetRef: RefObject<Object3D>;
}

// ターゲットを自動追尾するユーザー操作可能なカメラ
const AutoFollowOrbitCamera: React.FC<Props> = ({ targetRef }) => {
  const controlRef = useRef<OrbitControlsType>(null);

  useFrame(() => {
    if (targetRef.current && controlRef.current) {
      // targetの少し上の位置を追従
      controlRef.current.target = targetRef.current.clone().position.add(new Vector3(0, .7, 0));
      controlRef.current.update();
    }
  });

  return <OrbitControls ref={controlRef} maxDistance={3} />;
}

export default AutoFollowOrbitCamera;