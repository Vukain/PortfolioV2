import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import './App.sass';

import { AppContextProvider } from './store/AppContext';
import { Contact, Footer, Header, Navigation, Projects, ProgressBar, Skills } from './components';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, ScrollToPlugin);

// Disable forced translate3D, should work better on devices without hardware acceleration
gsap.config({
  force3D: false
});

// Fix for animation jump when address bar toggles on mobile
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export const App = () => {

  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {

    // Get initial section
    const [, location] = window.location.href.split('#');

    // Scroll to section, when direct linking, after complete page load
    if (document.readyState === 'complete') {
      setTimeout(() => {
        if (['projects', 'skills', 'contact'].includes(location)) {
          window.location.href = `#${location}`;
        };
      }, 0);
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          setTimeout(() => {
            if (['projects', 'skills', 'contact'].includes(location)) {
              window.location.href = `#${location}`;
            };
          }, 0);
        };
      });
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
        <Footer theme={lightTheme} themeToggle={setLightTheme} />

      </div >

    </AppContextProvider>
  );
};

export default App;
