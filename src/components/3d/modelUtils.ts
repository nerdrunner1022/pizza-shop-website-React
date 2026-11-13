import { Box3, Object3D, Vector3 } from 'three';

export interface NormalizedModel {
  object: Object3D;
  scale: number;
  position: [number, number, number];
}

export const cloneAndNormalizeModel = (
  source: Object3D,
  targetSize: number,
  rotationX = 0,
  alignToFloor = false
): NormalizedModel => {
  const object = source.clone(true);
  object.rotation.x = rotationX;
  object.updateMatrixWorld(true);

  const bounds = new Box3().setFromObject(object);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const largestDimension = Math.max(size.x, size.y, size.z);
  const scale = targetSize / largestDimension;

  return {
    object,
    scale,
    position: [
      -center.x * scale,
      (alignToFloor ? -bounds.min.y : -center.y) * scale,
      -center.z * scale,
    ],
  };
};
