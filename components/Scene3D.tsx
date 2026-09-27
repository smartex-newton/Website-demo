 "use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Board() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_,d)=>{ if(ref.current) ref.current.rotation.y += d*0.18; });
  return <group ref={ref} rotation={[-0.15,0.2,0]}>
    <mesh><boxGeometry args={[4.8,.18,3.2]}/><meshStandardMaterial color="#173b35" roughness={.7}/></mesh>
    {[-1.7,-.85,0,.85,1.7].map(x=><mesh key={x} position={[x,.16,0]}><boxGeometry args={[.38,.12,2.55]}/><meshStandardMaterial color="#0c1718"/></mesh>)}
    <mesh position={[0,.34,0]}><boxGeometry args={[1.4,.35,.8]}/><meshStandardMaterial color="#263b3e" metalness={.5}/></mesh>
    {[[-1.7,.35,1.05],[1.7,.35,1.05],[-1.7,.35,-1.05],[1.7,.35,-1.05]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><cylinderGeometry args={[.16,.16,.22,24]}/><meshStandardMaterial color="#c5a54a" metalness={.7}/></mesh>)}
    <mesh position={[0,.45,1.02]}><boxGeometry args={[.65,.35,.18]}/><meshStandardMaterial color="#e5e7eb"/></mesh>
    <Text position={[0,.28,-1.35]} fontSize={.28} color="#b7fff1" rotation={[-Math.PI/2,0,0]}>ELECTROCUTED LAB</Text>
  </group>
}
export default function Scene3D(){ return <Canvas camera={{position:[6,5,7],fov:42}}><ambientLight intensity={1.4}/><directionalLight position={[5,8,5]} intensity={3}/><pointLight position={[-4,3,-3]} intensity={8} color="#20f5c4"/><Board/><gridHelper args={[14,14,"#123d45","#081d23"]}/><OrbitControls enablePan={false}/></Canvas> }