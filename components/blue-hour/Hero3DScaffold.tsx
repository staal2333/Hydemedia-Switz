'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useEasterEggs } from './easter-eggs/EasterEggsProvider';

type Variant = 'right' | 'embrace' | 'behind';

const VIEWS: Record<Variant, { cam: [number, number, number]; look: [number, number, number]; scale: number; rotY: number }> = {
  right:   { cam: [14, 2, 17], look: [0, 2, 0], scale: 5.2, rotY: -0.35 },
  embrace: { cam: [11, 1, 14], look: [0, 3, 0], scale: 5.6, rotY: -0.55 },
  behind:  { cam: [0, 4, 22],  look: [0, 4, 0], scale: 6.0, rotY: -0.05 },
};

function BuildingModel({
  baseRotY,
  scale,
  spinTrigger,
  cursorX,
}: {
  baseRotY: number;
  scale: number;
  spinTrigger: number;
  cursorX: number;
}) {
  const { scene } = useGLTF('/dangle.glb') as any;
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(0);
  const rotY = useRef(baseRotY);
  const spinStart = useRef(0);
  const lastTrigger = useRef(spinTrigger);
  const SPIN_DURATION = 1.2;

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    t.current += dt;

    // Detect spin trigger
    if (spinTrigger !== lastTrigger.current) {
      spinStart.current = t.current;
      lastTrigger.current = spinTrigger;
    }

    const spinElapsed = t.current - spinStart.current;
    const spinning = spinElapsed >= 0 && spinElapsed < SPIN_DURATION;
    const spinProgress = spinning ? spinElapsed / SPIN_DURATION : 0;
    // Spin out 90° and back — sine wave gives smooth there-and-back-again motion
    const spinAngle = spinning ? Math.sin(spinProgress * Math.PI) * (Math.PI / 2) : 0;
    const bounce = spinning ? Math.sin(spinProgress * Math.PI) * 0.3 : 0;

    // Cursor tilt — small horizontal influence on rotation
    const cursorTilt = (cursorX - 0.5) * 0.15;

    rotY.current += (baseRotY + cursorTilt - rotY.current) * dt * 2;
    groupRef.current.rotation.y = rotY.current + Math.sin(t.current * 0.35) * 0.05 + spinAngle;
    groupRef.current.rotation.z = Math.sin(t.current * 0.42) * 0.015;
    groupRef.current.position.y = -1.5 + Math.sin(t.current * 0.5) * 0.25 + bounce;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/dangle.glb');

interface Props { variant?: Variant; }

export default function Hero3DScaffold({ variant = 'right' }: Props) {
  const v = VIEWS[variant] ?? VIEWS.right;
  const [spinTrigger, setSpinTrigger] = useState(0);
  const { cursor } = useEasterEggs();

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onClick={() => setSpinTrigger((n) => n + 1)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') setSpinTrigger((n) => n + 1); }}
      aria-label="Klicken, um das Gebäude rotieren zu lassen"
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="touch-none"
      >
        <PerspectiveCamera makeDefault position={v.cam} fov={32} />
        <CameraLookAt target={v.look} />

        <ambientLight intensity={0.55} color="#a8c0dc" />
        <directionalLight position={[10, 14, 8]} intensity={1.6} color="#fff0c8" />
        <directionalLight position={[-8, 6, -4]} intensity={0.7} color="#6b8fb5" />
        <directionalLight position={[-4, 5, -10]} intensity={1.0} color="#ffb877" />

        <Suspense fallback={null}>
          <BuildingModel
            baseRotY={v.rotY}
            scale={v.scale}
            spinTrigger={spinTrigger}
            cursorX={cursor.x}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function CameraLookAt({ target }: { target: [number, number, number] }) {
  useFrame(({ camera }) => {
    camera.lookAt(target[0], target[1], target[2]);
  });
  return null;
}
