/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 Vintage_Desk.glb --transform 
Files: Vintage_Desk.glb [4.92MB] > C:\Users\janae\Desktop\Travel Planner App\Travel-Planner-App\frontend\my-travel-app\public\Vintage_Desk-transformed.glb [482.97KB] (90%)
Author: Loïc (https://sketchfab.com/loichuet1)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/old-desk-scene-9bca78879f35438db7372814e62e924c
Title: Old desk Scene
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Vintage_Desk(props) {
  const { nodes, materials } = useGLTF('/Vintage_Desk-transformed.glb')
  return (
    <group {...props} dispose={null}>
      {/*<mesh geometry={nodes.defaultMaterial.geometry} material={materials.props} />*/}
      <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.bureau} castShadow receiveShadow/>
    </group>
  )
}

useGLTF.preload('/Vintage_Desk-transformed.glb')