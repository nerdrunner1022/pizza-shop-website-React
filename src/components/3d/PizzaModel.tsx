import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PizzaModelProps {
  variant?: 'margherita' | 'diavola' | 'tartufata' | 'burrata' | 'quattro_formaggi';
  scale?: number;
  rotationSpeed?: number;
  isInteractive?: boolean;
}

export const PizzaModel: React.FC<PizzaModelProps> = ({
  variant = 'margherita',
  scale = 1,
  rotationSpeed = 0.35,
  isInteractive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0.45, y: 0 });

  // Procedural toppings layout based on variant
  const toppingsData = useMemo(() => {
    // Basil leaves coordinates
    const basilLeaves = [
      { pos: [0.15, 0.16, 0.1], rot: [0.1, 0.4, 0.2], scale: 0.22 },
      { pos: [-0.2, 0.16, -0.15], rot: [-0.1, -0.6, -0.2], scale: 0.24 },
      { pos: [0.35, 0.16, -0.2], rot: [0.2, 1.2, 0.1], scale: 0.2 },
      { pos: [-0.3, 0.16, 0.25], rot: [-0.15, -1.1, 0.3], scale: 0.22 },
      { pos: [0.0, 0.17, 0.35], rot: [0.1, 2.1, -0.1], scale: 0.21 },
      { pos: [0.0, 0.18, -0.05], rot: [0.05, 0.8, 0.1], scale: 0.26 },
    ];

    // Mozzarella pools coordinates & radii
    const mozzarellaBlobs = [
      { pos: [-0.25, 0.14, -0.25], rx: 0.24, rz: 0.28, rot: 0.4 },
      { pos: [0.28, 0.14, -0.2], rx: 0.26, rz: 0.22, rot: -0.3 },
      { pos: [-0.3, 0.14, 0.2], rx: 0.27, rz: 0.25, rot: 0.8 },
      { pos: [0.25, 0.14, 0.25], rx: 0.25, rz: 0.27, rot: -0.6 },
      { pos: [0.0, 0.15, 0.0], rx: 0.34, rz: 0.32, rot: 0.2 },
      { pos: [-0.05, 0.14, -0.4], rx: 0.22, rz: 0.2, rot: 1.1 },
      { pos: [0.42, 0.14, 0.05], rx: 0.2, rz: 0.22, rot: 0.7 },
      { pos: [-0.42, 0.14, -0.02], rx: 0.22, rz: 0.21, rot: -0.5 },
    ];

    // Pepperoni / Spianata slices coordinates (for diavola / all variants)
    const salamiSlices = [
      { pos: [0.32, 0.155, 0.18], rot: [0.05, 0.5, 0.05], size: 0.18 },
      { pos: [-0.32, 0.155, -0.18], rot: [-0.04, -0.3, 0.02], size: 0.19 },
      { pos: [0.18, 0.155, -0.32], rot: [0.06, 1.1, -0.03], size: 0.17 },
      { pos: [-0.18, 0.155, 0.32], rot: [-0.05, 0.9, 0.04], size: 0.18 },
      { pos: [-0.4, 0.155, 0.15], rot: [0.02, -1.2, 0.06], size: 0.17 },
      { pos: [0.38, 0.155, -0.15], rot: [-0.03, 1.8, -0.02], size: 0.18 },
      { pos: [0.02, 0.158, -0.18], rot: [0.04, 0.2, -0.05], size: 0.18 },
      { pos: [-0.02, 0.158, 0.22], rot: [-0.03, -0.7, 0.03], size: 0.19 },
    ];

    // Mushrooms / Truffle pieces (for tartufata)
    const mushroomSlices = [
      { pos: [0.22, 0.158, 0.22], rot: [0.1, 0.7, 0.1], size: 0.14 },
      { pos: [-0.22, 0.158, -0.22], rot: [-0.1, -0.4, 0.2], size: 0.15 },
      { pos: [0.15, 0.158, -0.3], rot: [0.2, 1.5, -0.1], size: 0.13 },
      { pos: [-0.28, 0.158, 0.1], rot: [-0.15, 0.2, 0.1], size: 0.14 },
      { pos: [0.3, 0.158, -0.1], rot: [0.1, -1.1, -0.2], size: 0.15 },
      { pos: [-0.1, 0.16, 0.32], rot: [0.05, 2.2, 0.1], size: 0.13 },
      { pos: [0.0, 0.162, 0.12], rot: [0.12, 0.9, 0.0], size: 0.16 },
    ];

    // Charred spots on the crust (leopard spotting)
    const charredSpots = [
      { pos: [0.92, 0.14, 0.2], scale: [0.08, 0.03, 0.12], rot: 0.3 },
      { pos: [-0.88, 0.15, -0.25], scale: [0.1, 0.04, 0.09], rot: -0.6 },
      { pos: [0.3, 0.16, 0.9], scale: [0.12, 0.03, 0.07], rot: 0.9 },
      { pos: [-0.35, 0.15, -0.88], scale: [0.07, 0.03, 0.11], rot: -0.4 },
      { pos: [0.75, 0.15, -0.55], scale: [0.09, 0.04, 0.08], rot: 1.2 },
      { pos: [-0.7, 0.14, 0.62], scale: [0.11, 0.03, 0.1], rot: -1.1 },
      { pos: [0.65, 0.15, 0.68], scale: [0.08, 0.03, 0.09], rot: 0.7 },
      { pos: [-0.62, 0.16, -0.7], scale: [0.1, 0.04, 0.08], rot: -0.8 },
      { pos: [0.0, 0.17, 0.95], scale: [0.07, 0.03, 0.12], rot: 0.1 },
      { pos: [0.05, 0.16, -0.94], scale: [0.09, 0.03, 0.1], rot: -0.2 },
    ];

    return { basilLeaves, mozzarellaBlobs, salamiSlices, mushroomSlices, charredSpots };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth subtle continuous idle spin
    groupRef.current.rotation.y += delta * rotationSpeed;

    // Parallax tilt from mouse if interactive
    if (isInteractive) {
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (-state.pointer.y * Math.PI) / 12;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.5 + mouseY,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouseX * 0.5,
        0.05
      );
    }
  });

  // Base sauce color according to variant
  const sauceColor = useMemo(() => {
    if (variant === 'tartufata') return '#2A241E'; // truffle mushroom cream
    if (variant === 'quattro_formaggi') return '#EADDC7'; // white base
    return '#A62B1F'; // Rich San Marzano red
  }, [variant]);

  const crustColor = '#D18D47'; // Toasted golden crust
  const crustDarkColor = '#8A4A1C'; // Deeper wood-fired shade
  const cheeseColor = variant === 'quattro_formaggi' ? '#F7F0D8' : '#FAF6EE';

  return (
    <group ref={groupRef} scale={scale} dispose={null} position={[0, -0.15, 0]}>
      {/* 1. Wood Pizza Peel / Serving Board underneath */}
      <group position={[0, -0.12, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.15, 1.15, 0.05, 48]} />
          <meshStandardMaterial
            color="#2A1B12"
            roughness={0.75}
            metalness={0.1}
          />
        </mesh>
        {/* Board rim bevel */}
        <mesh position={[0, 0.025, 0]}>
          <torusGeometry args={[1.15, 0.015, 16, 48]} />
          <meshStandardMaterial color="#1E130D" roughness={0.8} />
        </mesh>
      </group>

      {/* 2. Dough Base (Center bed) */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[0.92, 0.94, 0.07, 48]} />
        <meshStandardMaterial
          color={crustColor}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 3. Volcanic Puffed Cornicione (Outer Crust Ring) with bubbly profile */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.88, 0.13, 24, 52]} />
        <meshStandardMaterial
          color={crustColor}
          roughness={0.78}
          metalness={0.05}
          bumpScale={0.05}
        />
      </mesh>

      {/* Secondary wavy crust overlay for artisanal irregularity */}
      <mesh position={[0, 0.09, 0]} rotation={[0, 0.5, 0]}>
        <torusGeometry args={[0.87, 0.11, 16, 40]} />
        <meshStandardMaterial
          color={crustDarkColor}
          roughness={0.85}
          wireframe={false}
          opacity={0.45}
          transparent
        />
      </mesh>

      {/* 4. Leopard Char Spots on Crust */}
      {toppingsData.charredSpots.map((spot, i) => (
        <mesh
          key={`char-${i}`}
          position={spot.pos as [number, number, number]}
          rotation={[0, spot.rot, 0]}
        >
          <boxGeometry args={spot.scale as [number, number, number]} />
          <meshStandardMaterial color="#1C140E" roughness={0.95} />
        </mesh>
      ))}

      {/* 5. Sauce Bed (San Marzano / Cream / Truffle) */}
      <mesh position={[0, 0.09, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.02, 40]} />
        <meshStandardMaterial
          color={sauceColor}
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* 6. Melted Mozzarella Pools */}
      {toppingsData.mozzarellaBlobs.map((blob, i) => (
        <mesh
          key={`mozz-${i}`}
          position={blob.pos as [number, number, number]}
          rotation={[-Math.PI / 2, 0, blob.rot]}
          receiveShadow
        >
          <circleGeometry args={[blob.rx, 24]} />
          <meshStandardMaterial
            color={cheeseColor}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* 7. Special Centerpiece Burrata (For Burrata variant) */}
      {variant === 'burrata' && (
        <group position={[0, 0.17, 0]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial
              color="#FFFFF5"
              roughness={0.3}
              metalness={0.05}
            />
          </mesh>
          {/* Top knot */}
          <mesh position={[0, 0.19, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 0.06, 12]} />
            <meshStandardMaterial color="#F5EFE0" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* 8. Salami / Pepperoni Slices (For Diavola or default accents) */}
      {(variant === 'diavola' || variant === 'margherita') &&
        toppingsData.salamiSlices.slice(0, variant === 'diavola' ? 8 : 4).map((sal, i) => (
          <group
            key={`salami-${i}`}
            position={sal.pos as [number, number, number]}
            rotation={sal.rot as [number, number, number]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[sal.size, sal.size, 0.012, 24]} />
              <meshStandardMaterial
                color="#8B1E14"
                roughness={0.45}
                metalness={0.1}
              />
            </mesh>
            {/* Charred crisped edge */}
            <mesh position={[0, 0.007, 0]}>
              <ringGeometry args={[sal.size * 0.85, sal.size, 24]} />
              <meshStandardMaterial color="#4A0E0A" roughness={0.6} />
            </mesh>
          </group>
        ))}

      {/* 9. Wild Porcini & Truffles (For Tartufata variant) */}
      {variant === 'tartufata' &&
        toppingsData.mushroomSlices.map((mush, i) => (
          <group
            key={`mush-${i}`}
            position={mush.pos as [number, number, number]}
            rotation={mush.rot as [number, number, number]}
          >
            {/* Mushroom Cap */}
            <mesh castShadow>
              <sphereGeometry args={[mush.size, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#443224" roughness={0.7} />
            </mesh>
            {/* Mushroom Stem */}
            <mesh position={[0, -0.02, 0]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.04, 0.06, 8]} />
              <meshStandardMaterial color="#C5B29B" roughness={0.8} />
            </mesh>
          </group>
        ))}

      {/* 10. Fresh Sweet Basil Leaves (Vibrant Green) */}
      {toppingsData.basilLeaves.map((leaf, i) => (
        <group
          key={`basil-${i}`}
          position={leaf.pos as [number, number, number]}
          rotation={leaf.rot as [number, number, number]}
          scale={leaf.scale}
        >
          {/* Curved Leaf Geometry */}
          <mesh castShadow>
            <sphereGeometry args={[0.5, 12, 10, 0, Math.PI, 0, Math.PI / 2]} />
            <meshStandardMaterial
              color="#3B7D2F"
              roughness={0.4}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Leaf central vein */}
          <mesh position={[0, 0.01, 0.25]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.015, 0.45, 6]} />
            <meshStandardMaterial color="#2E6324" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* 11. Drizzle of Cold-Pressed Olive Oil Sheen */}
      <mesh position={[0, 0.152, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.65, 32]} />
        <meshStandardMaterial
          color="#E6C844"
          roughness={0.15}
          metalness={0.2}
          opacity={0.3}
          transparent
        />
      </mesh>
    </group>
  );
};
