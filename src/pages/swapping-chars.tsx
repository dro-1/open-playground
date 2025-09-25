import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

const frederickaFontSize: {
  [key: string]: { size: number; y?: number; x?: number };
} = {
  a: {
    size: 44,
  },
  b: {
    size: 36,
    y: 6,
  },
  c: {
    size: 44,
  },
  d: {
    size: 44,
    x: 1,
  },
  e: {
    size: 36,
    y: 6,
  },
  f: {
    size: 36,
    y: 6,
  },
  g: {
    size: 44,
  },
  h: {
    size: 40,
    y: 5,
  },
  i: {
    size: 40,
    y: 5,
  },
  j: {
    size: 36,
    y: 10,
  },
  k: {
    size: 36,
    y: 6,
  },
  l: {
    size: 34,
    y: 6,
  },
  m: {
    size: 40,
    y: 5,
  },
  n: {
    size: 44,
    x: 2,
  },
  o: {
    size: 44,
  },
  p: {
    size: 36,
    y: 6,
  },
  q: {
    size: 44,
  },
  r: {
    size: 36,
    y: 6,
  },
  s: {
    size: 36,
    y: 6,
  },
  t: {
    size: 36,
    y: 6,
  },
  u: {
    size: 44,
  },
  v: {
    size: 40,
    x: 6,
    y: 6,
  },
  w: {
    size: 36,
    y: 6,
    x: 6,
  },
  x: {
    size: 40,
    y: 5,
    x: 2,
  },
  y: {
    size: 36,
    y: 6,
    x: 4,
  },
  z: {
    size: 40,
    x: 2,
    y: 5,
  },
  ",": {
    size: 48,
  },
  ".": {
    size: 48,
  },
  "'": {
    size: 48,
  },
};

const directions = ["TOP", "LEFT", "RIGHT", "BOTTOM"];

