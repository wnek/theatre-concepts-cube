/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { editable as e, SheetProvider } from '@theatre/r3f';
import React, { useRef, useMemo } from 'react';
import { useGLTF, Merged } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/cube-transformed.glb');
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.1}>
        <e.mesh
          uniqueName="The Box"
          geometry={nodes.Cube.geometry}
          material={materials['Material.005']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/cube-transformed.glb');
