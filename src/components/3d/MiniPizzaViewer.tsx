import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { PizzaModel } from './PizzaModel';

interface MiniPizzaViewerProps {
  variant?: 'margherita' | 'diavola' | 'tartufata' | 'burrata' | 'quattro_formaggi';
  className?: string;
  autoRotate?: boolean;
}

export const MiniPizzaViewer: React.FC<MiniPizzaViewerProps> = ({
  variant = 'margherita',
  className = 'w-full h-48',
  autoRotate = true,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 1.3, 1.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} color="#FFF2E2" />
        <directionalLight position={[2, 3, 2]} intensity={1.5} color="#FFD8B0" />
        <pointLight position={[-2, 1, -1]} intensity={1.8} color="#FF7B42" />

        <Suspense fallback={null}>
          <PizzaModel
            variant={variant}
            scale={0.9}
            rotationSpeed={autoRotate ? 0.4 : 0}
            isInteractive={false}
          />
          <ContactShadows
            position={[0, -0.3, 0]}
            opacity={0.5}
            scale={3}
            blur={2}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.3}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
};
