import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import VantaGlobe from '../components/VantaGlobe';
import VantaNet from '../components/VantaNet';
import VantaTopology from '../components/VantaTopology';
import TypingAnimation from '../components/TypingAnimation';

/* ═══ Animation Variants ═══ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }
  })
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ═══ Reusable Components ═══ */
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══ Animated Counter Hook ═══ */
function useCounter(end: number, duration = 2000, start = 0, inView = false) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start, inView]);
  return count;
}

function CounterStat({ value, label, inView }: { value: string; label: string; inView: boolean }) {
  const num = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const count = useCounter(num, 2000, 0, inView);
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">{count}{suffix}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

/* ═══ 3D Tilt Card Component ═══ */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  }, []);
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={`tilt-card transition-transform duration-200 ease-out ${className}`}>
      <div className="tilt-card-shine" />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*                HOME PAGE                    */
/* ═══════════════════════════════════════════ */

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  // Auto-advance process steps
  useEffect(() => {
    const timer = setInterval(() => setActiveStep(s => (s + 1) % 4), 4000);
    return () => clearInterval(timer);
  }, []);

  const rotatingWords = ['software product', 'digital business', 'online platform', 'tech startup', 'SaaS application'];

  const services = [
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, title: 'Management Systems', desc: 'Custom ERP, inventory, project & HR management platforms that streamline operations.', color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50' },
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: 'CRM Development', desc: 'Powerful CRM solutions with sales pipelines, analytics & automation.', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50' },
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>, title: 'Shopify Stores', desc: 'High-converting e-commerce stores with custom themes & optimizations.', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50' },
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, title: 'Mobile Apps', desc: 'Native & cross-platform apps with exceptional UX for iOS & Android.', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50' },
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>, title: 'Web Applications', desc: 'Scalable, secure web apps with React, Node.js & cloud architecture.', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50' },
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>, title: 'UI/UX Design', desc: 'Research-driven design with wireframes, prototypes & design systems.', color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-50' }
  ];

  const projects = [
    { title: 'Vera Luxe', category: 'E-commerce', description: 'Premium skincare and makeup e-commerce platform with 3x conversion rate.', tags: ['Shopify', 'E-commerce', 'Beauty'], gradient: 'from-rose-400 to-orange-300', size: 'lg:col-span-2 lg:row-span-2' },
    { title: 'National Hotel Association', category: 'Management System', description: "Pakistan's first registered hostellers association with digital registration.", tags: ['Management', 'Registration'], gradient: 'from-blue-400 to-indigo-400', size: '' },
    { title: 'CRM Dashboard', category: 'SaaS Platform', description: 'Advanced CRM with analytics, sales pipeline & automation features.', tags: ['CRM', 'Analytics', 'SaaS'], gradient: 'from-emerald-400 to-teal-400', size: '' },
    { title: 'Battery Expert', category: 'Corporate Website', description: 'Company website for battery specialists with nationwide distribution.', tags: ['Corporate', 'Distribution'], gradient: 'from-amber-400 to-yellow-300', size: '' },
    { title: 'Digital Rozgar', category: 'Web Platform', description: 'Online earning platform connecting freelancers with opportunities.', tags: ['Platform', 'Freelance'], gradient: 'from-violet-400 to-purple-400', size: '' }
  ];

  const stats = [
    { value: '100%', label: 'Dedicated Focus' },
    { value: '24h', label: 'Avg. Response' },
    { value: '6wk', label: 'To First Launch' },
    { value: '15+', label: 'Tech We Build With' }
  ];

  const processSteps = [
    { step: '01', title: 'Discovery', desc: 'We start with a deep-dive call to understand your goals, target audience, and what success looks like for you. You get a clear project roadmap before anything begins.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>, color: 'from-amber-400 to-orange-500' },
    { step: '02', title: 'Design', desc: 'We create wireframes and high-fidelity mockups — so you see exactly what you\'re getting before a single line of code is written. Your approval, then we move.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>, color: 'from-pink-400 to-rose-500' },
    { step: '03', title: 'Develop', desc: 'Clean, tested code delivered in weekly sprints. You see real progress every 7 days — no black box, no surprises. We build fast without cutting corners.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, color: 'from-blue-400 to-indigo-500' },
    { step: '04', title: 'Deploy', desc: 'We launch your product, handle all technical setup, and stay with you post-launch. Bug? We fix it. Question? We answer it. You\'re never left alone.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>, color: 'from-emerald-400 to-teal-500' }
  ];

  const testimonials = [
    { quote: "Diskodify Solutions transformed our entire online presence. The team's attention to detail and strategic thinking exceeded our expectations.", author: 'Sarah Mitchell', role: 'CEO, Vera Luxe', avatar: 'SM' },
    { quote: "Professional, responsive, and incredibly talented. They delivered our management system on time and within budget.", author: 'Ahmed Khan', role: 'Director, National Hotel Association', avatar: 'AK' },
    { quote: "The CRM they built has revolutionized how we manage our sales pipeline. Outstanding quality of work.", author: 'James Wilson', role: 'Sales Head, TechFlow Inc', avatar: 'JW' },
    { quote: "Working with Diskodify was a game-changer. They brought our e-commerce vision to life with incredible precision.", author: 'Maria Lopez', role: 'Founder, StyleHub', avatar: 'ML' },
    { quote: "Exceptional technical expertise paired with genuine care for our business outcomes. Truly a partner, not just a vendor.", author: 'David Chen', role: 'CTO, DataPulse', avatar: 'DC' },
    { quote: "From concept to launch in record time. The mobile app they built exceeded every expectation we had.", author: 'Fatima Rizvi', role: 'Product Lead, EduTech', avatar: 'FR' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Split Layout: Left Content + Right Visual
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#fffaf6' }}>

        {/* ── Warm Animated Gradient Background ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large warm peach/orange blob — top left */}
          <div className="animate-blob-1 absolute rounded-full"
            style={{ width: '900px', height: '900px', top: '-300px', left: '-250px',
              background: '#fb923c', filter: 'blur(160px)', opacity: 0.18 }} />
          {/* Yellow blob — top right */}
          <div className="animate-blob-2 absolute rounded-full"
            style={{ width: '700px', height: '700px', top: '-150px', right: '-200px',
              background: '#fbbf24', filter: 'blur(140px)', opacity: 0.15, animationDelay: '-5s' }} />
          {/* Rose/pink blob — bottom left */}
          <div className="animate-blob-3 absolute rounded-full"
            style={{ width: '600px', height: '600px', bottom: '-150px', left: '5%',
              background: '#f472b6', filter: 'blur(130px)', opacity: 0.1, animationDelay: '-9s' }} />
          {/* Orange accent — center */}
          <div className="animate-blob-2 absolute rounded-full"
            style={{ width: '500px', height: '500px', top: '30%', left: '40%',
              background: '#f97316', filter: 'blur(120px)', opacity: 0.09, animationDelay: '-3s' }} />

          {/* Dot grid overlay */}
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-48"
            style={{ background: 'linear-gradient(to top, #fffaf6, transparent)' }} />
        </div>

        <div className="container-professional relative z-[10] py-28 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

            {/* ── Left: Content ── */}
            <div>
              {/* Available badge */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold tracking-wide mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                Now accepting founding clients
              </motion.div>

              {/* Main heading */}
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
                We Engineer<br />
                <span className="text-orange-500">Software</span><br />
                That Scales.
              </motion.h1>

              {/* Description */}
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed mb-10">
                A modern software studio crafting reliable, scalable digital products. We partner closely with each client to design, build, and ship — from concept to launch.
              </motion.p>

              {/* Buttons */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
                className="flex flex-wrap gap-3 mb-14">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 hover:shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-300">
                  Start a Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link to="/portfolio"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                  See Our Work
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div ref={statsRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap gap-x-10 gap-y-5 border-t border-gray-200 pt-8">
                {stats.map((stat, i) => (
                  <CounterStat key={i} value={stat.value} label={stat.label} inView={statsInView} />
                ))}
              </motion.div>
            </div>

            {/* ── Right: Animated Visual Cards ── */}
            <div className="relative hidden lg:flex items-center justify-center h-[520px]">

              {/* Main project card */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute w-72 bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Build Roadmap</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                {/* Mock bar chart */}
                <div className="flex items-end gap-2 h-20 mb-4">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div key={i}
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.06, ease: [0.34, 1.56, 0.64, 1] as const }}
                      className="flex-1 rounded-t-sm origin-bottom"
                      style={{ height: `${h}%`, background: i === 5 ? 'rgb(249 115 22)' : '#e5e7eb' }} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-900 font-bold text-lg">Phase 1</div>
                    <div className="text-gray-400 text-xs">Discovery & design</div>
                  </div>
                  <div className="px-3 py-1 bg-green-50 border border-green-100 rounded-full text-green-600 text-xs font-semibold">● Kicking off</div>
                </div>
              </motion.div>

              {/* Floating notification card — top right */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute top-12 right-0 w-56 bg-white border border-gray-100 rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] animate-float"
                style={{ animationDuration: '5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-800 text-xs font-semibold">Free Discovery Call</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">Book yours today</p>
                  </div>
                </div>
              </motion.div>

              {/* Tech stack pill — bottom left */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute bottom-16 -left-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.07)] animate-float"
                style={{ animationDuration: '6s', animationDelay: '1s' }}>
                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mb-3">Tech Stack</p>
                <div className="flex gap-2">
                  {['React', 'Node', 'AI', 'AWS'].map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-[10px] font-bold">{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Trust pill — bottom right */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.25 }}
                className="absolute bottom-8 right-4 flex items-center gap-2.5 bg-white border border-gray-100 rounded-full px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.07)] animate-float"
                style={{ animationDuration: '7s', animationDelay: '2s' }}>
                <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <span className="text-gray-600 text-xs font-semibold">Full source-code ownership</span>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-9 rounded-full border-2 border-gray-300 flex items-start justify-center p-1.5">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROCESS — Horizontal Expanding Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-gray-950 relative overflow-hidden">
        {/* Faint grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="container-professional relative z-10">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Our Process</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
              From idea to launch —<br className="hidden md:block" /> in weeks, not months
            </motion.h2>
          </AnimatedSection>

          {/* ── Desktop: Horizontal expanding cards ── */}
          <AnimatedSection>
            <div className="hidden lg:flex gap-3 h-[420px]">
              {processSteps.map((item, index) => {
                const isActive = activeStep === index;
                const gradients = [
                  { card: 'from-amber-950/80 to-orange-900/40', accent: 'from-amber-400 to-orange-500', border: 'border-amber-500/30', glow: 'rgba(245,158,11,0.15)', dot: 'bg-amber-400', num: 'text-amber-500/10' },
                  { card: 'from-pink-950/80 to-rose-900/40',   accent: 'from-pink-400 to-rose-500',   border: 'border-pink-500/30',  glow: 'rgba(236,72,153,0.15)', dot: 'bg-pink-400',  num: 'text-pink-500/10'  },
                  { card: 'from-blue-950/80 to-indigo-900/40', accent: 'from-blue-400 to-indigo-500', border: 'border-blue-500/30',  glow: 'rgba(59,130,246,0.15)', dot: 'bg-blue-400',  num: 'text-blue-500/10'  },
                  { card: 'from-emerald-950/80 to-teal-900/40',accent: 'from-emerald-400 to-teal-500',border: 'border-emerald-500/30',glow:'rgba(16,185,129,0.15)',  dot: 'bg-emerald-400',num:'text-emerald-500/10'},
                ];
                const g = gradients[index];

                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    animate={{ flex: isActive ? 4 : 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer border ${g.border} bg-gradient-to-br ${g.card}`}
                    style={{ boxShadow: isActive ? `0 0 60px ${g.glow}` : 'none' }}>

                    {/* Big watermark number */}
                    <span className={`absolute -bottom-4 -right-2 text-[160px] font-black leading-none select-none pointer-events-none ${g.num}`}>
                      {item.step}
                    </span>

                    {/* Top scanner line on active */}
                    {isActive && (
                      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent`}
                        style={{ animation: 'shimmer 2.5s linear infinite' }} />
                    )}

                    {/* Collapsed state — vertical label */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.accent} flex items-center justify-center text-white shadow-lg`}>
                        {item.icon}
                      </div>
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
                        {item.title}
                      </span>
                      <span className="text-white/20 text-xs font-bold">{item.step}</span>
                    </div>

                    {/* Expanded state — full content */}
                    <div className={`absolute inset-0 p-8 flex flex-col justify-between transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                      {/* Top row */}
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${g.accent} flex items-center justify-center text-white shadow-lg`}>
                          {item.icon}
                        </div>
                        <span className="text-white/20 text-5xl font-black tabular-nums leading-none">{item.step}</span>
                      </div>

                      {/* Content */}
                      <div>
                        <motion.h3
                          key={`title-${activeStep}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="text-2xl font-bold text-white mb-3">
                          {item.title}
                        </motion.h3>
                        <motion.p
                          key={`desc-${activeStep}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="text-white/60 text-sm leading-relaxed max-w-xs">
                          {item.desc}
                        </motion.p>
                      </div>

                      {/* Progress dots */}
                      <div className="flex gap-1.5">
                        {processSteps.map((_, i) => (
                          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === activeStep ? `w-6 bg-gradient-to-r ${g.accent}` : 'w-2 bg-white/20'}`} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Mobile: Stacked cards ── */}
            <div className="lg:hidden space-y-3">
              {processSteps.map((item, index) => {
                const isActive = activeStep === index;
                const gradients = [
                  { card: 'from-amber-950/80 to-orange-900/40', accent: 'from-amber-400 to-orange-500', border: 'border-amber-500/30' },
                  { card: 'from-pink-950/80 to-rose-900/40',    accent: 'from-pink-400 to-rose-500',    border: 'border-pink-500/30'  },
                  { card: 'from-blue-950/80 to-indigo-900/40',  accent: 'from-blue-400 to-indigo-500',  border: 'border-blue-500/30'  },
                  { card: 'from-emerald-950/80 to-teal-900/40', accent: 'from-emerald-400 to-teal-500', border: 'border-emerald-500/30'},
                ];
                const g = gradients[index];
                return (
                  <div key={index} onClick={() => setActiveStep(index)} onMouseEnter={() => setActiveStep(index)}
                    className={`rounded-2xl border ${g.border} bg-gradient-to-br ${g.card} overflow-hidden cursor-pointer transition-all duration-500`}>
                    <div className="flex items-center gap-4 p-5">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${g.accent} flex items-center justify-center text-white`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-white/30 text-xs font-bold">{item.step}</span>
                        <h3 className="text-white font-bold">{item.title}</h3>
                      </div>
                      <svg className={`w-4 h-4 text-white/30 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {isActive && (
                      <div className="px-5 pb-5">
                        <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES — Split Layout: Numbered List + Live Preview Panel
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#fdf8f0' }}>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Warm orange orb top-right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: '#fb923c', filter: 'blur(160px)', opacity: 0.12 }} />

        <div className="container-professional relative z-10">
          {/* Header */}
          <AnimatedSection className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <motion.span variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest">What We Do</motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
                  Full-cycle<br />development services
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} className="text-gray-500 text-base max-w-sm leading-relaxed lg:text-right">
                End-to-end solutions designed to take your product from concept to scale.
              </motion.p>
            </div>
          </AnimatedSection>

          {/* Main split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">

            {/* Left — Numbered service list */}
            <AnimatedSection className="space-y-1">
              {services.map((service, index) => (
                <motion.div key={index} variants={fadeUp} custom={index}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`group flex items-center gap-5 px-6 py-5 rounded-2xl cursor-pointer transition-all duration-400 border
                    ${hoveredService === index
                      ? 'bg-white border-orange-100 shadow-md scale-[1.01]'
                      : 'border-transparent hover:bg-white/70'}`}>
                  {/* Number */}
                  <span className={`flex-shrink-0 text-4xl font-black tabular-nums transition-all duration-400 leading-none
                    ${hoveredService === index ? 'text-gray-900' : 'text-gray-200 group-hover:text-gray-300'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Divider */}
                  <div className={`flex-shrink-0 w-px h-10 transition-all duration-400
                    ${hoveredService === index ? 'bg-gradient-to-b from-transparent via-orange-400 to-transparent' : 'bg-gray-200'}`} />
                  {/* Icon + Text */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400
                      ${hoveredService === index ? `bg-gradient-to-br ${service.color} text-white shadow-lg` : 'bg-gray-100 text-gray-400'}`}>
                      {service.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-bold transition-colors duration-300 truncate
                        ${hoveredService === index ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-xs mt-0.5 truncate transition-colors duration-300 ${hoveredService === index ? 'text-gray-500' : 'text-gray-400'}`}>
                        {service.desc.slice(0, 50)}…
                      </p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <svg className={`flex-shrink-0 w-4 h-4 transition-all duration-300
                    ${hoveredService === index ? 'text-orange-500 translate-x-0 opacity-100' : 'text-gray-300 -translate-x-2 opacity-0 group-hover:opacity-100'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              ))}
            </AnimatedSection>

            {/* Right — Live preview panel */}
            <AnimatedSection>
              <motion.div variants={fadeUp} className="sticky top-24 h-full min-h-[420px] lg:min-h-0">
                {hoveredService !== null ? (
                  <motion.div
                    key={hoveredService}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className={`relative h-full min-h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br ${services[hoveredService].color} p-10 flex flex-col justify-between`}>
                    {/* Big blurred blob */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl" />
                    </div>
                    {/* Big watermark number */}
                    <span className="absolute -bottom-6 -right-4 text-[180px] font-black leading-none text-white/5 select-none">
                      {String(hoveredService + 1).padStart(2, '0')}
                    </span>
                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const }}
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-6">
                        {services[hoveredService].icon}
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {services[hoveredService].title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-white/75 leading-relaxed text-base">
                        {services[hoveredService].desc}
                      </motion.p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="relative z-10 mt-8">
                      <Link to="/services"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-semibold rounded-xl transition-all duration-300 border border-white/20">
                        Explore Service
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </Link>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* Animated idle state — floating service icons grid */
                  <div className="relative h-full min-h-[420px] rounded-3xl border border-orange-100 bg-white shadow-sm overflow-hidden p-8 flex flex-col justify-between">
                    {/* Subtle radial glow center */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 rounded-full bg-orange-400/10 blur-3xl" />
                    </div>

                    {/* Floating animated service icons */}
                    <div className="relative z-10 flex-1 grid grid-cols-3 gap-4 content-center">
                      {services.map((service, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.08 }}
                          style={{ animationDelay: `${i * 0.6}s` }}
                          className="animate-float flex flex-col items-center gap-2 group cursor-pointer"
                          onMouseEnter={() => setHoveredService(i)}>
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                            {service.icon}
                          </div>
                          <span className="text-[10px] text-gray-400 group-hover:text-gray-700 font-medium text-center transition-colors duration-300 leading-tight">
                            {service.title.split(' ')[0]}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom label */}
                    <div className="relative z-10 text-center mt-6">
                      <motion.p
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-gray-400 text-xs tracking-widest uppercase font-medium">
                        Hover to explore
                      </motion.p>
                      {/* Animated line */}
                      <div className="flex items-center gap-2 mt-3 justify-center">
                        {services.map((_, i) => (
                          <motion.div key={i}
                            animate={{ scaleX: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                            className="h-px w-6 bg-orange-400/60 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Bottom CTA */}
          <AnimatedSection className="text-center mt-16">
            <motion.div variants={fadeUp}>
              <Link to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/15 rounded-xl hover:bg-white/5 hover:border-white/25 transition-all duration-300">
                View All Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          AI SOLUTIONS — Futuristic Split Layout
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#06040f]">
        {/* Animated neural net background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Purple/blue gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-600/5 rounded-full blur-3xl" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="container-professional relative z-10">
          {/* Header */}
          <AnimatedSection className="text-center mb-20">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Powered by AI
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6 leading-tight">
              Next-generation<br className="hidden md:block" />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent"> AI Solutions</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We build intelligent systems that automate, engage, and scale — giving your business an unfair competitive advantage.
            </motion.p>
          </AnimatedSection>

          {/* AI Call Agent — Hero feature card */}
          <AnimatedSection className="mb-8">
            <motion.div variants={fadeUp}
              className="relative rounded-3xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-950/80 to-[#0d0b1e] p-8 sm:p-12">
              {/* Animated scanner line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
                style={{ animation: 'shimmer 3s linear infinite' }} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left content */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    FEATURED · AI CALL AGENTS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                    24/7 AI Phone Agents that<br />sound human
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Deploy intelligent voice agents that handle inbound & outbound calls, qualify leads, book appointments, answer FAQs — all without human intervention. Available round the clock.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {['Lead Qualification', 'Appointment Booking', 'Customer Support', 'Outbound Campaigns'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-[1.02]">
                    Build My AI Agent
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>

                {/* Right — animated phone/agent visual */}
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Outer rings */}
                    {[1,2,3].map(i => (
                      <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/20"
                        style={{ width: `${80 + i * 60}px`, height: `${80 + i * 60}px`, animation: `pulse-ring ${2 + i}s ease-out infinite`, animationDelay: `${i * 0.6}s` }} />
                    ))}
                    {/* Center circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                      <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    {/* Floating message bubbles */}
                    {[
                      { text: 'Hello! How can I help?', top: '8%', left: '55%', delay: '0s' },
                      { text: 'Booking confirmed ✓', top: '60%', left: '-10%', delay: '1.5s' },
                      { text: 'Lead qualified 🎯', top: '30%', left: '65%', delay: '3s' },
                    ].map((b, i) => (
                      <div key={i} className="absolute text-[10px] font-medium text-white/80 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap animate-float"
                        style={{ top: b.top, left: b.left, animationDelay: b.delay, animationDuration: `${4 + i}s` }}>
                        {b.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* AI Capabilities — clean 2x3 grid */}
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
              {[
                {
                  tag: 'NLP',
                  title: 'LLM Integration',
                  desc: 'Deploy and fine-tune large language models into your product stack with full enterprise controls and audit trails.',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
                  accent: 'text-violet-400',
                  tagBg: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
                },
                {
                  tag: 'Automation',
                  title: 'AI Agents & Automation',
                  desc: 'Autonomous systems that act, reason, and complete complex multi-step workflows without human intervention.',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                  accent: 'text-fuchsia-400',
                  tagBg: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-300',
                },
                {
                  tag: 'ML',
                  title: 'Predictive Analytics',
                  desc: 'Transform raw data into accurate forecasts — demand, risk, churn, and fraud — with production-grade ML.',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                  accent: 'text-blue-400',
                  tagBg: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
                },
                {
                  tag: 'Vision',
                  title: 'Computer Vision',
                  desc: 'Real-time object detection, OCR, quality inspection, and visual intelligence pipelines at scale.',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
                  accent: 'text-cyan-400',
                  tagBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
                },
                {
                  tag: 'Trust',
                  title: 'AI Governance',
                  desc: 'Explainability frameworks, bias auditing, and compliance tooling built for regulated industries.',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  accent: 'text-emerald-400',
                  tagBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
                },
                {
                  tag: 'Edge',
                  title: 'Edge Inference',
                  desc: 'Compress and deploy models to edge devices with sub-50ms latency — no cloud dependency required.',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
                  accent: 'text-amber-400',
                  tagBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeUp} custom={index}
                  className="group relative bg-white/[0.02] hover:bg-white/[0.05] p-7 transition-all duration-300 cursor-default">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${item.tagBg}`}>
                      {item.tag}
                    </span>
                    <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${item.accent} group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-500 transition-colors">
                    {item.desc}
                  </p>
                  {/* Bottom accent line on hover */}
                  <div className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${
                    index === 0 ? 'from-violet-500 to-transparent' :
                    index === 1 ? 'from-fuchsia-500 to-transparent' :
                    index === 2 ? 'from-blue-500 to-transparent' :
                    index === 3 ? 'from-cyan-500 to-transparent' :
                    index === 4 ? 'from-emerald-500 to-transparent' :
                    'from-amber-500 to-transparent'
                  }`} />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Bottom CTA strip */}
          <AnimatedSection className="mt-14">
            <motion.div variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl border border-violet-500/15 bg-violet-500/5">
              <div>
                <p className="text-white font-semibold text-lg">Ready to integrate AI into your business?</p>
                <p className="text-gray-500 text-sm mt-1">Custom-built, not off-the-shelf. Made for your exact use case.</p>
              </div>
              <Link to="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-300 whitespace-nowrap hover:scale-[1.02]">
                Get a Free AI Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PORTFOLIO — Alternating Split Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#fdfcfb' }}>
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="container-professional relative z-10">

          {/* ── Header ── */}
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <div>
                <motion.span variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Portfolio</motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
                  Work that speaks<br className="hidden md:block" /> for itself.
                </motion.h2>
              </div>
              <motion.div variants={fadeUp}>
                <Link to="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-orange-500 transition-colors duration-300 group">
                  View all projects
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* ── Alternating Split Cards ── */}
          <AnimatedSection>
            <div className="space-y-4">
              {projects.map((project, index) => {
                const isOdd = index % 2 !== 0;
                const isFirst = index === 0;
                return (
                  <motion.div key={index} variants={fadeUp} custom={index}>
                    <Link to="/portfolio"
                      className={`group flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-100 bg-white hover:-translate-y-1 transition-all duration-500 ${isFirst ? 'shadow-md hover:shadow-2xl' : 'shadow-sm hover:shadow-xl'}`}>

                      {/* ── Gradient Visual Side ── */}
                      <div className={`${isOdd ? 'sm:order-2' : 'sm:order-1'} relative ${isFirst ? 'sm:w-2/5' : 'sm:w-[38%]'} h-48 sm:h-auto bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                        {/* Initials watermark */}
                        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                          <span className="text-white/[0.12] group-hover:text-white/[0.07] font-black leading-none transition-all duration-700 group-hover:scale-110 inline-block"
                            style={{ fontSize: isFirst ? '130px' : '100px' }}>
                            {project.title.split(' ').map((w: string) => w[0]).join('')}
                          </span>
                        </div>
                        {/* Category pill */}
                        <div className="absolute top-5 left-5">
                          <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                            {project.category}
                          </span>
                        </div>
                        {/* Featured badge */}
                        {isFirst && (
                          <div className="absolute bottom-5 left-5">
                            <span className="px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full text-white/80 text-[10px] font-bold uppercase tracking-widest">
                              ★ Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ── Content Side ── */}
                      <div className={`${isOdd ? 'sm:order-1' : 'sm:order-2'} flex-1 p-7 sm:p-9 flex flex-col justify-between group-hover:bg-orange-50/20 transition-colors duration-500`}>
                        <div>
                          {/* Number */}
                          <span className="text-5xl font-black text-gray-100 tabular-nums leading-none block mb-4 group-hover:text-orange-100 transition-colors duration-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className={`font-black text-gray-900 leading-tight mb-3 ${isFirst ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                            {project.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 max-w-sm">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 2).map((tag: string, i: number) => (
                              <span key={i} className="px-2.5 py-1 bg-gray-100 group-hover:bg-orange-50 text-gray-500 group-hover:text-orange-600 text-[11px] font-semibold rounded-lg transition-colors duration-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 group-hover:bg-orange-500 group-hover:border-orange-500 flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110 ml-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                          </div>
                        </div>
                      </div>

                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          INDUSTRIES — Animated Icon Grid with Ripple + Counter Stats
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="container-professional relative z-10">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.span variants={fadeUp} className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Industries</motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
                  Deep expertise across industries
                </motion.h2>
                <motion.p variants={fadeUp} className="text-lg text-gray-400 leading-relaxed mb-10">
                  We bring specialized knowledge to every project, ensuring solutions that truly understand your industry's unique challenges.
                </motion.p>
                {/* Mini stats */}
                <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6">
                  {[{ val: '12+', label: 'Industries' }, { val: '50+', label: 'Projects' }, { val: '99%', label: 'Success' }].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-white">{s.val}</div>
                      <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: '🏥', title: 'Healthcare', desc: 'Secure, HIPAA-compliant solutions', gradient: 'from-red-500/20 to-rose-500/10', border: 'border-red-500/20 hover:border-red-400/40' },
                  { icon: '💳', title: 'Fintech', desc: 'Modern financial platforms', gradient: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/20 hover:border-blue-400/40' },
                  { icon: '🛒', title: 'E-commerce', desc: 'High-converting retail experiences', gradient: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/20 hover:border-emerald-400/40' },
                  { icon: '🎓', title: 'Education', desc: 'Engaging e-learning platforms', gradient: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/20 hover:border-purple-400/40' }
                ].map((industry, index) => (
                  <motion.div key={index} variants={fadeUp} custom={index}
                    className={`relative p-6 rounded-2xl bg-gradient-to-br ${industry.gradient} border ${industry.border} backdrop-blur-sm group hover:-translate-y-2 transition-all duration-500 cursor-default`}>
                    {/* Ripple circle on icon */}
                    <div className="relative inline-block mb-4">
                      <span className="text-4xl block relative z-10">{industry.icon}</span>
                      <span className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-[2.5] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{industry.title}</h3>
                    <p className="text-gray-400 text-sm">{industry.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA — Morphing Gradient Blobs + Magnetic Button Feel
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500" />
        {/* Animated morphing blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 morph-blob blur-3xl" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-300/20 morph-blob blur-3xl" style={{ animationDelay: '-6s' }} />
        {/* Animated rotating gradient ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10 animate-gradient-rotate" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 animate-gradient-rotate" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

        <div className="container-professional relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Let's build something great
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to bring your <br className="hidden md:block" /> vision to life?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-white/80 mb-12 leading-relaxed">
              Let's collaborate to build something extraordinary. Get a free consultation and project estimate today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-orange-600 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:scale-[1.03]">
                <span className="relative z-10">Get Free Consultation</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="mailto:hello@diskodifysolutions.com"
                className="inline-flex items-center justify-center px-8 py-5 text-base font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                hello@diskodifysolutions.com
              </a>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Home;
