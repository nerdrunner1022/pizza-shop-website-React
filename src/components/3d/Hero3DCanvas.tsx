import React, { useRef, useEffect } from 'react';
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
  const targetCamPos = useRef(new THREE.Vector3(0, 1.2, 2.6));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Stage 0 (Hero): Centered overview, slight high angle looking down at pizza
    // Stage 1 (Craft & Fermentation): Zoom closer to charred cornicione and bubbling mozzarella
    // Stage 2 (Wood Oven 900F): Lower dramatic cinematic rim angle
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    if (p < 0.4) {
      // Interpolate from Hero to Crust Close-up
      const localT = p / 0.4;
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.8, -0.6, localT),
        THREE.MathUtils.lerp(1.2, 0.7, localT),
        THREE.MathUtils.lerp(2.5, 1.6, localT)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0, -0.1, localT),
        THREE.MathUtils.lerp(0, 0.1, localT),
        0
      );
    } else {
      // Interpolate to 900F Oven dramatic perspective
      const localT = (p - 0.4) / 0.6;
      targetCamPos.current.set(
        THREE.MathUtils.lerp(-0.6, 0.4, localT),
        THREE.MathUtils.lerp(0.7, 0.4, localT),
        THREE.MathUtils.lerp(1.6, 2.2, localT)
      );
      targetLookAt.current.set(0, 0.05, 0);
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
        <PerspectiveCamera makeDefault position={[0.6, 1.2, 2.6]} fov={45} />
        <CameraRig scrollProgress={scrollProgress} />

        {/* Ambient & Artisanal Studio Lighting */}
        <ambientLight intensity={0.55} color="#FFE8D6" />

        {/* Key Light: Warm golden light from above-front */}
        <directionalLight
          position={[2.5, 4, 2.5]}
          intensity={1.8}
          color="#FFD6A5"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Fill Light: Soft olive / neutral fill from left */}
        <directionalLight
          position={[-3, 2, -1]}
          intensity={0.6}
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
          intensity={1.2}
          color="#D9A35F"
          distance={5}
        />

        {/* Centerpiece 3D Model */}
        <PizzaModel variant="margherita" scale={1.25} rotationSpeed={0.25} />

        {/* Floating artisanal ingredient assets */}
        <FloatingIngredients />

        {/* Soft realistic floor shadow */}
        <ContactShadows
          position={[0, -0.4, 0]}
          opacity={0.65}
          scale={5}
          blur={2.4}
          far={3}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};
