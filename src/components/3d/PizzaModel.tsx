import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { cloneAndNormalizeModel } from './modelUtils';

type PizzaModelVariant =
  | 'margherita'
  | 'diavola'
  | 'tartufata'
  | 'burrata'
  | 'quattro_formaggi'
  | 'dessert'
  | 'side'
  | 'drink';

interface PizzaModelProps {
  variant?: PizzaModelVariant;
  modelAsset?: keyof typeof MODEL_ASSETS;
  scale?: number;
  rotationSpeed?: number;
  isInteractive?: boolean;
  tiltAngle?: number;
  initialRotationY?: number;
  alignToFloor?: boolean;
}

const MODEL_ASSETS = {
  classic: new URL('../../models/pizza_napoletana.glb', import.meta.url).href,
  spicy: new URL('../../models/pizza_bigboss_pancho.glb', import.meta.url).href,
  realistic: new URL('../../models/pizza_realistic.glb', import.meta.url).href,
  cheese: new URL('../../models/pizza.glb', import.meta.url).href,
};

const MODEL_BY_VARIANT: Record<PizzaModelVariant, keyof typeof MODEL_ASSETS> = {
  margherita: 'classic',
  diavola: 'spicy',
  tartufata: 'realistic',
  burrata: 'cheese',
  quattro_formaggi: 'classic',
  dessert: 'classic',
  side: 'classic',
  drink: 'classic',
};

const MODEL_ROTATION_X: Record<keyof typeof MODEL_ASSETS, number> = {
  classic: 0,
  spicy: 0,
  realistic: 0,
  cheese: 0,
};

export const PizzaModel: React.FC<PizzaModelProps> = ({
  variant = 'margherita',
  modelAsset,
  scale = 1,
  rotationSpeed = 0.3,
  isInteractive = true,
  tiltAngle = 0.2,
  initialRotationY = 0,
  alignToFloor = true,
}) => {
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const asset = modelAsset ?? MODEL_BY_VARIANT[variant];
  const { scene } = useGLTF(MODEL_ASSETS[asset]);
  const normalizedModel = useMemo(
    () => cloneAndNormalizeModel(scene, 2.5, MODEL_ROTATION_X[asset], alignToFloor),
    [scene, asset, alignToFloor]
  );

  useFrame((state, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * rotationSpeed;

    if (isInteractive && tiltRef.current) {
      const mouseX = (state.pointer.x * Math.PI) / 24;
      const mouseY = (-state.pointer.y * Math.PI) / 24;
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltRef.current.rotation.x,
        tiltAngle + mouseY,
        0.05
      );
      tiltRef.current.rotation.z = THREE.MathUtils.lerp(
        tiltRef.current.rotation.z,
        -mouseX * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={tiltRef} rotation={[tiltAngle, 0, 0]} scale={scale} dispose={null}>
      <group ref={spinRef} rotation={[0, initialRotationY, 0]}>
        <group position={normalizedModel.position} scale={normalizedModel.scale}>
          <primitive object={normalizedModel.object} />
        </group>
      </group>
    </group>
  );
};
