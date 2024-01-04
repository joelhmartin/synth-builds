import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";


function FiberCanvas() {

  return (
    <>
      <Canvas
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
        camera={{
          fov: 64,
          position: [0, 0, 10],
        }}
      >
        <Experience />

      </Canvas>
    </>
  );
}

export default FiberCanvas;
