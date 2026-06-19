import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ═══ Animation Variants ═══ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }
  })
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'shopify', name: 'Shopify' },
    { id: 'management', name: 'Management Systems' },
    { id: 'web', name: 'Web Development' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Vera Luxe',
      category: 'shopify',
      image: '/images/portfolio/Veralux.png',
      emoji: '🛍️',
      description: 'Premium skincare and makeup e-commerce platform.',
      tags: ['Shopify', 'E-commerce', 'Beauty Products'],
      link: 'https://veraluxepk.com/',
      gradient: 'from-rose-400 to-orange-300'
    },
    {
      id: 2,
      title: 'National Hotel Association',
      category: 'management',
      image: '',
      emoji: '🏛️',
      description: 'Pakistan first registered and recognized hostellers association with National Hostel Registration.',
      tags: ['Association Management', 'Hostel Registration', 'National Database'],
      link: 'https://nhapk.org/',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      id: 4,
      title: 'CRM Dashboard',
      category: 'management',
      image: '',
      emoji: '🤝',
      description: 'Advanced CRM system with analytics, sales pipeline management, automation features, and custom reporting.',
      tags: ['Vue.js', 'Node.js', 'MongoDB', 'Analytics'],
      link: '#',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 5,
      title: 'Battery Expert',
      category: 'web',
      image: '',
      emoji: '🔋',
      description: 'Company website for battery specialists with nationwide distribution and inventory for VRLA and LIPO batteries.',
      tags: ['Company Website', 'Battery Distribution', 'VRLA', 'LIPO'],
      link: 'https://magnet.pk/',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 6,
      title: 'Digital Rozgar',
      category: 'web',
      image: '',
      emoji: '💰',
      description: 'Online earning platform connecting freelancers with real opportunities.',
      tags: ['Web Platform', 'Online Earning', 'Freelance'],
      link: 'https://digitalrozgars.com/',
      gradient: 'from-violet-500 to-fuchsia-500'
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects.filter(project => ['web', 'shopify', 'management'].includes(project.category))
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ backgroundColor: '#fffaf6' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-blob-1 absolute rounded-full"
            style={{ width: '800px', height: '800px', top: '-300px', left: '-200px', background: '#fb923c', filter: 'blur(160px)', opacity: 0.16 }} />
          <div className="animate-blob-2 absolute rounded-full"
            style={{ width: '600px', height: '600px', top: '-150px', right: '-150px', background: '#fbbf24', filter: 'blur(140px)', opacity: 0.14, animationDelay: '-5s' }} />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />
        </div>

        <div className="container-professional relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            Our work
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            Work that speaks<br /><span className="text-orange-500">for itself.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            A look at the platforms, stores, and systems we've designed and shipped for businesses across industries.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section className="py-20 bg-white">
        <div className="container-professional">
          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button key={category.id} onClick={() => setSelectedCategory(category.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}>
                  {isActive && (
                    <motion.span layoutId="portfolio-pill"
                      className="absolute inset-0 rounded-full bg-orange-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative z-10">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Alternating split showcase */}
          <motion.div layout className="space-y-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isOdd = index % 2 !== 0;
                const initials = project.title.split(' ').map((w) => w[0]).join('').slice(0, 3);
                return (
                  <motion.a key={project.id} layout
                    href={project.link}
                    target={project.link === '#' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">

                    {/* ── Visual Side ── */}
                    <div className={`${isOdd ? 'sm:order-2' : 'sm:order-1'} relative sm:w-2/5 h-56 sm:h-auto bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}>
                      {project.image ? (
                        <img src={project.image} alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                          <span className="text-white/[0.14] group-hover:text-white/[0.08] font-black leading-none transition-all duration-700 group-hover:scale-110"
                            style={{ fontSize: '120px' }}>
                            {initials}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                      {/* Category pill */}
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                          {categories.find(cat => cat.id === project.category)?.name}
                        </span>
                      </div>
                    </div>

                    {/* ── Content Side ── */}
                    <div className={`${isOdd ? 'sm:order-1' : 'sm:order-2'} flex-1 p-7 sm:p-10 flex flex-col justify-between group-hover:bg-orange-50/20 transition-colors duration-500`}>
                      <div>
                        <span className="text-5xl font-black text-gray-100 tabular-nums leading-none block mb-4 group-hover:text-orange-100 transition-colors duration-300">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-black text-gray-900 leading-tight mb-3 text-2xl sm:text-3xl group-hover:text-orange-500 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2.5 py-1 bg-gray-100 group-hover:bg-orange-50 text-gray-500 group-hover:text-orange-600 text-[11px] font-semibold rounded-lg transition-colors duration-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gray-200 group-hover:bg-orange-500 group-hover:border-orange-500 flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110 ml-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-24 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: '#f97316', filter: 'blur(180px)', opacity: 0.18 }} />

        <AnimatedSection className="container-professional relative z-10 text-center max-w-2xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Ready to start your project?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10 leading-relaxed">
            Let's create something worth showing off. Tell us what you have in mind and we'll map out the path to launch.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)] transition-all duration-300">
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default Portfolio;
