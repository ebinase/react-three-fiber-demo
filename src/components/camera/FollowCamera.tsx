import { useFrame } from "@react-three/fiber";
import { RefObject } from "react";
import { Object3D, Vector3 } from "three";

type Props = {
  targetRef: RefObject<Object3D>;
}

// ターゲットを後方の固定位置から追従するカメラ
const FollowCamera: React.FC<Props> = ({ targetRef }) => {
  // カメラがオブジェクトの後方に来るオフセット
  const cameraOffset = new Vector3(0, .2, -1.5);
  const tempVec = new Vector3();

  useFrame(({camera}) => {
    if (targetRef.current) {
      // ターゲットのクォータニオンを取得
      const targetQuaternion = targetRef.current.quaternion;

      // カメラのオフセット位置を計算 (オブジェクトの後方)
      tempVec.copy(cameraOffset).applyQuaternion(targetQuaternion);
      camera.position.copy(targetRef.current.position).add(tempVec);

      // カメラに適用
      camera.lookAt(targetRef.current.position);
    }
  });

  return null;
}

export default FollowCamera;