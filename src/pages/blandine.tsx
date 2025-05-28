import picture1 from "@/assets/images/blandine/1.jpeg";
import picture2 from "@/assets/images/blandine/3.jpg";
import picture4 from "@/assets/images/blandine/4.jpeg";
import picture5 from "@/assets/images/blandine/5.jpeg";
import cersei from "@/assets/images/blandine/cersei.jpeg";
import gotWall from "@/assets/images/blandine/got-wall.webp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ReactLenis from "lenis/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Blandine = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      //Animate the middle image using its flex-basis
      const scrollTl = gsap.timeline();
      scrollTl.to(
        ".dummy",
        {
          duration: 3,
        },
        0
      );
      scrollTl.to(
        ".mainImage",
        {
          flexBasis: `${window.innerWidth}px`,
          duration: 1,
        },
        0
      );
      scrollTl.to(
        ".imagesWrapper",
        {
          top: 0,
          bottom: 0,
          duration: 1,
        },
        0
      );
      scrollTl.to(
        ".overlay",
        {
          opacity: 0.5,
          duration: 1,
        },
        0
      );

      scrollTl.from(
        ".quote1",
        {
          yPercent: -100,
          duration: 0.1,
        },
        1
      );
      scrollTl.from(
        ".quote2",
        {
          yPercent: 100,
          duration: 0.1,
        },
        1.1
      );

      const split = SplitText.create(".powerText", {
        type: "words",
        wordDelimiter: "/",
        mask: "words",
        ignore: ".quote",
      });
      scrollTl.addLabel("powerText", 1.2);

      split.words.forEach((word, idx) => {
        const duration = 0.8 / split.words.length;
        scrollTl.from(
          word,
          {
            yPercent: 100,
            duration,
          },
          `powerText+=${idx * duration}`
        );
      });

      console.log(split.words);

      ScrollTrigger.create({
        trigger: ".container1",
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: false,
        scrub: true,
        animation: scrollTl,
      });
    },
    { scope: containerRef.current! }
  );

  return (
    <ReactLenis root>
      <div ref={containerRef}>
        <div className="dummy absolute h-0 w-0" />
        <div className="min-h-screen bg-raisin-black relative overflow-hidden container1 mb-[200vh]">
          <div className="py-20">
            <div className="text-ivory pl-16 max-w-[700px]">
              <h2 className="italic text-7xl font-baskerville mb-3">
                Valar morghulis.
              </h2>
              <em className="not-italic font-manrope text-5xl">
                All men must die.
              </em>
              <h2 className="italic text-7xl font-baskerville mt-8 mb-3">
                Valar dohaeris.
              </h2>
              <em className="not-italic font-manrope text-5xl">
                All men must serve.
              </em>
            </div>
          </div>
          <p className="font-manrope text-xl text-ivory max-w-[600px] ml-auto relative bottom-20">
            "Valar Morghulis," they say in Braavos — all men must die. It is not
            merely a phrase, but a grim reminder of the fate that binds all
            mortals. In the shadows of the House of Black and White, where the
            Faceless Men serve the Many-Faced God, death is not feared, but
            revered — a gift to be given and received. The answer, always solemn
            and unwavering: "Valar Dohaeris" — all men must serve. It is the
            companion truth, the other half of the coin. Just as death is
            inevitable, so too is duty. Service — to a cause, to a master, to a
            god, or to the greater good — defines the lives that precede the
            end.
          </p>
          <div className="flex justify-center items-end gap-x-10 imagesWrapper absolute left-1/2 -translate-x-1/2 bottom-10">
            <img
              className="w-[300px] aspect-video object-cover object-bottom"
              src={picture1}
              alt=""
            />
            <img
              className="w-[300px] aspect-video object-cover object-bottom"
              src={picture2}
              alt=""
            />
            <div className="w-[300px] basis-[300px] shrink-0 self-stretch aspect-video mainImage relative">
              <div className="overlay bg-black opacity-0 absolute inset-0" />
              <img
                className="w-full h-full object-cover object-top mainImage"
                src={cersei}
                alt=""
              />
            </div>
            <img
              className="w-[300px] aspect-video object-cover object-bottom"
              src={picture4}
              alt=""
            />
            <img
              className="w-[300px] aspect-video object-cover object-bottom"
              src={picture5}
              alt=""
            />
          </div>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white space-y-4 w-[90%] powerText">
            <div className="block overflow-hidden absolute -top-20 -left-4">
              <span className="block font-cinzel text-8xl rotate-180 quote quote1 w-full">
                "
              </span>
            </div>
            <div className="block overflow-hidden absolute -bottom-20 -right-4">
              <span className="block font-cinzel text-8xl quote quote2 w-full">
                "
              </span>
            </div>
            <span className="block text-4xl text-center font-cinzel test">
              Seize him./ Cut his throat./ Stop./ Wait./ I've changed my mind./
            </span>
            <span className="block text-4xl text-center font-cinzel">
              Let him go./ Step back three paces./ Turn around./ Close your
              eyes./
            </span>
            <span className="block text-8xl text-center font-cinzel">
              <span className="font-baskerville uppercase">Power/</span>{" "}
              <span className="text-6xl">is/</span>{" "}
              <span className="font-baskerville uppercase">Power/</span>{" "}
            </span>
          </p>
        </div>
        <div className="h-screen z-[100] relative">
          <img className="w-full h-full object-cover" src={gotWall} alt="" />
        </div>
      </div>
    </ReactLenis>
  );
};
