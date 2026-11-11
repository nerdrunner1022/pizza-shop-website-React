import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingIngredients: React.FC = () => {
  const tomatoesGroup = useRef<THREE.Group>(null);
  const basilGroup = useRef<THREE.Group>(null);
  const embersRef = useRef<THREE.Points>(null);

  // Procedural tomatoes
  const tomatoes = useMemo(
    () => [
      { initPos: [-1.8, 0.6, -0.6], speed: 1.1, offset: 0.2, rotSpeed: 0.8 },
      { initPos: [1.7, 0.8, -0.4], speed: 0.9, offset: 1.5, rotSpeed: 0.6 },
      { initPos: [-1.4, -0.8, 0.5], speed: 1.3, offset: 2.7, rotSpeed: -0.7 },
      { initPos: [1.6, -0.7, 0.4], speed: 0.85, offset: 3.8, rotSpeed: 0.5 },
      { initPos: [0.9, 1.3, -1.2], speed: 1.0, offset: 4.1, rotSpeed: -0.9 },
    ],
    []
  );

  // Procedural basil leaves
  const basilLeaves = useMemo(
    () => [
      { initPos: [-1.6, 1.2, 0.2], speed: 0.7, offset: 0.5, scale: 0.28 },
      { initPos: [1.8, -0.2, -0.8], speed: 0.8, offset: 1.9, scale: 0.25 },
      { initPos: [-0.9, -1.3, 0.6], speed: 0.6, offset: 3.2, scale: 0.26 },
      { initPos: [1.3, 1.1, 0.3], speed: 0.75, offset: 4.6, scale: 0.24 },
      { initPos: [-2.1, -0.3, -0.5], speed: 0.65, offset: 5.1, scale: 0.3 },
    ],
    []
  );

  // Wood-fired oven embers (spark particles)
  const [emberPositions, emberCount] = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
    }
    return [positions, count];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate floating tomatoes
    if (tomatoesGroup.current) {
      tomatoesGroup.current.children.forEach((child, i) => {
        const item = tomatoes[i];
        if (item) {
          child.position.y = item.initPos[1] + Math.sin(time * item.speed + item.offset) * 0.12;
          child.position.x = item.initPos[0] + Math.cos(time * 0.5 * item.speed + item.offset) * 0.08;
          child.rotation.x += 0.008 * item.rotSpeed;
          child.rotation.y += 0.012 * item.rotSpeed;
        }
      });
    }

    // Animate floating basil leaves
    if (basilGroup.current) {
      basilGroup.current.children.forEach((child, i) => {
        const item = basilLeaves[i];
        if (item) {
          child.position.y = item.initPos[1] + Math.sin(time * item.speed + item.offset) * 0.18;
          child.rotation.z = Math.sin(time * 0.8 + item.offset) * 0.3;
          child.rotation.y += 0.006;
        }
      });
    }

    // Animate glowing embers rising upward
    if (embersRef.current) {
      const positions = embersRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        // y index
        positions[i * 3 + 1] += 0.008;
        // if exceeds height, reset to bottom
        if (positions[i * 3 + 1] > 2.0) {
          positions[i * 3 + 1] = -2.0;
        }
      }
      embersRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Floating Cherry Tomatoes */}
      <group ref={tomatoesGroup}>
        {tomatoes.map((item, i) => (
          <group key={`tom-${i}`} position={item.initPos as [number, number, number]}>
            <mesh castShadow>
              <sphereGeometry args={[0.13, 20, 20]} />
              <meshStandardMaterial
                color="#C92518"
                roughness={0.25}
                metalness={0.1}
              />
            </mesh>
            {/* Green Stem Calyx */}
            <mesh position={[0, 0.12, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.06, 6]} />
              <meshStandardMaterial color="#3D7E2B" roughness={0.6} />
            </mesh>
            {/* 3 tiny green star leaf sepals */}
            <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.02, 0.07, 5]} />
              <meshStandardMaterial color="#3D7E2B" side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floating Sweet Basil Leaves */}
      <group ref={basilGroup}>
        {basilLeaves.map((leaf, i) => (
          <group
            key={`leaf-${i}`}
            position={leaf.initPos as [number, number, number]}
            scale={leaf.scale}
          >
            <mesh castShadow>
              <sphereGeometry args={[0.6, 12, 10, 0, Math.PI, 0, Math.PI / 2]} />
              <meshStandardMaterial
                color="#438D33"
                roughness={0.4}
                metalness={0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Oven Sparks & Embers Rising */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[emberPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#FF8A3D"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
