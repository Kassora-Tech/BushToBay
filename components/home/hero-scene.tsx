"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  ContactShadows,
  Sphere,
  Torus,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { Mesh } from "three";

function FloatingBlob() {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.12 + pointer.x * 0.3;
    mesh.current.rotation.x = pointer.y * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={mesh} args={[1.35, 96, 96]} position={[0, 0.1, 0]}>
        <MeshDistortMaterial
          color="#388e59"
          distort={0.42}
          speed={1.6}
          roughness={0.15}
          metalness={0.55}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRing() {
  const ring = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    ring.current.rotation.x = Math.PI / 2.3 + Math.sin(clock.elapsedTime * 0.3) * 0.1;
    ring.current.rotation.z = clock.elapsedTime * 0.18;
  });
  return (
    <Torus ref={ring} args={[2.15, 0.035, 24, 120]} position={[0, 0.1, 0]}>
      <meshStandardMaterial color="#00b1f1" metalness={0.85} roughness={0.2} emissive="#00b1f1" emissiveIntensity={0.35} />
    </Torus>
  );
}

function SmallSatellite({ offset, radius, color }: { offset: number; radius: number; color: string }) {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime * 0.5 + offset;
    mesh.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.3) * 0.55, Math.sin(t) * radius);
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.14, 1]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.2], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
      className="!pointer-events-none"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 3]} intensity={1.1} />
        <FloatingBlob />
        <OrbitRing />
        <SmallSatellite offset={0} radius={2.6} color="#d5c4a3" />
        <SmallSatellite offset={2.4} radius={2.9} color="#2cc9ff" />
        <SmallSatellite offset={4.4} radius={2.4} color="#8cc9a1" />
        <ContactShadows position={[0, -1.7, 0]} opacity={0.35} scale={9} blur={2.6} far={3.2} />
        <Environment preset="city" />
        <EffectComposer>
          <Bloom intensity={0.35} luminanceThreshold={0.75} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
