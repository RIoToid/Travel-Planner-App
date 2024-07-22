import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Plane, Shadow } from "@react-three/drei";
import { AxesHelper, PlaneGeometry } from 'three';
import { useControls } from 'leva'
import "./App.css";

import { Vintage_Desk } from "../public/Vintage_Desk";
import { Chair } from "../public/Chair"
import { Passport } from "../public/Passport";
import { Map } from "../public/Map";

const App = () => {

  return (
    <Canvas camera={{position: [-1, 1.5, 3]}} shadows>
      <primitive object={new AxesHelper(5)} />
      
      <spotLight intensity={20} position={[0,3,0]} castShadow/>
      
      <ambientLight intensity={0.3}/>
      <mesh position={[0,-0.8, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[10]} />
        <meshStandardMaterial />
    </mesh>
      <Vintage_Desk />
      <Map scale={0.1} position={[0, 0.4, 0]} rotation={[0, Math.PI/16, 0]}/>
      <Chair scale={1.15} position={[0.2, -0.8, 1]} rotation={[0, - Math.PI /4, 0]}/>
      <Passport scale={0.02} position={[0.5, 0.5, -0.1]} rotation={[0, Math.PI /3, 0]} onClick={() => console.log("passport clicked")}/>
      <OrbitControls />
    </Canvas>
  )
}

export default App;