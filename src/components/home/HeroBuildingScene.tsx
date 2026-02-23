"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

type BuildingGLTF = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

interface BuildingModelProps {
  isHovered: boolean;
}

function BuildingModel({ isHovered }: BuildingModelProps) {
  const { scene } = useGLTF("/dangle.glb") as BuildingGLTF;
  const meshRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const idleTimeRef = useRef(0);
  const rotationOffsetRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    idleTimeRef.current += delta;

    const idleSpeed = 0.35;
    const baseVerticalAmplitude = 0.3;
    const baseRotationSpeed = 0.18;

    const hoverMultiplier = isHovered ? 1.6 : 1.0;
    const verticalAmplitude = baseVerticalAmplitude * hoverMultiplier;
    const rotationSpeed = baseRotationSpeed * hoverMultiplier;

    const targetScale = isHovered ? 1.08 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 2.5
    );

    const t = idleTimeRef.current * idleSpeed;
    meshRef.current.position.y = Math.sin(t * 0.5) * verticalAmplitude;

    rotationOffsetRef.current += delta * rotationSpeed;
    meshRef.current.rotation.y =
      Math.sin(rotationOffsetRef.current * 0.6) * 0.08;
    meshRef.current.rotation.x =
      Math.sin(rotationOffsetRef.current * 0.4) * 0.04;
    meshRef.current.rotation.z =
      Math.sin(rotationOffsetRef.current * 0.5) * 0.12;

    if (lightRef.current) {
      const targetIntensity = isHovered ? 2.0 : 1.6;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        delta * 2.5
      );
    }
  });

  return (
    <group ref={meshRef}>
      <primitive
        object={scene}
        scale={4.5}
        position={[0, -2.5, -1]}
        rotation={[-0.22, Math.PI * 1.833, 0]}
      />
      <directionalLight
        ref={lightRef}
        position={[6, 10, 4]}
        intensity={1.6}
        castShadow={false}
      />
      <directionalLight position={[-4, 5, -2]} intensity={0.5} color="#e3f2fd" />
      <directionalLight position={[-3, 3, -5]} intensity={0.8} color="#ffffff" />
      <ambientLight intensity={0.4} />
      <hemisphereLight
        color="#87CEEB"
        groundColor="#f0f0f0"
        intensity={0.3}
      />
    </group>
  );
}

useGLTF.preload("/dangle.glb");

function LoadingFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 2.5, 1.5]} />
      <meshStandardMaterial color="#e2e8f0" wireframe />
    </mesh>
  );
}

interface Scene3DProps {
  isHovered: boolean;
  scrollProgress: number;
  isMobile: boolean;
}

function Scene3D({ isHovered, scrollProgress, isMobile }: Scene3DProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current || isMobile) return;

    const startZ = 14;
    const endZ = 8;
    const targetZ = THREE.MathUtils.lerp(startZ, endZ, scrollProgress);

    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetZ,
      0.05
    );

    const startFOV = 50;
    const endFOV = 45;
    const targetFOV = THREE.MathUtils.lerp(startFOV, endFOV, scrollProgress);

    cameraRef.current.fov = THREE.MathUtils.lerp(
      cameraRef.current.fov,
      targetFOV,
      0.05
    );
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 1.5, isMobile ? 16 : 14]}
        fov={isMobile ? 55 : 50}
      />
      <Environment preset="city" environmentIntensity={isMobile ? 0.5 : 1} />
      <fog attach="fog" args={["#e0f2fe", 12, 25]} />
      <Suspense fallback={<LoadingFallback />}>
        <BuildingModel isHovered={isHovered} />
      </Suspense>
    </>
  );
}

export default function HeroBuildingScene() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(scrollY / viewportHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        shadows={false}
        dpr={[0.75, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5, max: 0.8 }}
        frameloop="always"
        className="touch-none"
      >
        <Scene3D
          isHovered={isHovered && !isMobile}
          scrollProgress={scrollProgress}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}
