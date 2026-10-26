import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 120;
const MAX_DISTANCE = 2.8;

interface NodePositions {
  positions: Float32Array;
  velocities: Float32Array;
}

function useNodes(): NodePositions {
  return useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const radius = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, []);
}

function NetworkScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const { positions, velocities } = useNodes();

  const lineGeometry = useMemo(() => {
    const maxLines = NODE_COUNT * NODE_COUNT;
    const linePositions = new Float32Array(maxLines * 6);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    mouse.current.x = state.mouse.x;
    mouse.current.y = state.mouse.y;

    groupRef.current.rotation.y += 0.0008;
    groupRef.current.rotation.x += 0.0003;

    groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y + state.clock.elapsedTime * 0.0001) * 0.0005;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      posArr[i3] += velocities[i3];
      posArr[i3 + 1] += velocities[i3 + 1];
      posArr[i3 + 2] += velocities[i3 + 2];

      const dist = Math.sqrt(posArr[i3] ** 2 + posArr[i3 + 1] ** 2 + posArr[i3 + 2] ** 2);
      if (dist > 9 || dist < 2) {
        velocities[i3] *= -1;
        velocities[i3 + 1] *= -1;
        velocities[i3 + 2] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    const linePosArr = (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const j3 = j * 3;
        const dx = posArr[i3] - posArr[j3];
        const dy = posArr[i3 + 1] - posArr[j3 + 1];
        const dz = posArr[i3 + 2] - posArr[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < MAX_DISTANCE) {
          linePosArr[lineIdx++] = posArr[i3];
          linePosArr[lineIdx++] = posArr[i3 + 1];
          linePosArr[lineIdx++] = posArr[i3 + 2];
          linePosArr[lineIdx++] = posArr[j3];
          linePosArr[lineIdx++] = posArr[j3 + 1];
          linePosArr[lineIdx++] = posArr[j3 + 2];
        }
      }
    }
    linesRef.current.geometry.setDrawRange(0, lineIdx / 3);
    (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#f97316"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#f97316"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function NetworkBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <NetworkScene />
    </Canvas>
  );
}
