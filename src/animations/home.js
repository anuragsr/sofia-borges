import $ from "jquery";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const tlGlobal = [];
window.tlGlobal = tlGlobal;

// Home Animations Class
export default class Home {
  constructor(el) {
    this.el = el;
    // Hero Images
    this.heroImages = $("#section0 .grid > div");
    this.heroFlipImages = $("#section0 .grid > div.flip");

    // Carousel
    this.tickerWrapper = $(".ticker-wrapper");
    this.list = this.tickerWrapper.find("ul.list");
    this.clonedList = this.list.clone();
    this.infinite = gsap.timeline({ repeat: -1, paused: true });

    this.init();
  }

  init() {
    // // Hero images animation
    // this.heroImagesAnims();

    // Ticker animation
    this.tickerAnim();

    // Events
    // this.addEvents()
  }

  heroImagesAnims() {
    // Individual animations
    const { heroFlipImages } = this,
      flipParams = [
        {
          el: heroFlipImages.eq(0),
          timeOffset: 0.02,
          flipScale: 0.75,
          maskTop: "25%",
          start: 0.64,
          end: 0.805,
          timeScale: 1.25,
        },
        {
          el: $(heroFlipImages[1]),
          timeOffset: 0.03,
          flipScale: 0.75,
          maskTop: "25%",
          start: 0.16,
          end: 0.4,
          timeScale: 1.35,
        },
        {
          el: $(heroFlipImages[2]),
          timeOffset: 0.035,
          flipScale: 0.75,
          maskTop: "25%",
          start: 0.16,
          end: 0.42,
          timeScale: 1.45,
        },
        {
          el: $(heroFlipImages[3]),
          timeOffset: 0.035,
          flipScale: 0.75,
          maskTop: "25%",
          start: 0.15,
          end: 0.4,
          timeScale: 1.45,
        },
        {
          el: $(heroFlipImages[4]),
          timeOffset: 0.02,
          flipScale: 0.73,
          maskTop: "25%",
          start: 0.075,
          end: 0.435,
          timeScale: 1.35,
        },
        {
          el: $(heroFlipImages[5]),
          timeOffset: 0.03,
          flipScale: 0.75,
          maskTop: "25%",
          start: 0.2,
          end: 0.435,
          timeScale: 1.35,
        },
        {
          el: $(heroFlipImages[6]),
          timeOffset: 0.035,
          flipScale: 0.75,
          maskTop: "27%",
          start: 0,
          end: 0.33,
          timeScale: 1.35,
        },
        {
          el: $(heroFlipImages[7]),
          timeOffset: 0.03,
          flipScale: 0.75,
          maskTop: "25%",
          start: 0.0,
          end: 0.36,
          timeScale: 1.35,
        },
        {
          el: $(heroFlipImages[8]),
          timeOffset: 0.02,
          flipScale: 0.73,
          maskTop: "25%",
          start: 0.075,
          end: 0.465,
          timeScale: 1.45,
        },
        {
          el: $(heroFlipImages[9]),
          timeOffset: 0.035,
          flipScale: 0.75,
          maskTop: "25%",
          start: 0.15,
          end: 0.4,
          timeScale: 1.45,
        },
        {
          el: $(heroFlipImages[10]),
          timeOffset: 0.035,
          flipScale: 0.75,
          maskTop: "27%",
          start: 0,
          end: 0.33,
          timeScale: 1.35,
        },
      ],
      fullPath = (el) => {
        el = el[0];
        var names = [];
        while (el.parentNode) {
          if (el.id) {
            names.unshift("#" + el.id);
            break;
          } else {
            if (el == el.ownerDocument.documentElement)
              names.unshift(el.tagName);
            else {
              for (
                var c = 1, e = el;
                e.previousElementSibling;
                e = e.previousElementSibling, c++
              );
              names.unshift(el.tagName + ":nth-child(" + c + ")");
            }
            el = el.parentNode;
          }
        }
        return names.join(" > ");
      },
      singleHeroImageTls = () => {
        flipParams.forEach((param, idx) => {
          // Text animation timeline
          const split = new SplitText(param.el.find(".animated-text"), {
              type: "chars",
            }),
            tl = gsap.timeline({ paused: true }),
            dur = 2,
            each = dur * param.timeOffset, // controls spacing
            flipImage = param.el.find(".flip-inner");

          let path = fullPath(param.el.find(".path-for-text"));
          if (![0, 4, 8].includes(idx)) {
            MotionPathPlugin.convertToPath(path);
            path = fullPath(param.el.find(".path-for-text"));
          }
          split.chars.forEach((char, i) => {
            let timeOffset = (i + 1) * each,
              startTime = dur / 2 + timeOffset,
              pathOffset = startTime / dur;

            tl.to(
              char,
              {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: true,
                  start: pathOffset,
                  end: 1 + pathOffset,
                },
                immediateRender: true,
                ease: "none",
              },
              0
            );
          });

          gsap.set(param.el.find(".screen"), { top: param.maskTop });

          // Mouse event handlers
          param.el.on({
            mouseenter: (e) => {
              gsap.to(flipImage, {
                duration: 0.5,
                // scale: param.flipScale,
                scale: 0.95,
                rotateX: 180,
              });
              // gsap
              //   .fromTo(
              //     tl,
              //     {
              //       progress: param.start,
              //     },
              //     {
              //       delay: 0.2,
              //       duration: 1,
              //       progress: param.end,
              //       onComplete: tl.pause,
              //     }
              //   )
              //   .timeScale(param.timeScale); // controls animation speed
            },
            mouseleave: (e) => {
              gsap.to(flipImage, {
                delay: 0.2,
                duration: 0.5,
                scale: 1,
                rotateX: 0,
              });
              // gsap
              //   .fromTo(
              //     tl,
              //     {
              //       progress: tl.progress(),
              //       // progress: param.end,
              //     },
              //     {
              //       duration: 1,
              //       progress: param.start,
              //       onComplete: tl.pause,
              //     }
              //   )
              //   .timeScale(param.timeScale); // controls animation speed
            },
          });

          tlGlobal.push(tl);
        });
      };

