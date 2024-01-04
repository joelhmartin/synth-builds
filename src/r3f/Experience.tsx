import {
  Environment,
  Lightformer,
  Sparkles
} from "@react-three/drei";
import { prophetColors } from "../../public/palettes/prophet";
import Background from "./Background";
import SynthScene from "./SynthScene";

const Experience = () => {
  return (
    <>
      <Environment preset="night">
        <Lightformer
          intensity={0.5}
          position={[10, 5, 0]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>

      <Background />

      <ambientLight intensity={1} />

      <Sparkles
        position={[0, 0, -30]}
        size={10}
        scale={100}
        color={prophetColors[4]}
      />
      <Sparkles
        position={[0, 0, -10]}
        size={10}
        scale={50}
        color={prophetColors[5]}
      />
      <Sparkles
        position={[0, 0, -10]}
        size={10}
        scale={50}
        color={prophetColors[2]}
      />
      
      <SynthScene />
    </>
  );
};

export default Experience;
