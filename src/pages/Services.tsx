import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

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

/* ═══ Service Icons ═══ */
const Icon = {
  management: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  crm: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  shopify: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  mobile: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  web: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  design: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  mvp: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  qa: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  consulting: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  aiAgent: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  aiAutomation: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  aiAnalytics: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
};

function Services() {
  const services = [
    {
      icon: Icon.management,
      title: 'Management Systems',
      description: 'Custom platforms that streamline your operations — built around how your business actually works.',
      features: ['ERP Systems', 'Inventory Management', 'Project Management', 'HR Management Systems'],
      accent: 'from-orange-500 to-amber-500', category: 'development'
    },
    {
      icon: Icon.crm,
      title: 'CRM Development',
      description: 'Manage customer relationships, sales pipelines, and analytics from a single, tailored dashboard.',
      features: ['Custom CRM Solutions', 'Sales Pipeline Management', 'Customer Analytics', 'Integration Services'],
      accent: 'from-blue-500 to-indigo-500', category: 'development'
    },
    {
      icon: Icon.shopify,
      title: 'Shopify Stores',
      description: 'High-converting e-commerce stores with custom themes, apps, and performance tuned for sales.',
      features: ['Custom Theme Development', 'Shopify App Development', 'Store Optimization', 'Migration Services'],
      accent: 'from-emerald-500 to-teal-500', category: 'development'
    },
    {
      icon: Icon.mobile,
      title: 'Mobile App Development',
      description: 'Native and cross-platform apps with exceptional UX, built for performance on every device.',
      features: ['iOS Development', 'Android Development', 'React Native', 'Flutter'],
      accent: 'from-violet-500 to-purple-500', category: 'development'
    },
    {
      icon: Icon.web,
      title: 'Web App Development',
      description: 'Secure, intuitive web applications built on modern stacks that scale with your business.',
      features: ['React Development', 'Node.js Backend', 'Cloud Architecture', 'API Development'],
      accent: 'from-rose-500 to-pink-500', category: 'development'
    },
    {
      icon: Icon.design,
      title: 'UI/UX Design',
      description: 'Research-driven design that solves real user needs and turns interfaces into business results.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      accent: 'from-cyan-500 to-blue-500', category: 'design'
    },
    {
      icon: Icon.mvp,
      title: 'MVP Development',
      description: 'Validate your idea and attract early adopters fast with a lean, focused first release.',
      features: ['Rapid Prototyping', 'Lean Development', 'User Testing', 'Iterative Design'],
      accent: 'from-amber-500 to-orange-500', category: 'development'
    },
    {
      icon: Icon.qa,
      title: 'Quality Assurance',
      description: 'Comprehensive testing that makes sure your product is market-ready before it launches.',
      features: ['Automated Testing', 'Performance Testing', 'Security Audits', 'User Acceptance Testing'],
      accent: 'from-teal-500 to-emerald-500', category: 'design'
    },
    {
      icon: Icon.consulting,
      title: 'Technology Consulting',
      description: 'A fresh, expert perspective to solve tough technical challenges and sharpen your stack.',
      features: ['Architecture Review', 'Technology Stack Selection', 'Performance Optimization', 'Security Consulting'],
      accent: 'from-indigo-500 to-violet-500', category: 'design'
    },
    {
      icon: Icon.aiAgent,
      title: 'AI Call Agents',
      description: '24/7 voice agents that sound human — handling calls, qualifying leads, and booking appointments automatically.',
      features: ['Inbound & Outbound Calls', 'Lead Qualification', 'Appointment Booking', 'Customer Support'],
      accent: 'from-violet-500 to-fuchsia-500', category: 'ai'
    },
    {
      icon: Icon.aiAutomation,
      title: 'AI & Automation',
      description: 'Intelligent systems and LLM integrations that automate complex workflows and reasoning end to end.',
      features: ['LLM Integration', 'AI Agents', 'Workflow Automation', 'Custom Model Training'],
      accent: 'from-fuchsia-500 to-pink-500', category: 'ai'
    },
    {
      icon: Icon.aiAnalytics,
      title: 'Predictive Analytics',
      description: 'Turn raw data into accurate forecasts — demand, churn, risk, and fraud — with production-grade ML.',
      features: ['Forecasting Models', 'Churn & Risk Scoring', 'Computer Vision', 'Data Pipelines'],
      accent: 'from-blue-500 to-cyan-500', category: 'ai'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ backgroundColor: '#fffaf6' }}>
        {/* Warm animated gradient background */}
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
            What we do
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            Full-cycle development,<br /><span className="text-orange-500">end to end.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Everything you need to take a product from concept to scale — design, engineering, and the strategy in between.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ SERVICES — BENTO GRID ═══════════════ */}
      <section className="py-20 bg-white">
        <div className="container-professional">
          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(220px,1fr)] gap-5">
            {services.map((service, index) => {
              // Featured (wide) tiles at these indices for an asymmetric bento layout
              const featured = [0, 5, 8, 9].includes(index);
              return (
                <motion.div key={service.title} variants={fadeUp} custom={index}
                  className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    featured
                      ? `sm:col-span-2 bg-gradient-to-br ${service.accent} text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]`
                      : 'bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)] hover:border-gray-200'
                  }`}>
                  {/* Decorative glow on featured tiles */}
                  {featured && (
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/15 blur-2xl pointer-events-none" />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                      featured ? 'bg-white/20 text-white' : `bg-gradient-to-br ${service.accent} text-white shadow-lg`
                    }`}>
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold mb-2 ${featured ? 'text-white' : 'text-gray-900'}`}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${featured ? 'text-white/85' : 'text-gray-500'}`}>
                      {service.description}
                    </p>

                    {/* Feature chips — featured tiles only */}
                    {featured && (
                      <div className="mt-auto pt-5 flex flex-wrap gap-2">
                        {service.features.map((feature, fi) => (
                          <span key={fi} className="inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/95 text-xs font-medium backdrop-blur-sm">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatedSection>
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
            Have a project in mind?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10 leading-relaxed">
            Let's talk through your idea and map out the fastest path to launch — no commitment, just a conversation.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)] transition-all duration-300">
              Get a Free Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default Services;
