import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { PizzaModel } from './PizzaModel';
import { MenuItem } from '../../types';

interface MiniPizzaViewerProps {
  variant?: MenuItem['modelVariant'];
  className?: string;
  autoRotate?: boolean;
  tiltAngle?: number;
  initialRotationY?: number;
  cameraPosition?: [number, number, number];
  modelScale?: number;
  centerModel?: boolean;
}

export const MiniPizzaViewer: React.FC<MiniPizzaViewerProps> = ({
  variant = 'margherita',
  className = 'w-full h-48',
  autoRotate = true,
  tiltAngle = 0.2,
  initialRotationY = 0,
  cameraPosition = [0, 1.8, 1.6],
  modelScale = 0.9,
  centerModel = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} color="#FFF2E2" />
        <directionalLight position={[2, 4, 2]} intensity={1.8} color="#FFD8B0" />
        <pointLight position={[-2, 1, -1]} intensity={1.8} color="#FF7B42" />

        <Suspense fallback={null}>
          <PizzaModel
            variant={variant}
            scale={modelScale}
            rotationSpeed={autoRotate ? 0.4 : 0}
            isInteractive={false}
            tiltAngle={tiltAngle}
            initialRotationY={initialRotationY}
            alignToFloor={!centerModel}
          />
          <ContactShadows
            position={[0, -0.2, 0]}
            opacity={0.5}
            scale={3}
            blur={2}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.5}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
};
