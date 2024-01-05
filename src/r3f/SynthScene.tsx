import { Text, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Group, Mesh, MeshToonMaterial } from "three";
import { useLocation } from "wouter";
import useAuthStore from "../authStore";
import MidiController from "../services/midi.client";
import { keyDict } from "../services/keyDict";

const SynthScene = () => {
  const midi = new MidiController();
  const token = useAuthStore((s) => s.token);
  const { size } = useThree();
  const [location] = useLocation();
  const timeline = useRef<any>();
  const synthRef = useRef<any>();
  const synth = useGLTF("/models/Synthesizer.glb");
  const [isChillin, setIsChillin] = useState(true);

  const screenH = size.height / 100;
  const screenW = size.width / 100;

  useEffect(() => {
    console.log(synthRef.current.children[0].children[19].position)
    if (location === "/") {
      setIsChillin(true);
      gsap.to(synthRef.current.position, { duration: 1, x: -screenW / 2.4,  y: -screenH / 2.4 , z: 0,});
      gsap.to(synthRef.current.scale, { duration: 1, x: 0.4, y: 0.4, z: 0.4 });
      gsap.to(synthRef.current.rotation, { duration: 1, x: .2, y: 0, z: 0 })
    } else if (location === "/account") {
      if (token) {
        setIsChillin(true);
        gsap.to(synthRef.current.position, { duration: 1, x: 7.5, y: 1.8, z: 0 });
        gsap.to(synthRef.current.rotation, { duration: 1, x: -5, y: 0, z: 0 });
        gsap.to(synthRef.current.scale, { duration: 1, x: .5, y: .5, z: .5 });
      } else {
        setIsChillin(false);
        gsap.to(synthRef.current.position, { duration: 1, x: 0, y: 0, z: 0 });
        gsap.to(synthRef.current.rotation, { duration: 1, x: 0, y: 0, z: 0 });
        gsap.to(synthRef.current.scale, { duration: 1, x: 2, y: 2, z: 2 });
      }
    } else if (location === "/login") {
      gsap.to(synthRef.current.position, { duration: 1, x: 0, y: -4, z: 0 });
      gsap.to(synthRef.current.rotation, { duration: 1, x: .2, y: 0, z: 0 });
      gsap.to(synthRef.current.scale, { duration: 1, x: .5, y: .5, z: .5 });
    } else if (location.startsWith("/patches")) {
      setIsChillin(false);
      gsap.to(synthRef.current.position, { duration: 1, x: -6.5, y: 0, z: 0 });
      gsap.to(synthRef.current.rotation, { duration: 1, x: -5.7, y: 1, z: 0 });
      gsap.to(synthRef.current.scale, { duration: 1, x: 1, y: 1, z: 1 });
    }

    // USEFUL TO SEE THE BREAKDOWN OF THE SYNTH 
    // console.log(synthRef.current.children[0].children)


  }, [location, token]);

  useFrame((_state, delta) => {
    // Rotation
    if (isChillin) {
      if (synthRef.current.rotation.y >= Math.PI * 2) {
        synthRef.current.rotation.y = 0;
      }
      synthRef.current.rotation.y += Math.sin(delta * 0.5);
    }

    /** KEYS ANIMATIONS */
    synthRef.current.children[0].children.forEach((element: Group | Mesh, index: number) => {
      if (element instanceof Group) {
        if (element.name.includes('Cylinder') && index % 2 == 0)
        element.rotation.y += delta * ((Math.random() - .5) * 50)
      }
      if (element instanceof Mesh && index <= 75 && index >= 16) {
          if (element.name === keyDict[midi.getNote().note]) {
            if (midi.getNote().note != -1) {
              console.log(element.name)
            }
            element.position.y = .335
          } else {
            element.position.y = 0.3999999463558197
          }
 
      }

    });
  });

  useLayoutEffect(() => {
    timeline.current = gsap.timeline();

    timeline.current.from(
      synthRef.current.position,
      {
        duration: 0.5,
        x: -2,
      },
      0.5
    );
  }, []);

  return (
    <>
      <group
        ref={synthRef}
        receiveShadow
        scale={0.4}
        position={[-9.5, -5, 0.01]}
      >

        <primitive object={synth.scene} material={MeshToonMaterial} />
        {location === "/account" && !token && (
          <Text color={'white'} 
            position={[0, 0.24, 1.1]} 
            fontSize={.22} 
            font="/fonts/VCR_OSD_MONO_1.001.ttf"
          >
            Login to Continue
          </Text>
        )}
          <Text color={'white'} 
            position={[0, 0.45, -1.12]} 
            fontSize={.4} 
            font="public/fonts/donner/donner.ttf"
          >
            SYNTH BUILDS
          </Text>
      </group>
    </>
  );
};

export default SynthScene;

useGLTF.preload("/models/Synthesizer.glb");