    // Appearing animation
    gsap
      .timeline({
        onComplete: singleHeroImageTls,
      })
      .from(this.heroImages, {
        delay: 1,
        opacity: 0,
        x: "random(-50, 50, 5)",
        y: "random(-50, 50, 5)",
        scale: 0.9,
        stagger: 0.05,
        duration: 0.75,
      });
  }

  tickerAnim() {
    const time = 50,
      { tickerWrapper, list, clonedList, infinite } = this;
    let listWidth = 0;

    list.find("li").each(function (i) {
      listWidth += $(this, i).outerWidth(true);
    });

    // const endPos = tickerWrapper.width() - listWidth
    list.add(clonedList).css({ width: listWidth + "px" });
    clonedList.addClass("cloned").appendTo(tickerWrapper);

    infinite
      .fromTo(
        list,
        time,
        { rotation: 0.01, x: 0 },
        { force3D: true, x: -listWidth, ease: "Linear.easeNone" },
        0
      )
      .fromTo(
        clonedList,
        time,
        { rotation: 0.01, x: listWidth },
        { force3D: true, x: 0, ease: "Linear.easeNone" },
        0
      )
      .set(list, { force3D: true, rotation: 0.01, x: listWidth })
      .to(
        clonedList,
        time,
        {
          force3D: true,
          rotation: 0.01,
          x: -listWidth,
          ease: "Linear.easeNone",
        },
        time
      )
      .to(
        list,
        time,
        { force3D: true, rotation: 0.01, x: 0, ease: "Linear.easeNone" },
        time
      )
      .progress(1)
      .progress(0)
      .play();
  }

  addEvents() {
    // Pause / Play
    this.tickerWrapper
      .on("mouseenter", () => {
        this.infinite.pause();
      })
      .on("mouseleave", () => {
        this.infinite.play();
      });
  }
}
