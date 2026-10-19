import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'

function SproutModel({ listening = false }:{listening?:boolean}){
  const ref = useRef<any>()
  const [t, setT] = useState(0)
  useFrame((state, delta) => {
    setT((v) => v + delta)
    if(ref.current){
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.15
      ref.current.position.y = 0.1 + Math.sin(t * 0.8) * 0.03
    }
  })

  return (
    <group ref={ref}>
      {/* body */}
      <mesh position={[0,0.3,0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#50EAB2" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* visor */}
      <mesh position={[0,0.45,0.23]}>
        <boxGeometry args={[0.42,0.18,0.06]} />
        <meshStandardMaterial color="#102B46" emissive="#35C8FF" emissiveIntensity={0.15} />
      </mesh>

      {/* leaves */}
      <mesh position={[0,0.85,0]} rotation={[0,0,0.2]}>
        <coneGeometry args={[0.12,0.36,8]} />
        <meshStandardMaterial color="#50EAB2" emissive="#7CEAFF" emissiveIntensity={0.1} />
      </mesh>

      {/* platform */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[0.5,0.62,64]} />
        <meshStandardMaterial color="#0C1B2E" emissive="#35C8FF" emissiveIntensity={0.03} transparent opacity={0.9} />
      </mesh>

      {/* simple eyes */}
      <mesh position={[0.08,0.44,0.26]}> 
        <sphereGeometry args={[0.03,16,16]} />
        <meshStandardMaterial color="#7CEAFF" emissive="#7CEAFF" />
      </mesh>
      <mesh position={[-0.08,0.44,0.26]}> 
        <sphereGeometry args={[0.03,16,16]} />
        <meshStandardMaterial color="#7CEAFF" emissive="#7CEAFF" />
      </mesh>
    </group>
  )
}

export default function Sprout(){
  const [muted, setMuted] = useState(false)
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1.2, 2.5], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5,5,5]} intensity={0.8} />
        <SuspenseFallback />
        <SproutModel />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI/2} />
      </Canvas>
      <div className="mt-2 flex items-center gap-2">
        <button className="px-3 py-1 glass rounded" onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
        <button className="px-3 py-1 glass rounded">Open Chat</button>
      </div>
    </div>
  )
}

function SuspenseFallback(){
  return (
    <Html center>
      <div className="p-2 glass rounded text-sm">Loading Sprout…</div>
    </Html>
  )
}
