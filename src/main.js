import $ from "jquery";
import barba from "@barba/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Home from "./animations/home";
import "./sass/style.sass";
// import javascriptLogo from './javascript.svg' // same dir
// import viteLogo from '/vite.svg' // Public folder

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const l = console.log.bind(window.console),
  loadingScreen = $(".loading-screen"),
  // Function to add the page transition screen
  pageTransitionIn = () => {
    return gsap.to(loadingScreen, { duration: 0.5, yPercent: 15 });
  },
  // Function to remove the page transition screen
  pageTransitionOut = (next) => {
    // $("body").addClass("loading");

    return gsap
      .timeline({ delay: 0.5 })
      .add("start")
      .to(
        loadingScreen,
        {
          duration: 0.25,
          // yPercent: 100,
          opacity: 0,
          // ease: 'power1.out',
          onComplete: () => {
            // $("body").removeClass("loading");
            gsap.set(loadingScreen, { yPercent: 100, opacity: 1 });
          },
        },
        "start"
      )
      .call(contentAnimation, [next], "start");
  },
  // Function to animate the content of each page
  contentAnimation = (next) => {
    const { container, namespace } = next,
      body = $("body"),
      tlPage = gsap.timeline().add("start"),
      enterParams = {
        duration: 0.25,
        yPercent: 10,
        opacity: 0,
      };

    body.removeClass("work about course hire").addClass(namespace);

    switch (namespace) {
      case "work":
      case "about":
      case "hire":
      case "course":
        tlPage.from(`#${namespace}`, enterParams, "start");
        break;

      default: // home
        // Home animation
        new Home(container);
        break;
    }
  };

// Init barba with options
barba.init({
  transitions: [
    {
      async leave({ current, next }) {
        // l("leave", current, next)
        l("leave", current.namespace);
        await pageTransitionIn();
        current.container.remove();
      },
      enter: ({ current, next }) => {
        // l("enter", current, next)
        l("enter", next.namespace);
        pageTransitionOut(next);
      },
      once: ({ current, next }) => {
        // l("once", current, next)
        l("once", next.namespace);
        setTimeout(() => {
          pageTransitionOut(next);
        }, 1000);
        // contentAnimation(next.container)
      },
    },
  ],
});
