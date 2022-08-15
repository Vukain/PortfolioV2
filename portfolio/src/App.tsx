import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import './App.sass';

import AppContextProvider from './store/AppContext'
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import ProgressBar from './components/ProgressBar/ProgressBar';

import { ReactComponent as CrystalMoving } from './media/main_crystal.svg';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

function App() {

  // const crystalRef: React.MutableRefObject<null | SVGSVGElement> = useRef(null);
  // const pathRef: React.MutableRefObject<null> = useRef(null);

  useEffect(() => {

    // MotionPathPlugin.convertToPath("#motionPath");

    //     floatingCrystal.to(, {
    //       // x: -1800,
    //       // rotateZ: 180,

    //       // duration: .2,
    //       // repeat: -1,
    // ,
    //     });



  }, []);

  return (
    <AppContextProvider >
      <div className="App">

        <ProgressBar />
        <Navigation />
        <Header />
        <Projects />
        <Skills />
        <Contact />
        <Footer />

      </div >
    </AppContextProvider>
  );
}


export default App;
