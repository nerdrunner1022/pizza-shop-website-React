import React, { Suspense, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { cloneAndNormalizeModel, type NormalizedModel } from './modelUtils';

const TOMATO_LAYOUT: Omit<FloatingTomatoProps, 'model'>[] = [
  { initPos: [-1.8, 0.6, -0.6], speed: 1.1, offset: 0.2, rotationSpeed: 0.8 },
  { initPos: [1.7, 0.8, -0.4], speed: 0.9, offset: 1.5, rotationSpeed: 0.6 },
  { initPos: [-1.4, -0.8, 0.5], speed: 1.3, offset: 2.7, rotationSpeed: -0.7 },
  { initPos: [1.6, -0.7, 0.4], speed: 0.85, offset: 3.8, rotationSpeed: 0.5 },
  { initPos: [0.9, 1.3, -1.2], speed: 1, offset: 4.1, rotationSpeed: -0.9 },
];

const MOBILE_TOMATO_LAYOUT: Omit<FloatingTomatoProps, 'model'>[] = [
  { initPos: [-0.95, 0.45, -0.5], speed: 1.1, offset: 0.2, rotationSpeed: 0.8 },
  { initPos: [0.95, 0.45, -0.4], speed: 0.9, offset: 1.5, rotationSpeed: 0.6 },
  { initPos: [-0.7, 0.25, 0.3], speed: 1.3, offset: 2.7, rotationSpeed: -0.7 },
  { initPos: [0.7, 0.2, 0.4], speed: 0.85, offset: 3.8, rotationSpeed: 0.5 },
];

interface FloatingTomatoProps {
  model: NormalizedModel;
  initPos: [number, number, number];
  speed: number;
  offset: number;
  rotationSpeed: number;
}

const FloatingTomato: React.FC<FloatingTomatoProps> = ({
  model,
  initPos,
  speed,
  offset,
  rotationSpeed,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const tomato = useMemo(() => model.object.clone(true), [model]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();
    group.position.y = initPos[1] + Math.sin(time * speed + offset) * 0.12;
    group.position.x = initPos[0] + Math.cos(time * 0.5 * speed + offset) * 0.08;
    group.rotation.x += 0.008 * rotationSpeed;
    group.rotation.y += 0.012 * rotationSpeed;
  });

  return (
    <group ref={groupRef} position={initPos}>
      <group position={model.position} scale={model.scale}>
        <primitive object={tomato} />
      </group>
    </group>
  );
};

const FloatingIngredientsScene: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const embersRef = useRef<THREE.Points>(null);
  const { scene } = useGLTF(new URL('../../models/tomato.glb', import.meta.url).href);
  const tomatoModel = useMemo(
    () => cloneAndNormalizeModel(scene, 0.3),
    [scene]
  );
  const emberPositions = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  useFrame(() => {
    const positions = embersRef.current?.geometry.attributes.position;
    if (!positions) return;

    const values = positions.array as Float32Array;
    for (let i = 0; i < values.length; i += 3) {
      values[i + 1] += 0.008;
      if (values[i + 1] > 2) values[i + 1] = -2;
    }
    positions.needsUpdate = true;
  });

  return (
    <group>
      {(isMobile ? MOBILE_TOMATO_LAYOUT : TOMATO_LAYOUT).map((tomato, index) => (
        <FloatingTomato key={index} {...tomato} model={tomatoModel} />
      ))}
      {!isMobile && (
        <points ref={embersRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[emberPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#FF8A3D"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
};

export const FloatingIngredients: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
  <Suspense fallback={null}>
    <FloatingIngredientsScene isMobile={isMobile} />
  </Suspense>
);
