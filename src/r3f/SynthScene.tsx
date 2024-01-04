import { Box } from "@chakra-ui/react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MeshToonMaterial } from "three";
import { useLocation } from "wouter";
import useAuthStore from "../authStore";
import MidiController from "../services/midi.client";

const SynthScene = () => {
  const midi = new MidiController();

  console.log(midi);

  const token = useAuthStore((s) => s.token);
  const { size } = useThree();
  const [location] = useLocation();
  const timeline = useRef<any>();
  const synthRef = useRef<any>();
  const synth = useGLTF("/models/Synthesizer.glb");
  const [isChillin, setIsChillin] = useState(true);

  const screenH = size.height / 100;
  const screenW = size.width / 100;
  // const screenZ = 10

  console.log(screenH, screenW);

  useEffect(() => {
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
  }, [location, token]);

  useFrame((_state, delta) => {
    if (isChillin) {
      if (synthRef.current.rotation.y >= Math.PI * 2) {
        synthRef.current.rotation.y = 0;
      }
      synthRef.current.rotation.y += Math.sin(delta * 0.5);
    }
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
          <Html transform position={[0, 0.24, 1]}>
            <Box fontSize={8} className="VCRFont">
              Login to Continue
            </Box>
          </Html>
        )}

      </group>
    </>
  );
};

export default SynthScene;

useGLTF.preload("/models/Synthesizer.glb");
