import "./Styling/Scene.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { AxesHelper } from 'three';
import { Antique_Scene } from "../public/Antique_Scene";
import { Passport } from "../public/Passport";
import { Antique_Globe } from "../public/Antique_Globe";


const Scene = () => {

    return (
    <>
        <Canvas camera={{position: [-1, 1.8, 1.5]}} shadows>
          <primitive object={new AxesHelper(5)} />
          <spotLight intensity={20} position={[0,3,0]} castShadow/>
          <ambientLight intensity={0.3}/>
          <Antique_Scene />
          <Antique_Globe scale={0.005} position={[0.05, 0.81, 0.6]}/>
          {/* <Map scale={0.07} position={[0.05, 0.81, 0.6]}/> */}
          <Passport scale={0.01} position={[0.3, 0.88, 0.6]} rotation={[0, Math.PI /2, - Math.PI/4]} onClick={() => console.log("passport clicked")}/>
          <OrbitControls />
        </Canvas>
    </>
    );
  }
  
  export default Scene;