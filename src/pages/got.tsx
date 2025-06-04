import arya from "@/assets/images/got/arya.jpg";
import snow1 from "@/assets/images/got/jon-snow-1.jpg";
import snow2 from "@/assets/images/got/jon-snow-2.png";
import snowNightKing from "@/assets/images/got/snow-nightking.jpeg";
import cersei from "@/assets/images/got/cersei.jpeg";
import gotWall from "@/assets/images/got/got-wall.webp";
import bg from "@/assets/images/got/got.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import powerisPowerAudio from "@/assets/audio/power-is-power.mp3";

gsap.registerPlugin(ScrollTrigger);

export const GOT = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasUserClicked = useRef(false);

  useGSAP(
    () => {
      // Onload Animation
      const valarHeaderSplit = SplitText.create(".valarHeader", {
        type: "lines",
        mask: "lines",
      });
      const tl = gsap.timeline({ paused: true });

      valarHeaderSplit.lines.forEach((split, idx) => {
        tl.from(
          split,
          {
            yPercent: 105,
            duration: 1,
            ease: "expo.inOut",
          },
          0.5 * idx
        );
      });

      const valarTextSplit = SplitText.create(".valarText", {
        type: "lines",
        mask: "lines",
      });

      valarTextSplit.lines.forEach((split, idx) => {
        tl.from(
          split,
          {
            opacity: 0,
            yPercent: 100,
            duration: 2,
            ease: "expo.inOut",
          },
          2 + 0.7 * idx
        );
      });

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
        ".valarHeader",
        {
          y: -100,
          duration: 1,
        },
        0
      );
      scrollTl.to(
        ".valarText",
        {
          y: -200,
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
        wordDelimiter: String.fromCharCode(8205),
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

      document.querySelector(".allowAudio")?.addEventListener("click", () => {
        hasUserClicked.current = true;
        gsap.to(".dummy", {
          height: 0,
          onComplete: () => {
            tl.play();
          },
        });
      });

      ScrollTrigger.create({
        trigger: ".container1",
        start: "top -=105%",
        onEnter: () => {
          // Start the Audio
          if (hasUserClicked.current) {
            audioRef.current?.play();
          }
        },

        onLeaveBack: () => {
          // Restart Audio and set duration to zero
          audioRef.current?.pause();
          audioRef.current!.currentTime = 0;
        },
      });

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
        <audio ref={audioRef} src={powerisPowerAudio} className=""></audio>
        <div className="dummy overflow-hidden fixed inset-0 z-[101] bg-black flex justify-center items-center">
          <button className="bg-ivory text-raisin-black p-2 rounded-md text-2xl font-cinzel px-5 allowAudio">
            Allow Audio
          </button>
        </div>
        <div className="min-h-screen bg-raisin-black relative overflow-hidden container1 mb-[200vh]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-raisin-black opacity-80" />
            <img className="w-full h-full object-cover" src={bg} alt="" />
          </div>
          <div className="py-5 pl-5 lg:py-20 relative z-10">
            <div className="text-ivory lg:pl-16 max-w-[700px] valarHeader">
              <h2 className="italic text-2xl lg:text-7xl font-baskerville mb-3 lg:leading-[94px]">
                Valar morghulis.
              </h2>
              <em className="not-italic font-manrope text-xl lg:text-5xl">
                All men must die.
              </em>
              <h2 className="italic text-2xl lg:text-7xl font-baskerville mt-8 mb-3 lg:leading-[94px]">
                Valar dohaeris.
              </h2>
              <em className="not-italic font-manrope text-xl lg:text-5xl">
                All men must serve.
              </em>
            </div>
          </div>
          <p className="font-manrope lg:text-xl text-ivory max-w-[600px] absolute left-5 w-[80%] lg:ml-auto lg:left-[unset] lg:relative lg:right-16 lg:bottom-48 valarText">
            "Valar Morghulis," they say in Braavos - all men must die. It is not
            merely a phrase, but a grim reminder of the fate that binds all
            mortals.
            <span className="hidden lg:inline">
              In the shadows of the House of Black and White, where the Faceless
              Men serve the Many-Faced God, death is not feared, but revered - a
              gift to be given and received.
            </span>
            The answer, always solemn and unwavering: "Valar Dohaeris" - all men
            must serve. It is the companion truth, the other half of the coin.
            Just as death is inevitable, so too is duty. Service - to a cause,
            to a master, to a god, or to the greater good - defines the lives
            that precede the end.
          </p>
          <div className="flex justify-center items-end gap-x-10 imagesWrapper absolute left-1/2 -translate-x-1/2 bottom-10 z-20">
            <img
              className="w-[300px] aspect-video object-cover object-bottom hidden lg:block"
              src={arya}
              alt=""
            />
            <img
              className="w-[300px] aspect-video object-cover object-bottom hidden lg:block"
              src={snow1}
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
              className="w-[300px] aspect-video object-cover object-bottom hidden lg:block"
              src={snow2}
              alt=""
            />
            <img
              className="w-[300px] aspect-video object-cover object-bottom hidden lg:block"
              src={gotWall}
              alt=""
            />
          </div>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white space-y-4 w-[90%] powerText">
            <span className="block overflow-hidden absolute -top-20 -left-4">
              <span className="block font-cinzel text-8xl rotate-180 quote quote1 w-full">
                "
              </span>
            </span>
            <span className="block overflow-hidden absolute -bottom-24 lg:-bottom-20 -right-4">
              <span className="block font-cinzel text-8xl quote quote2 w-full">
                "
              </span>
            </span>
            <span className="block text-2xl lg:text-4xl text-center font-cinzel test">
              Seize him.&#8205; Cut his throat.&#8205; Stop.&#8205; Wait.&#8205;
              I've changed my mind.&#8205;
            </span>
            <span className="block text-2xl lg:text-4xl text-center font-cinzel">
              Let him go.&#8205; Step back three paces.&#8205; Turn
              around.&#8205; Close your eyes.&#8205;
            </span>
            <span className="block text-6xl lg:text-8xl text-center font-cinzel">
              <span className="font-baskerville uppercase">Power&#8205;</span>{" "}
              <span className="text-4xl lg:text-6xl block lg:inline">
                is&#8205;
              </span>{" "}
              <span className="font-baskerville uppercase">Power&#8205;</span>{" "}
            </span>
          </p>
        </div>
        <div className="h-screen z-[100] relative">
          <img
            className="w-full h-full object-cover"
            src={snowNightKing}
            alt=""
          />
        </div>
      </div>
    </ReactLenis>
  );
};
