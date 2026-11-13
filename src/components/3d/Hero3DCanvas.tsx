import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { PizzaModel } from './PizzaModel';
import { FloatingIngredients } from './FloatingIngredients';

interface CameraRigProps {
  scrollProgress: number;
  isMobile: boolean;
}

const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress, isMobile }) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(isMobile ? 0 : 0.4, 2.0, 2.5));
  const targetLookAt = useRef(new THREE.Vector3(isMobile ? 0 : 0.3, 0, 0));

  useFrame(() => {
    const p = Math.min(Math.max(scrollProgress, 0), 1);
    const baseX = isMobile ? 0 : 0.4;

    if (p < 0.4) {
      const localT = p / 0.4;
      targetCamPos.current.set(
        THREE.MathUtils.lerp(baseX, -0.2, localT),
        THREE.MathUtils.lerp(2.0, 1.4, localT),
        THREE.MathUtils.lerp(2.5, 1.8, localT)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(isMobile ? 0 : 0.3, 0.0, localT),
        0,
        0
      );
    } else {
      const localT = (p - 0.4) / 0.6;
      targetCamPos.current.set(
        THREE.MathUtils.lerp(-0.2, baseX, localT),
        THREE.MathUtils.lerp(1.4, 1.9, localT),
        THREE.MathUtils.lerp(1.8, 2.6, localT)
      );
      targetLookAt.current.set(isMobile ? 0 : 0.2, 0, 0);
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`w-full h-full relative pointer-events-auto ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera
          makeDefault
          position={[isMobile ? 0 : 0.4, 2.0, 2.5]}
          fov={isMobile ? 38 : 42}
        />
        <CameraRig scrollProgress={scrollProgress} isMobile={isMobile} />

        {/* Ambient & Warm Studio Lighting */}
        <ambientLight intensity={0.7} color="#FFEADA" />

        {/* Key Light */}
        <directionalLight
          position={[3, 5, 3]}
          intensity={2.0}
          color="#FFD6A5"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Fill Light */}
        <directionalLight
          position={[-3, 2, -1]}
          intensity={0.7}
          color="#9BB098"
        />

        {/* Wood-Oven Hearth Point Lights */}
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

        <Suspense fallback={null}>
          <group position={[isMobile ? 0 : 1.1, isMobile ? 0.25 : -0.1, 0]}>
            <PizzaModel
              variant="margherita"
              modelAsset="realistic"
              scale={isMobile ? 0.56 : 0.62}
              rotationSpeed={0.25}
              tiltAngle={-Math.PI / 9}
              tiltZ={-0.08}
              initialRotationY={Math.PI / 6}
              isInteractive={false}
            />
          </group>
        </Suspense>

        {/* Floating artisanal ingredient assets */}
        <FloatingIngredients isMobile={isMobile} />

        {/* Soft realistic floor shadow */}
        <ContactShadows
          position={[isMobile ? 0 : 1.1, isMobile ? 0.25 : -0.35, 0]}
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
