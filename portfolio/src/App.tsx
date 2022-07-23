import React, { useEffect, useRef } from 'react';

import './App.sass';

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import AppContextProvider from './store/AppContext'
import Header from './components/Header/Header';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';

import { ReactComponent as CrystalMoving } from './media/phold_crystal.svg';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

function App() {

  const crystalRef: React.MutableRefObject<null | SVGSVGElement> = useRef(null);
  const projectsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
  // const pathRef: React.MutableRefObject<null> = useRef(null);

  useEffect(() => {

    const elementGetter = gsap.utils.selector(projectsRef.current);
    const projects: HTMLElement[] = elementGetter('[class*="project"]');

    // MotionPathPlugin.convertToPath("#flightPath");
    // gsap.set("#flightPath", { rotation: 15 });
    // gsap.to(sRef.current, {
    //   duration: 20,
    //   motionPath: {
    //     path: "#flightPath",
    //     align: "#flightPath",
    //     alignOrigin: [0.5, 0.5]
    //   },
    //   ease: "none",
    //   repeat: -1
    // });

    // MotionPathPlugin.convertToPath("#motionPath");

    gsap.to(projects, {
      xPercent: -100 * (projects.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: projectsRef.current,
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        // markers: true,
        // start: 'center center',
        pin: true,
        end: 4 * projects[0].offsetWidth,
        snap: 1 / 4,
        pinSpacing: true
      },
    });

    gsap.to(crystalRef.current, {
      // x: -1800,
      // rotateZ: 180,
      ease: "none",
      immediateRender: true,
      // duration: 20,
      // repeat: -1,
      scrollTrigger: {
        trigger: "#motionPath",
        toggleActions: 'restart pause reverse pause',
        scrub: 2,
        // markers: true,

        start: 'top center',
        end: '+=1000px',
        // pin: true,
        // pinSpacing: false
      },
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: 90,
      },
    });

    // gsap.to(project, {
    //   x: -2 * project[0].offsetWidth,
    //   duration: 40,
    //   scrollTrigger: {
    //     trigger: project,
    //     toggleActions: 'restart pause reverse pause',
    //     scrub: true,
    //     markers: true,
    //     // start: '20px bottom',
    //     pin: true,
    //     // pinSpacing: false
    //   },
    // });

    // ScrollTrigger.create({
    //   snap: 1 / 5 // snap whole page to the closest section!
    // });
  }, []);

  return (
    <AppContextProvider >
      <div className="App">
        <CrystalMoving className="sliding_crystal" ref={crystalRef} />
        <Header />
        <Projects ref={projectsRef} test='test' />
        <Skills />
        <Contact />
        <Footer />
        {/* <MotionPath className='esz' ref={pathRef} id='motionPath' /> */}
        {/* <svg id="path-svg" width="881.57" height="3834.2" version="1.1" viewBox="0 0 881.57 6834.2" xmlns="http://www.w3.org/2000/svg">
          <path id="motionPath" d="M.001.5h400v400l-400-1" />
        </svg> */}

        {/* <svg xmlns="http://www.w3.org/2000/svg" width="1711.2" height="1156.8" viewBox="0 0 855.6 578.4">
          <ellipse id="flightPath" cx="450" cy="250" rx="410" ry="80" />
          <circle id="circle_1" cx="87.4" cy="228.9" r="50" fill="#6c63ff" />
        </svg> */}

      </div >
    </AppContextProvider>
  );
}


export default App;
