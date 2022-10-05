import { useContext, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import './App.sass';

import { AppContextProvider, AppContext } from './store/AppContext'
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';
import { Projects } from './components/Projects/Projects';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { Skills } from './components/Skills/Skills';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, ScrollToPlugin);

export const App = () => {

  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    const [, location] = window.location.href.split('#');
    if (['projects', 'skills', 'contact'].includes(location)) {
      window.location.href = `#${location}`;
    };
  }, [])

  return (
    <AppContextProvider >

      <div className={`App${lightTheme ? ' App--light' : ''}`} id='app'>

        <ProgressBar />
        <Navigation />
        <Header />
        <Projects />
        <Skills />
        <Contact />
        <Footer theme={lightTheme} themeChanger={setLightTheme} />

      </div >

    </AppContextProvider>
  );
}


export default App;
