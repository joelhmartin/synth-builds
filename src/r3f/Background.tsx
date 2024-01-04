import { BackSide } from "three";
import { Depth, LayerMaterial } from "lamina";
import { prophetColors } from "../../public/palettes/prophet.ts";
import { Float } from "@react-three/drei";

const Background = () => {
  return (
    <Float floatingRange={[.000015,.00001]} floatIntensity={.00001}>
      <mesh scale={100}>
        <sphereGeometry args={[.4, 64, 64]} />
        <LayerMaterial side={BackSide}>
          <Depth
            colorA={prophetColors[0]}
            colorB={prophetColors[2]}
            alpha={1}
            mode="normal"
            near={130}
            far={200}
            origin={[95, 100, -100]}
          />
        </LayerMaterial>
      </mesh>
    </Float>
  );
};

export default Background;
