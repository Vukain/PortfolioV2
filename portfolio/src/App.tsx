import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import './App.sass';

import { AppContextProvider } from './store/AppContext'
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';
import { Projects } from './components/Projects/Projects';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { Skills } from './components/Skills/Skills';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export const App = () => {

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
