import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { PizzaModel } from './PizzaModel';
import { FloatingIngredients } from './FloatingIngredients';

interface CameraRigProps {
  scrollProgress: number;
}

const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress }) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0.5, 1.4, 2.7));
  const targetLookAt = useRef(new THREE.Vector3(0.4, 0, 0));

  useFrame(() => {
    // Stage 0 (Hero): Angle looking down at horizontal pizza disc on the right
    // Stage 1 (Craft & Fermentation): Zoom closer to charred cornicione and bubbling mozzarella
    // Stage 2 (Wood Oven 900F): Lower dramatic cinematic rim angle
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    if (p < 0.4) {
      const localT = p / 0.4;
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.5, -0.3, localT),
        THREE.MathUtils.lerp(1.4, 0.9, localT),
        THREE.MathUtils.lerp(2.7, 1.8, localT)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.4, 0.0, localT),
        THREE.MathUtils.lerp(0, 0.05, localT),
        0
      );
    } else {
      const localT = (p - 0.4) / 0.6;
      targetCamPos.current.set(
        THREE.MathUtils.lerp(-0.3, 0.5, localT),
        THREE.MathUtils.lerp(0.9, 0.6, localT),
        THREE.MathUtils.lerp(1.8, 2.4, localT)
      );
      targetLookAt.current.set(0.3, 0.05, 0);
    }

    camera.position.lerp(targetCamPos.current, 0.05);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

interface Hero3DCanvasProps {
  scrollProgress?: number;
  className?: string;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  scrollProgress = 0,
  className = '',
}) => {
  return (
    <div className={`w-full h-full relative pointer-events-auto ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[0.5, 1.4, 2.7]} fov={42} />
        <CameraRig scrollProgress={scrollProgress} />

        {/* Ambient & Artisanal Studio Lighting */}
        <ambientLight intensity={0.65} color="#FFEADA" />

        {/* Key Light: Warm golden light from above-front */}
        <directionalLight
          position={[3, 5, 3]}
          intensity={2.0}
          color="#FFD6A5"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Fill Light: Soft olive / neutral fill from left */}
        <directionalLight
          position={[-3, 2, -1]}
          intensity={0.7}
          color="#9BB098"
        />

        {/* Wood-Oven Hearth Rim Light: Hot terracotta/ember glow from the back-right */}
        <pointLight
          position={[-1.5, 1.2, -2]}
          intensity={2.8}
          color="#FF6B35"
          distance={8}
        />

        <pointLight
          position={[2, -0.5, 1]}
          intensity={1.4}
          color="#D9A35F"
          distance={5}
        />

        {/* Centerpiece 3D Model: position slightly to the right so it balances hero text */}
        <group position={[0.5, -0.1, 0]}>
          <PizzaModel variant="margherita" scale={1.2} rotationSpeed={0.25} />
        </group>

        {/* Floating artisanal ingredient assets */}
        <FloatingIngredients />

        {/* Soft realistic floor shadow */}
        <ContactShadows
          position={[0.5, -0.35, 0]}
          opacity={0.6}
          scale={5}
          blur={2.4}
          far={3}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};
