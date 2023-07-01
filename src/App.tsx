import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import './App.sass';

import { AppContextProvider } from './store/AppContext';
import { checkLocation } from './utils/checkLocation';
import { Contact, Footer, Header, Navigation, Projects, ProgressBar, Skills } from './components';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, ScrollToPlugin);

// Affects performance
gsap.config({
  force3D: true,
});

// Fix for animation jump when address bar toggles on mobile
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export const App = () => {
  useEffect(() => {
    const location = checkLocation();

    // Scroll to section, when direct linking, after complete page load
    if (document.readyState === 'complete') {
      setTimeout(() => {
        if (['projects', 'skills', 'contact'].includes(location)) {
          window.location.href = `#${location}`;
        }
      }, 0);
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          setTimeout(() => {
            if (['projects', 'skills', 'contact'].includes(location)) {
              window.location.href = `#${location}`;
            }
          }, 0);
        }
      });
    }
  }, []);

  return (
    <AppContextProvider>
      <div className="App" id="app">
        <ProgressBar />
        <Navigation />
        <Header />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;
