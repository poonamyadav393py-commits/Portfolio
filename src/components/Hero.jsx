import React from 'react';
import { useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { SplitText } from './ui/SplitText';
import { useParallax } from '../hooks/useParallax';

/**
 * Animated Three.js particle canvas background.
 * Falls back gracefully if WebGL unavailable.
 */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    canvas.width = W();
    canvas.height = H();

    const onResize = () => { canvas.width = W(); canvas.height = H(); };
    window.addEventListener('resize', onResize);

    // Create particles
    const count = Math.min(120, Math.floor((W() * H()) / 12000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(13, 115, 119, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W()) p.vx *= -1;
        if (p.y < 0 || p.y > H()) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 247, 244, ${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    // Respect prefers-reduced-motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export default function Hero() {
  const subtitleRef = useRef(null);
  const p1Ref = useParallax(0.12);
  const p2Ref = useParallax(0.05);
  const p3Ref = useParallax(0.08);
  const p4Ref = useParallax(-0.06);

  useEffect(() => {
    const el = subtitleRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 600);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Hero section"
    >
      <ParticleCanvas />

      {/* Decorative geometric lines */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={p1Ref} className="absolute top-1/4 right-0 w-px h-64 bg-white/10" />
        <div ref={p2Ref} className="absolute bottom-1/3 right-1/4 w-40 h-px bg-accent/30" />
        <div ref={p3Ref} className="absolute top-1/2 left-1/4 w-px h-40 bg-white/5" />
        {/* Rotating ring accent */}
        <div ref={p4Ref} className="absolute -right-20 -top-20 w-96 h-96 opacity-5">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="1" fill="none" strokeDasharray="8 16" />
            <circle cx="200" cy="200" r="130" stroke="var(--accent)" strokeWidth="1" fill="none" strokeDasharray="4 12" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="container relative z-10 pt-24">
        <div className="max-w-6xl">
          {/* Label */}
          <p className="label text-accent mb-8 opacity-0" style={{ animation: 'fadeIn 0.6s ease forwards 0.2s' }}>
            Product Designer · UI/UX Strategist
          </p>

          {/* Giant name */}
          <h1 className="font-serif text-white leading-none mb-0 select-none" aria-label="Poonam Yadav">
            <span className="block">
              <SplitText text="POONAM" className="text-white" delay={100} />
            </span>
            <span className="block -mt-2 md:-mt-4 lg:-mt-6">
              <SplitText
                text="YADAV"
                className=""
                delay={300}
              />
              {/* Italic accent word */}
              {/* <em
                className="font-serif not-italic text-accent/80 text-[0.45em] align-middle ml-4 md:ml-8 hidden sm:inline"
                style={{ fontStyle: 'italic', opacity: 0, animation: 'fadeIn 0.8s ease forwards 1.4s' }}
                aria-hidden="true"
              >
                designer
              </em> */}
            </span>
          </h1>

          {/* Tagline */}
          <div
            ref={subtitleRef}
            className="mt-10 md:mt-16 max-w-2xl"
            style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            <p className="text-white/70 text-xl md:text-2xl font-serif font-light leading-relaxed mb-2">
              "I design experiences that feel inevitable."
            </p>
            <p className="text-white/40 text-base md:text-lg font-sans font-light">
              Turning complex problems into intuitive, beautiful products.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mt-12"
            style={{ opacity: 0, animation: 'fadeIn 0.8s ease forwards 0.9s' }}
          >
            <Button variant="filled" href="#work">View Work</Button>
            <Button variant="outline" href="#contact">Let's Talk</Button>
            <Button variant="resume" href="/Poonam Updated Resume.pdf" target="_blank" rel="noopener noreferrer" download className="group">
              <span className="flex items-center gap-2">
                Resume
                <svg className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-label="Scroll down"
        style={{ opacity: 0, animation: 'fadeIn 1s ease forwards 1.6s' }}
      >
        <span className="label text-white/30">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-accent animate-bounce-slow" style={{ height: '40%' }} />
        </div>
      </div>
    </section>
  );
}
