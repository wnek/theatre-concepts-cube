import { getProject } from '@theatre/core';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Point, Points, Torus } from '@react-three/drei';
import { proxy, useSnapshot } from 'valtio';
import { editable as e, SheetProvider } from '@theatre/r3f';
import InstancedModel from '/src/Components/3dmodel';
import stateTheatre from '/src/state.json';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

const modes = ['translate', 'rotate', 'scale'];
const state = proxy({ current: null, mode: 0 });

function Dots() {
  const ref = useRef();
  useLayoutEffect(() => {
    const transform = new THREE.Matrix4();
    for (let i = 0; i < 10000; ++i) {
      const x = (i % 100) - 50;
      const y = Math.floor(i / 100) - 50;
      transform.setPosition(x, y, 0);
      ref.current.setMatrixAt(i, transform);
    }
  }, []);
  return (
    <instancedMesh
      ref={ref}
      args={[null, null, 10000]}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.1, 0.1, 0.1]}
    >
      <circleBufferGeometry args={[0.04]} />
      <meshBasicMaterial color={'#34404D'} />
    </instancedMesh>
  );
}

function Controls() {
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);
  return (
    <>
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode={modes[snap.mode]}
        />
      )}

      <OrbitControls
        dragToLook={false}
        enableZoom={false}
        makeDefault
        maxPolarAngle={Math.PI / 2.6}
      />
    </>
  );
}

export default function App() {
  const sheet = getProject('The Jumping Box', { state: stateTheatre }).sheet(
    'The Jumpidy Jump'
  );

  useLayoutEffect(() => {
    // Play it on load
    sheet.sequence.play({ iterationCount: 1000 });
  });

  return (
    <Canvas
      gl={{ alpha: false, preserveDrawingBuffer: true }}
      camera={{
        near: 0.01,
        far: 1000,
        fov: 100,
        position: [1.5, 0, -1],
        orthographic: true,
      }}
      shadows
    >
      <color attach="background" args={['#1B1D21']} />
      <SheetProvider sheet={sheet}>
        <fog attach="fog" color="#1B1D21" near={1} far={10} />
        <ambientLight intensity={0.5} color={'#ffffff'} />
        <spotLight
          intensity={5}
          angle={0.1}
          position={[20, 30, 30]}
          penumbra={1}
          castShadow
          decay={2}
          power={5}
          color={'#E3C87E'}
        />

        {/* <Dots /> */}

        <InstancedModel />

        {/* <e.mesh uniqueName="Torus" rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshPhongMaterial
            uniqueName="PhongMaterial11"
            transparent
            color="white"
            opacity={0.1}
          />
        </e.mesh> */}
        <Controls />
      </SheetProvider>
    </Canvas>
  );
}
