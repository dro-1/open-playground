import { fragment, vertex } from "@/shaders/wavy-car-shader";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import ReactLenis from "lenis/react";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
import image from "@/assets/images/wavy-car/9.jpeg";
import { useAspect, useTexture } from "@react-three/drei";
import { MotionValue, transform, useScroll } from "framer-motion";

export const WavyCar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main className="min-h-screen relative bg-[#031414]">
        <p className="fixed top-0 left-0 text-white mix-blend-difference font-manrope p-4 z-20">
          Photo by{" "}
          <a
            className="font-manrope italic"
            href="https://unsplash.com/@tionist?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Harry Obahor
          </a>{" "}
          on{" "}
          <a
            className="font-manrope italic"
            href="https://unsplash.com/photos/an-old-car-is-decorated-with-pink-flowers-iKPGjAIck9s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Unsplash
          </a>
        </p>
        <div ref={containerRef} className="h-[300vh] relative">
          <div className="h-screen sticky top-0">
            <Scene scrollProgress={scrollYProgress} />
          </div>
        </div>
        <div className="h-screen"></div>
      </main>
    </ReactLenis>
  );
};

const Scene: React.FC<{ scrollProgress: MotionValue<number> }> = ({
  scrollProgress,
}) => {
  return (
    <Canvas className="h-screen w-screen">
      <Model scrollProgress={scrollProgress} />
    </Canvas>
  );
};

const Model: React.FC<{ scrollProgress: MotionValue<number> }> = ({
  scrollProgress,
}) => {
  const texture = useTexture(image);
  const { width: imageWidth, height: imageHeight } = texture.image;
  const scale = useAspect(imageWidth, imageHeight, 0.3);

  const meshRef = useRef<any>(null);
  const { amplitude, frequency, speed } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.1 },
    frequency: { value: 17, min: 0, max: 50, step: 0.5 },
    speed: { value: 0.03, min: 0, max: 0.5, step: 0.005 },
  });
  const uniforms = useRef({
    uTime: { value: speed },
    uAmplitude: { value: amplitude },
    uFrequency: { value: frequency },
    uTexture: { value: texture },
    uImageSizes: { value: new THREE.Vector2(imageWidth, imageHeight) },
    uPlaneSizes: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    vUvScale: {
      value: new THREE.Vector2(0, 0),
    },
  });

  const { viewport } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;

    const planeWidth = transform(
      scrollProgress.get(),
      [0, 1],
      [scale[0], viewport.width]
    );
    const planeHeight = transform(
      scrollProgress.get(),
      [0, 1],
      [scale[1], viewport.height]
    );

    const planeAspectRatioX = planeWidth / planeHeight;
    const imageAspectRatioX = imageWidth / imageHeight;
    const planeAspectRatioY = planeHeight / planeWidth;
    const imageAspectRatioY = imageHeight / imageWidth;

    meshRef.current.scale.x = planeWidth;
    meshRef.current.scale.y = planeHeight;

    const modifiedAmplitude = transform(
      scrollProgress.get(),
      [0, 1],
      [amplitude, 0]
    );

    meshRef.current.material.uniforms.uTime.value += speed;
    meshRef.current.material.uniforms.uAmplitude.value = modifiedAmplitude;
    meshRef.current.material.uniforms.uFrequency.value = frequency;
    meshRef.current.material.uniforms.uPlaneSizes.value.set(
      window.innerWidth,
      window.innerHeight
    );
    meshRef.current.material.uniforms.vUvScale.value.set(
      Math.min(imageAspectRatioY / planeAspectRatioY, 1),
      Math.min(imageAspectRatioX / planeAspectRatioX, 1)
    );
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1, 45, 45]} />
      <shaderMaterial
        wireframe={false}
        uniforms={uniforms.current}
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  );
};
