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

  // Procedural toppings layout based on variant (all strictly in horizontal XZ plane, low Y)
  const toppingsData = useMemo(() => {
    // Basil leaves coordinates (flat on surface, slight organic tilt)
    const basilLeaves = [
      { pos: [0.22, 0.048, 0.15], rot: [-Math.PI / 2 + 0.1, 0, 0.4], scale: 0.22 },
      { pos: [-0.3, 0.048, -0.2], rot: [-Math.PI / 2 - 0.08, 0, -0.8], scale: 0.24 },
      { pos: [0.45, 0.048, -0.25], rot: [-Math.PI / 2 + 0.05, 0, 1.4], scale: 0.2 },
      { pos: [-0.4, 0.048, 0.32], rot: [-Math.PI / 2 - 0.1, 0, -1.2], scale: 0.22 },
      { pos: [0.0, 0.049, 0.45], rot: [-Math.PI / 2 + 0.08, 0, 2.2], scale: 0.21 },
      { pos: [-0.05, 0.05, -0.05], rot: [-Math.PI / 2 + 0.05, 0, 0.6], scale: 0.26 },
      { pos: [0.15, 0.048, -0.5], rot: [-Math.PI / 2 - 0.05, 0, -0.4], scale: 0.2 },
    ];

    // Mozzarella pools (flat organic circles lying on the sauce)
    const mozzarellaBlobs = [
      { pos: [-0.35, 0.038, -0.32], rx: 0.28, rot: 0.4 },
      { pos: [0.38, 0.038, -0.28], rx: 0.3, rot: -0.3 },
      { pos: [-0.42, 0.038, 0.28], rx: 0.29, rot: 0.8 },
      { pos: [0.35, 0.038, 0.35], rx: 0.28, rot: -0.6 },
      { pos: [0.0, 0.039, 0.0], rx: 0.36, rot: 0.2 },
      { pos: [-0.08, 0.038, -0.55], rx: 0.24, rot: 1.1 },
      { pos: [0.55, 0.038, 0.08], rx: 0.25, rot: 0.7 },
      { pos: [-0.58, 0.038, -0.05], rx: 0.26, rot: -0.5 },
      { pos: [0.1, 0.038, 0.62], rx: 0.23, rot: 0.3 },
    ];

    // Pepperoni / Spianata Calabrese slices (flat thin discs on the pizza)
    const salamiSlices = [
      { pos: [0.42, 0.044, 0.22], size: 0.22 },
      { pos: [-0.42, 0.044, -0.22], size: 0.23 },
      { pos: [0.25, 0.044, -0.45], size: 0.21 },
      { pos: [-0.25, 0.044, 0.45], size: 0.22 },
      { pos: [-0.55, 0.044, 0.18], size: 0.21 },
      { pos: [0.52, 0.044, -0.18], size: 0.22 },
      { pos: [0.02, 0.045, -0.25], size: 0.23 },
      { pos: [-0.02, 0.045, 0.28], size: 0.24 },
      { pos: [0.28, 0.044, 0.52], size: 0.2 },
      { pos: [-0.3, 0.044, -0.52], size: 0.21 },
    ];

    // Porcini & Truffle slices (flat horizontal pieces)
    const mushroomSlices = [
      { pos: [0.3, 0.044, 0.3], size: 0.15 },
      { pos: [-0.3, 0.044, -0.3], size: 0.16 },
      { pos: [0.2, 0.044, -0.42], size: 0.14 },
      { pos: [-0.38, 0.044, 0.15], size: 0.15 },
      { pos: [0.42, 0.044, -0.15], size: 0.16 },
      { pos: [-0.15, 0.045, 0.42], size: 0.14 },
      { pos: [0.0, 0.045, 0.15], size: 0.17 },
      { pos: [-0.05, 0.045, -0.18], size: 0.16 },
    ];

    // Charred spots along the flat horizontal cornicione rim (radius ~ 1.18)
    const charredSpots = Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2 + (Math.random() * 0.15 - 0.075);
      const rad = 1.17 + (Math.random() * 0.06 - 0.03);
      return {
        pos: [Math.cos(angle) * rad, 0.055, Math.sin(angle) * rad] as [number, number, number],
        rot: angle,
        scale: [0.09 + Math.random() * 0.06, 0.02, 0.06 + Math.random() * 0.04] as [number, number, number],
      };
    });

    return { basilLeaves, mozzarellaBlobs, salamiSlices, mushroomSlices, charredSpots };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth subtle continuous idle spin
    groupRef.current.rotation.y += delta * rotationSpeed;

    // Gentle parallax tilt from mouse when interactive
    if (isInteractive) {
      const mouseX = (state.pointer.x * Math.PI) / 14;
      const mouseY = (-state.pointer.y * Math.PI) / 16;

      // Base tilt is ~38 degrees (0.65 rad) so the viewer sees the vast horizontal top of the pizza
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.65 + mouseY,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouseX * 0.4,
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

  const crustColor = '#D4914A'; // Toasted golden crust
  const crustDarkColor = '#944E1E'; // Deeper wood-fired charred shade
  const cheeseColor = variant === 'quattro_formaggi' ? '#F7F0D8' : '#FAF6EE';

  return (
    <group ref={groupRef} scale={scale} dispose={null} position={[0, -0.05, 0]}>
      {/* 1. Wood Pizza Peel / Serving Board underneath (FLAT in XZ plane) */}
      <group position={[0, -0.02, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.38, 1.38, 0.025, 48]} />
          <meshStandardMaterial color="#2B1A12" roughness={0.75} metalness={0.1} />
        </mesh>
        {/* Board rim bevel: HORIZONTAL torus flat in XZ plane */}
        <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.37, 0.015, 12, 48]} />
          <meshStandardMaterial color="#1C110B" roughness={0.8} />
        </mesh>
      </group>

      {/* 2. Dough Base (Center bed) - broad flat disc, thin in Y */}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <cylinderGeometry args={[1.22, 1.25, 0.03, 48]} />
        <meshStandardMaterial color={crustColor} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* 3. Volcanic Puffed Cornicione (Outer Crust Ring) - MUST BE ROTATED [-PI/2, 0, 0] to lie flat horizontally! */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.18, 0.09, 20, 64]} />
        <meshStandardMaterial
          color={crustColor}
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {/* Secondary wavy crust overlay for charred wood-fired shading - ALSO HORIZONTAL */}
      <mesh position={[0, 0.042, 0]} rotation={[-Math.PI / 2, 0, 0.5]}>
        <torusGeometry args={[1.17, 0.08, 16, 48]} />
        <meshStandardMaterial
          color={crustDarkColor}
          roughness={0.85}
          opacity={0.4}
          transparent
        />
      </mesh>

      {/* 4. Leopard Char Spots along the horizontal crust circumference */}
      {toppingsData.charredSpots.map((spot, i) => (
        <mesh
          key={`char-${i}`}
          position={spot.pos}
          rotation={[-Math.PI / 2, 0, spot.rot]}
        >
          <boxGeometry args={spot.scale} />
          <meshStandardMaterial color="#1C140E" roughness={0.95} />
        </mesh>
      ))}

      {/* 5. Sauce Bed (San Marzano / Cream / Truffle) - flat circular disc in XZ plane */}
      <mesh position={[0, 0.032, 0]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.01, 48]} />
        <meshStandardMaterial
          color={sauceColor}
          roughness={0.45}
          metalness={0.15}
        />
      </mesh>

      {/* 6. Melted Mozzarella Pools (flat on sauce) */}
      {toppingsData.mozzarellaBlobs.map((blob, i) => (
        <mesh
          key={`mozz-${i}`}
          position={[blob.pos[0], 0.038, blob.pos[2]]}
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
        <group position={[0, 0.1, 0]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.24, 24, 24]} />
            <meshStandardMaterial
              color="#FFFFF5"
              roughness={0.3}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 0.06, 12]} />
            <meshStandardMaterial color="#F5EFE0" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* 8. Salami / Pepperoni Slices (flat horizontal thin discs) */}
      {(variant === 'diavola' || variant === 'margherita') &&
        toppingsData.salamiSlices.slice(0, variant === 'diavola' ? 10 : 5).map((sal, i) => (
          <group
            key={`salami-${i}`}
            position={[sal.pos[0], 0.042, sal.pos[2]]}
          >
            {/* Flat salami disc */}
            <mesh castShadow>
              <cylinderGeometry args={[sal.size, sal.size, 0.008, 24]} />
              <meshStandardMaterial
                color="#8B1E14"
                roughness={0.45}
                metalness={0.1}
              />
            </mesh>
            {/* Charred crisped edge ring: horizontal */}
            <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
            position={[mush.pos[0], 0.042, mush.pos[2]]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[mush.size, mush.size * 0.9, 0.012, 16]} />
              <meshStandardMaterial color="#3E2D20" roughness={0.7} />
            </mesh>
          </group>
        ))}

      {/* 10. Fresh Sweet Basil Leaves (flat gently curved leaves resting on surface) */}
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
        </group>
      ))}

      {/* 11. Cold-Pressed Olive Oil Sheen (flat horizontal ring) */}
      <mesh position={[0, 0.046, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.95, 32]} />
        <meshStandardMaterial
          color="#E6C844"
          roughness={0.15}
          metalness={0.2}
          opacity={0.25}
          transparent
        />
      </mesh>
    </group>
  );
};
