import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import './ModelViewer.css';

// Fallback component while model is loading
function Loader() {
  return (
    <div className="model-loader">
      <div className="spinner"></div>
      <p>Loading 3D Model...</p>
    </div>
  );
}

// 3D Model component
function RobotModel({ url }) {
  // Load the 3D model
  const { scene } = useGLTF(url || '/robot.glb');
  
  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
}

// Main ModelViewer component
export default function ModelViewer({ modelPath }) {
  return (
    <div className="model-viewer">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Suspense fallback={<Loader />}>
          <RobotModel url={modelPath} />
          <Environment files="https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@latest/hdri/city_1k.hdr" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
