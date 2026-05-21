'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Group, Box3, Vector3 } from 'three';
import * as THREE from 'three';


// Model component
function Model({ url }: { url: string }) {
  console.log('🔵 Loading model from:', url);
  const gltf = useGLTF(url);
  console.log('🔵 GLTF loaded:', gltf);
  const scene = gltf?.scene;
  console.log('🔵 Scene:', scene);
  
  const modelRef = useRef<Group>(null);
  const { camera } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (!scene) {
      console.warn('⚠️ STEP 4: No scene available');
      setError('No scene loaded');
      return;
    }

    if (hasProcessedRef.current) {
      return;
    }

    hasProcessedRef.current = true;
    
    // Process immediately - no delay needed
    const processModel = () => {
      try {
        // Count ALL types of meshes and make visible
        let meshCount = 0;
        let skinnedMeshCount = 0;
        let instancedMeshCount = 0;
        let otherCount = 0;
        const allObjects: any[] = [];

        scene.traverse((child) => {
          allObjects.push({
            type: child.type,
            name: child.name,
            visible: child.visible,
            isMesh: child instanceof THREE.Mesh,
            isSkinnedMesh: child instanceof THREE.SkinnedMesh,
            isInstancedMesh: child instanceof THREE.InstancedMesh,
            isGroup: child instanceof THREE.Group,
            isObject3D: child instanceof THREE.Object3D
          });

          if (child instanceof THREE.Mesh) {
            meshCount++;
            child.visible = true;
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Ensure material is visible - keep original material but make sure it's not transparent
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat: THREE.Material) => {
                  mat.visible = true;
                  if ('transparent' in mat) mat.transparent = false;
                  if ('opacity' in mat) mat.opacity = 1.0;
                  mat.needsUpdate = true;
                });
              } else {
                child.material.visible = true;
                if ('transparent' in child.material) child.material.transparent = false;
                if ('opacity' in child.material) child.material.opacity = 1.0;
                child.material.needsUpdate = true;
              }
            }
          } else if (child instanceof THREE.SkinnedMesh) {
            skinnedMeshCount++;
            child.visible = true;
          } else if (child instanceof THREE.InstancedMesh) {
            instancedMeshCount++;
            child.visible = true;
          } else if (child instanceof THREE.Object3D) {
            otherCount++;
            child.visible = true;
          }
        });


        // Check if we have any renderable objects
        const totalRenderable = meshCount + skinnedMeshCount + instancedMeshCount;
        if (totalRenderable === 0) {
          console.error('❌ No renderable meshes found in scene!');
          console.error('Scene structure:', {
            children: scene.children.length,
            allObjects: allObjects.length,
            firstObjects: allObjects.slice(0, 5)
          });
          setError('No renderable meshes found in model');
          return;
        }

        // Calculate bounding box - update it first and try different approaches
        scene.updateMatrixWorld(true);
        
        // Try to get bounding box from the scene
        let box = new Box3().setFromObject(scene);
        
        // If empty, try getting from children
        if (box.isEmpty() && scene.children.length > 0) {
          const childBox = new Box3();
          scene.children.forEach(child => {
            child.updateMatrixWorld(true);
            const childBounds = new Box3().setFromObject(child);
            if (!childBounds.isEmpty()) {
              childBox.union(childBounds);
            }
          });
          if (!childBox.isEmpty()) {
            box = childBox;
          }
        }
        const center = box.getCenter(new Vector3());
        const size = box.getSize(new Vector3());
        

        if (box.isEmpty() || size.length() < 0.001) {
          console.error('❌ STEP 7: Bounding box is empty or too small!');
          setError('Model bounding box is empty');
          return;
        }

        // Center the model at origin
        scene.position.set(-center.x, -center.y, -center.z);

        // Scale to larger size for prominence
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim;
        scene.scale.set(scale, scale, scale);
        
        // Force update matrix world after positioning
        scene.updateMatrixWorld(true);

        // Position camera - side view like the airplane, slightly elevated
        const scaledSize = maxDim * scale;
        const distance = scaledSize * 1.8;
        camera.position.set(-distance * 0.8, scaledSize * 0.2, distance * 0.3);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        setIsLoaded(true);
        setError(null);
        console.log('✅ Model successfully positioned and ready to render');
      } catch (err) {
        console.error('❌ Error processing model:', err);
        setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };
    
    // Run immediately
    processModel();
  }, [scene, camera]);

  if (!scene) {
    return (
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (error) {
    return (
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }

  // Render all meshes individually to ensure they're visible with their original materials
  const meshes: THREE.Mesh[] = [];
  if (scene) {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });
  }
  
  return (
    <>
      {/* Render each mesh individually to ensure visibility with original materials */}
      {meshes.map((mesh, index) => {
        const worldPosition = new Vector3();
        const worldQuaternion = new THREE.Quaternion();
        const worldRotation = new THREE.Euler();
        const worldScale = new Vector3();
        mesh.getWorldPosition(worldPosition);
        mesh.getWorldQuaternion(worldQuaternion);
        worldRotation.setFromQuaternion(worldQuaternion);
        mesh.getWorldScale(worldScale);
        
        // Get the original material - ensure it's visible
        let material = mesh.material;
        if (Array.isArray(material)) {
          material = material[0]; // Use first material if array
        }
        
        // Ensure material is visible
        if (material) {
          material.visible = true;
          if ('transparent' in material) material.transparent = false;
          if ('opacity' in material) material.opacity = 1.0;
          material.needsUpdate = true;
        }
        
        return (
          <mesh
            key={`mesh-${index}-${mesh.uuid}`}
            geometry={mesh.geometry}
            position={worldPosition}
            rotation={worldRotation}
            scale={worldScale}
            castShadow={mesh.castShadow}
            receiveShadow={mesh.receiveShadow}
            material={material}
          />
        );
      })}
    </>
  );
}

// Loading fallback
function LoadingSpinner() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e0e7ff" wireframe />
    </mesh>
  );
}

// Main scene content
function SceneContent({ enableControls, autoRotate }: { enableControls: boolean; autoRotate: boolean }) {
  return (
    <>
      {/* Enhanced lighting for better texture visibility */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.8} />
      <hemisphereLight intensity={0.4} />
      
      {/* Model - wrapped in Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <Model url="/Building-small.glb" />
      </Suspense>
      
      {/* Controls */}
      {enableControls && (
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={1}
          maxDistance={20}
          dampingFactor={0.05}
          enableDamping={true}
        />
      )}
    </>
  );
}

// Main component
export default function Model3D({ 
  className = '',
  autoRotate = true,
  enableControls = false,
}: {
  className?: string;
  autoRotate?: boolean;
  enableControls?: boolean;
}) {
  return (
    <div 
      className={`w-full h-full ${className}`} 
      style={{ 
        minHeight: '400px', 
        position: 'relative', 
        backgroundColor: 'transparent',
      }}
    >
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 1000 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        performance={{ min: 0.5 }}
      >
        <SceneContent enableControls={enableControls} autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
}
