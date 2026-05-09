import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import CaseStudies from '../components/CaseStudies';
import Process from '../components/Process';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import MarqueeStrip from '../components/MarqueeStrip';

export default function Home() {
  return (
    <main id="main-content" aria-label="Portfolio content">
      <Hero />
      <MarqueeStrip />
      <About />
      <CaseStudies />
      <MarqueeStrip inverted />
      <Process />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  );
}
