import React, { useEffect, useRef } from 'react';

import './App.sass';

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from './components/Header/Header';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';

gsap.registerPlugin(ScrollTrigger);

function App() {

  const sRef: React.MutableRefObject<null> = useRef(null);
  const projectsRef: React.MutableRefObject<null> = useRef(null);

  useEffect(() => {

    const elementGetter = gsap.utils.selector(projectsRef.current);
    const projects: HTMLElement[] = elementGetter('[class*="s_project"]');

    console.log(projectsRef)

    gsap.to(projects, {
      xPercent: -100 * (projects.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: projectsRef.current,
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        markers: true,
        // start: 'center center',
        pin: true,
        end: 3 * projects[0].offsetWidth,
        snap: 1 / 2,
        // pinSpacing: false
      },
    });

    gsap.to(sRef.current, {
      x: -1800,
      rotateZ: 180,
      ease: "none",
      scrollTrigger: {
        trigger: sRef.current,
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        markers: true,
        end: '300px center',
        start: 'center center',
        pin: true,
        // pinSpacing: false
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
    <div className="App">
      <div className="eh" ref={sRef}></div>
      <Header />
      <Skills />
      <Projects ref={projectsRef} test='test' />
    </div >
  );
}


export default App;
