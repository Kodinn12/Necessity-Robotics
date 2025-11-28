import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './Robot3D.css';


// Main 3D Robot component
export default function Robot3D() {
  return (
    <div className="robot-3d-container">
      <Canvas camera={{ position: [1, 8, 9], fov: 70 }}>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
        //   autoRotate
        //   autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        <ambientLight intensity={0.7} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.25} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.3} />
        
        <Suspense fallback={null}>
          <Model url="/Robot.glb" />
          <Environment files="https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@latest/hdri/venice_sunset_1k.hdr" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}

// Helper component to load and animate GLTF models
function Model({ url }) {
  const { scene, animations } = useGLTF(url);
  const [hovered, setHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headRef = useRef();
  const mixerRef = useRef();
  const actionsRef = useRef({});
  const activeActionRef = useRef();
  const previousActionRef = useRef();
  const { camera } = useThree();
  
  // Set up mouse move listener for head tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set up animation mixer and actions
  useEffect(() => {
    if (!animations || animations.length === 0) return;
    
    // Find head reference if not already set
    if (!headRef.current) {
      scene.traverse((child) => {
        if (child.name.toLowerCase().includes('head') && !headRef.current) {
          headRef.current = child;
        }
      });
    }

    // Create animation mixer
    const mixer = new THREE.AnimationMixer(scene);
    mixerRef.current = mixer;
    
    // Create actions for all animations
    const actions = {};
    animations.forEach((clip) => {
      actions[clip.name] = mixer.clipAction(clip);
    });
    actionsRef.current = actions;
    
    // Set up initial action (Idle if available, otherwise first animation)
    const initialAction = actions['Idle'] || actions[Object.keys(actions)[0]];
    if (initialAction) {
      activeActionRef.current = initialAction;
      activeActionRef.current.play();
    }
    
    // Log available animations for debugging
    console.log('Available animations:', Object.keys(actions));
    
    return () => {
      mixer.stopAllAction();
    };
  }, [scene]);

  // Handle hover state changes
  useEffect(() => {
    const actions = actionsRef.current;
    if (!actions) return;

    if (hovered) {
      // When hovered, play the Wave animation if it exists
      fadeToAction('Wave', 0.2);
    } else {
      // When not hovered, return to Idle
      fadeToAction('Idle', 0.2);
    }
  }, [hovered]);

  // Animation and head tracking update
  useFrame((state, delta) => {
    // Update animations
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    // Update head tracking if head ref exists
    if (headRef.current) {
      // Calculate target rotations with tighter constraints
      const targetY = THREE.MathUtils.clamp(mousePosition.x * 0.3, -0.3, 0.3); // Horizontal
      const targetX = THREE.MathUtils.clamp(-mousePosition.y * 0.2, -0.2, 0.2); // Vertical
      
      // Apply rotation directly without lerp for more stable movement
      headRef.current.rotation.y = targetY;
      headRef.current.rotation.x = targetX;
      headRef.current.rotation.z = 0; // Keep head level
    }
  });
  
  // Helper function to fade between animations
  function fadeToAction(name, duration) {
    const actions = actionsRef.current;
    if (!actions || !actions[name]) {
      console.warn(`Animation "${name}" not found`);
      return;
    }
    
    const previousAction = activeActionRef.current;
    const action = actions[name];
    
    // If already playing this action, do nothing
    if (action === previousAction) return;
    
    // Set the new action
    activeActionRef.current = action;
    
    // Fade out previous action if it exists
    if (previousAction) {
      previousAction.fadeOut(duration);
    }
    
    // Fade in new action
    action
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play();
  }

  // Log available animations for debugging
  useEffect(() => {
    if (animations) {
      console.log('Available animations:', animations.map(a => a.name));
    }
  }, [animations]);

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
      }}
    >
      <primitive object={scene} />
    </group>
  );
}

// Preload the fallback model
useGLTF.preload('/robot.glb');
