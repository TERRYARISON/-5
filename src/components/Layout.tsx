import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import PetalField from './PetalField';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared shell. Uses the nested-route pattern — App.tsx MUST render this as
 * a route element with child routes (see react-dev.md "Layout + routing
 * contract").
 *
 * The nav is a FIXED overlay (transparent over full-bleed heroes), so this
 * Layout intentionally adds NO top padding to the content slot; pages own
 * their own spacing below the hero.
 *
 * Owns: Lenis smooth scrolling (synced to the GSAP ticker), the fixed sakura
 * petal canvas, scroll-to-top on route change, and the 0.5s fade + 24px
 * upward page-enter transition.
 */
export default function Layout() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-[100dvh] bg-void text-fog">
      <PetalField />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
