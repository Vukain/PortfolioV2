import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import './App.sass';

import { AppContextProvider } from './store/AppContext'
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';
import { Projects } from './components/Projects/Projects';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { Skills } from './components/Skills/Skills';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, ScrollToPlugin);

// Fix for animation jump when address bar toggles on mobile
ScrollTrigger.config({
  ignoreMobileResize: true
});

export const App = () => {

  const [lightTheme, setLightTheme] = useState(false);
  const [, location] = window.location.href.split('#');

  useEffect(() => {
    // Scroll to section, when direct linking, after page load

    document.addEventListener('readystatechange', () => {
      if (document.readyState == 'complete') {
        console.log('timeouto')
        setTimeout(() => {
          if (['projects', 'skills', 'contact'].includes(location)) {
            window.location.href = `#${location}`;
          };
        }, 100)
      }
    });
    // setTimeout(() => {
    //   if (['projects', 'skills', 'contact'].includes(location)) {
    //     window.location.href = `#${location}`;
    //   };

    // }, 500)
  }, []);

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
};

export default App;
