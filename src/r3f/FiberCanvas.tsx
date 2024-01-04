import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";


function FiberCanvas() {

  return (
    <>
      <Canvas
        orthographic
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
        camera={{
          left: -5,
          right: -10,
          top: -10,
          bottom: -5,
          fov: 64,
          zoom: 100
        }}
      >
        <Experience />

      </Canvas>
    </>
  );
}

export default FiberCanvas;
