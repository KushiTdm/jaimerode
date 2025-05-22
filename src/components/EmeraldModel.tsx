import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { ExtrudeGeometry, Shape, Group } from 'three';

const EmeraldCut = () => {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
  });

  // Forme émeraude avec proportions optimales
  const shape = new Shape();
  const width = 1.8;
  const height = 1.2;
  const bevelSize = 0.25;

  shape.moveTo(-width/2 + bevelSize, -height/2);
  shape.lineTo(width/2 - bevelSize, -height/2);
  shape.lineTo(width/2, -height/2 + bevelSize);
  shape.lineTo(width/2, height/2 - bevelSize);
  shape.lineTo(width/2 - bevelSize, height/2);
  shape.lineTo(-width/2 + bevelSize, height/2);
  shape.lineTo(-width/2, height/2 - bevelSize);
  shape.lineTo(-width/2, -height/2 + bevelSize);
  shape.lineTo(-width/2 + bevelSize, -height/2);

  // Paramètres d'extrusion améliorés pour les facettes
  const extrudeSettings = {
    steps: 2,
    depth: 0.4, // Profondeur légèrement augmentée
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.2,
    bevelSegments: 5, // Plus de segments pour des facettes plus nettes
  };

  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  geometry.computeVertexNormals();

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial 
          color="#00d896" // Vert émeraude plus clair et vibrant
          transmission={0.9} // Légèrement réduit pour mieux voir les facettes
          roughness={0.05} // Surface plus lisse pour plus de reflets
          thickness={0.8} // Épaisseur réduite pour plus de luminosité
          ior={1.58} // Indice de réfraction optimal
          chromaticAberration={0.05}
          anisotropy={0.3} // Augmenté pour des reflets irisés
          clearcoat={1}
          clearcoatRoughness={0.05}
          specularColor="#aaffee" // Reflets bleutés
          envMapIntensity={4} // Augmenté pour plus de brillance
        />
      </mesh>
    </group>
  );
};

const EmeraldModel: React.FC = () => {
  return (
    <Canvas>
      {/* Éclairage renforcé */}
      <ambientLight intensity={0.7} color="#ffffff" />
      <spotLight
        position={[10, 15, 10]}
        intensity={5} // Intensité augmentée
        angle={0.25}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-5, 5, 5]}
        intensity={3} // Intensité augmentée
        color="#e0f7fa" // Léger bleu clair
      />
      
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.4}>
        <EmeraldCut />
      </Float>

      <OrbitControls
        enableZoom={true}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI/6}
        maxPolarAngle={Math.PI/1.8}
      />
    </Canvas>
  );
};

export default EmeraldModel;