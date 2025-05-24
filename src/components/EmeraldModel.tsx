import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { ExtrudeGeometry, Shape, Group } from 'three';

const EmeraldCut = ({ isMobile }: { isMobile: boolean }) => {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
  });

  // Définition de la forme du diamant
  const shape = new Shape();
  const width = 1.8;
  const height = 1.2;
  const bevelSize = 0.25;

  shape.moveTo(-width / 2 + bevelSize, -height / 2);
  shape.lineTo(width / 2 - bevelSize, -height / 2);
  shape.lineTo(width / 2, -height / 2 + bevelSize);
  shape.lineTo(width / 2, height / 2 - bevelSize);
  shape.lineTo(width / 2 - bevelSize, height / 2);
  shape.lineTo(-width / 2 + bevelSize, height / 2);
  shape.lineTo(-width / 2, height / 2 - bevelSize);
  shape.lineTo(-width / 2, -height / 2 + bevelSize);
  shape.lineTo(-width / 2 + bevelSize, -height / 2);

  const extrudeSettings = {
    steps: 2,
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.2,
    bevelSegments: 5,
  };

  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  geometry.computeVertexNormals();

  return (
    <group ref={group} scale={isMobile ? 0.85 : 1}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial
          color="#009966" // Vert plus sombre
          transmission={0.95}
          roughness={0.03}
          thickness={0.8}
          ior={1.6}
          chromaticAberration={0.08}
          anisotropy={0.4}
          clearcoat={1}
          clearcoatRoughness={0.03}
          specularColor="#aaffff"
          envMapIntensity={5}
        />
      </mesh>
    </group>
  );
};

const EmeraldModel: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initialisation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ height: '100vh', background: 'transparent' }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, isMobile ? 6.5 : 5]}
        fov={isMobile ? 60 : 50}
      />

      <ambientLight intensity={0.7} color="#ffffff" />
      <spotLight
        position={[10, 15, 10]}
        intensity={4}
        angle={0.3}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-5, 5, 5]}
        intensity={2}
        color="#a0f7e0"
      />

      <Environment preset="studio" />

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.4}>
        <EmeraldCut isMobile={isMobile} />
      </Float>

      <OrbitControls
        enableZoom={true}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

export default EmeraldModel;