gsap.registerPlugin(useGSAP, SplitText);
export const SwappingChars = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline>(null);
  const charHandlers = useRef<Array<() => void>>(null);
  const charsAnimatingState = useRef<Array<boolean>>(null);

  useGSAP(
    () => {
      // const toggleCharacter = (textSplit: SplitText): gsap.core.Timeline => {
      //   const randomCharIdx = gsap.utils.random(
      //     0,
      //     textSplit.chars.length - 1,
      //     1
      //   );
      //   const randomDirection = gsap.utils.random(directions);

      //   const randomChar = textSplit.chars[randomCharIdx];
      //   const char = (
      //     textSplit.chars[randomCharIdx] as HTMLElement
      //   ).innerText[0].toLowerCase();

      //   const spanHTMLString = `
      //       <span class="font-fredericka absolute uppercase  ${
      //         randomDirection == "TOP" ? "top-full left-0" : ""
      //       } ${randomDirection == "LEFT" ? "top-0 left-full" : ""} ${
      //     randomDirection == "RIGHT" ? "top-0 -left-full" : ""
      //   } ${
      //     randomDirection == "BOTTOM" ? "-top-full left-0" : ""
      //   } " style="font-size: ${
      //     frederickaFontSize[char].size
      //   }px; transform: translate(${frederickaFontSize[char].x ?? 0}px, ${
      //     frederickaFontSize[char].y ?? 0
      //   }px)">${char}</span>
      //   `;
      //   const template = document.createElement("template");
      //   template.innerHTML = spanHTMLString;
      //   const ghostSpan = template.content.firstElementChild;

      //   randomChar.appendChild(ghostSpan!);
      //   const tl = gsap.timeline({ onComplete: () => ghostSpan?.remove() });
      //   tl.fromTo(
      //     randomChar,
      //     { yPercent: 0, xPercent: 0 },
      //     {
      //       yPercent:
      //         randomDirection == "TOP"
      //           ? -100
      //           : randomDirection == "BOTTOM"
      //           ? 100
      //           : undefined,
      //       xPercent:
      //         randomDirection == "LEFT"
      //           ? -100
      //           : randomDirection == "RIGHT"
      //           ? 100
      //           : undefined,
      //     }
      //   ).to(
      //     randomChar,
      //     {
      //       yPercent: 0,
      //       xPercent: 0,
      //     },
      //     ">1"
      //   );

      //   return tl;
      // };
      const toggleCharacterWithCharacter = (
        randomChar: HTMLElement,
        onComplete: () => void
      ): gsap.core.Timeline => {
        const randomDirection = gsap.utils.random(directions);
        const char = randomChar.innerText[0].toLowerCase();

        const spanHTMLString = `
            <span class="font-fredericka absolute uppercase  ${
              randomDirection == "TOP" ? "top-full left-0" : ""
            } ${randomDirection == "LEFT" ? "top-0 left-full" : ""} ${
          randomDirection == "RIGHT" ? "top-0 -left-full" : ""
        } ${
          randomDirection == "BOTTOM" ? "-top-full left-0" : ""
        } " style="font-size: ${
          frederickaFontSize[char].size
        }px; transform: translate(${frederickaFontSize[char].x ?? 0}px, ${
          frederickaFontSize[char].y ?? 0
        }px)">${char}</span>
        `;
        const template = document.createElement("template");
        template.innerHTML = spanHTMLString;
        const ghostSpan = template.content.firstElementChild;

        randomChar.appendChild(ghostSpan!);
        const tl = gsap.timeline({
          onComplete: () => {
            ghostSpan?.remove();
            onComplete();
          },
        });
        tl.fromTo(
          randomChar,
          { yPercent: 0, xPercent: 0 },
          {
            yPercent:
              randomDirection == "TOP"
                ? -100
                : randomDirection == "BOTTOM"
                ? 100
                : undefined,
            xPercent:
              randomDirection == "LEFT"
                ? -100
                : randomDirection == "RIGHT"
                ? 100
                : undefined,
          }
        ).to(
          randomChar,
          {
            yPercent: 0,
            xPercent: 0,
          },
          ">0.3"
        );

        return tl;
      };
      // const toggleCharacterTest = (
      //   textSplit: SplitText,
      //   direction: string
      // ): gsap.core.Timeline => {
      //   const randomCharIdx = gsap.utils.random(
      //     0,
      //     textSplit.chars.length - 1,
      //     1
      //   );

      //   const randomChar = textSplit.chars[randomCharIdx];
      //   const char = (
      //     textSplit.chars[randomCharIdx] as HTMLElement
      //   ).innerText[0].toLowerCase();

      //   const spanHTMLString = `
      //       <span class="font-fredericka absolute uppercase select-none ${
      //         direction == "TOP" ? "top-full left-0" : ""
      //       } ${direction == "LEFT" ? "top-0 left-full" : ""} ${
      //     direction == "RIGHT" ? "top-0 -left-full" : ""
      //   } ${
      //     direction == "BOTTOM" ? "-top-full left-0" : ""
      //   } " style="font-size: ${
      //     frederickaFontSize[char].size
      //   }px; transform: translate(${frederickaFontSize[char].x ?? 0}px, ${
      //     frederickaFontSize[char].y ?? 0
      //   }px)">${char}</span>
      //   `;
      //   const template = document.createElement("template");
      //   template.innerHTML = spanHTMLString;
      //   const ghostSpan = template.content.firstElementChild;

      //   randomChar.appendChild(ghostSpan!);
      //   const tl = gsap.timeline({});
      //   for (const direction of directions) {
      //     if (direction == "TOP") {
      //       tl.set(ghostSpan, { top: "100%", left: 0 }, "<1.5");
      //     }
      //     if (direction == "LEFT") {
      //       tl.set(ghostSpan, { top: 0, left: "100%" }, "<1.5");
      //     }
      //     if (direction == "RIGHT") {
      //       tl.set(ghostSpan, { top: 0, left: "-100%" }, "<1.5");
      //     }
      //     if (direction == "BOTTOM") {
      //       tl.set(ghostSpan, { top: "-100%", left: 0 }, "<1.5");
      //     }

      //     tl.fromTo(
      //       randomChar,
      //       { yPercent: 0, xPercent: 0 },
      //       {
      //         yPercent:
      //           direction == "TOP"
      //             ? -100
      //             : direction == "BOTTOM"
      //             ? 100
      //             : undefined,
      //         xPercent:
      //           direction == "LEFT"
      //             ? -100
      //             : direction == "RIGHT"
      //             ? 100
      //             : undefined,
      //       }
      //     ).to(
      //       randomChar,
      //       {
      //         yPercent: 0,
      //         xPercent: 0,
      //       },
      //       ">1"
      //     );
      //   }

      //   return tl;
      // };

      SplitText.create("p", {
        type: "words, chars",
        mask: "chars",
        autoSplit: true,
        onSplit: (self) => {
          // Initialize charHandlers.current as an array of no-op functions
          charHandlers.current = new Array(self.chars.length).fill(() => {});
          charsAnimatingState.current = new Array(self.chars.length).fill(
            false
          );
          self.chars.forEach((char, idx) => {
            const charHandler = () => {
              if (charsAnimatingState.current![idx]) return;
              charsAnimatingState.current![idx] = true;
              toggleCharacterWithCharacter(char as HTMLElement, () => {
                charsAnimatingState.current![idx] = false;
              });
            };
            charHandlers.current![idx] = charHandler;
            (char as HTMLElement).addEventListener("mouseenter", charHandler);
          });
          //   activeTimelineRef.current = toggleCharacter(self);
          //   intervalIdRef.current = setInterval(
          //     () => toggleCharacter(self),
          //     1000
          //   );
        },
        onRevert: (self) => {
          if (intervalIdRef.current) clearInterval(intervalIdRef.current);
          if (activeTimelineRef.current) activeTimelineRef.current.revert();
          self.chars.forEach((char, idx) => {
            (char as HTMLElement).removeEventListener(
              "mouseenter",
              charHandlers.current![idx]
            );
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-[#070a0e] h-screen w-full flex justify-center items-center flex-col"
    >
      {/* <div className="flex mb-20">
        <h1 className="uppercase text-white text-5xl font-cinzel">z</h1>
        <h1 className="uppercase text-white text-5xl font-fredericka">z</h1>
      </div> */}

      {/* <p className="text-white font-cinzel text-5xl max-w-4xl mx-auto">z</p> */}
      <p className="text-white font-cinzel text-5xl max-w-4xl mx-auto">
        A whisper on the wind, a face in the mirror that isn't yours. On this
        site, identities are fluid, and every step you take could be in someone
        else's shoes. Welcome to the great exchange.
      </p>
    </div>
  );
};
