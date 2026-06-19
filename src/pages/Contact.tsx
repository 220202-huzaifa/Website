import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ChatBot from '../components/ChatBot';
import emailjs from 'emailjs-com';

// Initialize EmailJS
emailjs.init("3tA8mN5VrsUhOU4sQ");

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

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // EmailJS configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
    const serviceID = 'service_figj3lp';
    const adminTemplateID = 'template_7aj29ys'; // Template for admin notification
    const userTemplateID = 'template_rq6ltzc'; // Template for user confirmation

    // Prepare template parameters for admin email (with all form details)
    // NOTE: `to_email` controls which inbox receives the submission.
    // In the EmailJS admin template (template_7aj29ys), set the "To Email" field to {{to_email}}.
    const adminTemplateParams = {
      to_email: 'info@diskodifysolutions.com',
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      company: formData.company,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    };

    // Prepare template parameters for user confirmation email
    const userTemplateParams = {
      name: formData.name,
      to_email: formData.email,
      title: formData.service || 'General Inquiry',
      company: formData.company
    };

    console.log('Sending admin email with params:', adminTemplateParams);
    console.log('Sending user confirmation with params:', userTemplateParams);

    // Send email to admin with form details
    const adminEmail = emailjs.send(serviceID, adminTemplateID, adminTemplateParams);
    
    // Send confirmation email to user
    const userEmail = emailjs.send(serviceID, userTemplateID, userTemplateParams);

    // Wait for both emails to be sent
    Promise.all([adminEmail, userEmail])
      .then(([adminResponse, userResponse]) => {
        console.log('Admin email sent successfully!', adminResponse.status, adminResponse.text);
        console.log('User confirmation email sent successfully!', userResponse.status, userResponse.text);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        console.error('Error details:', error.text, error.status);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/60 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-400 focus:bg-white transition-all duration-200";

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
            Let's talk
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            Let's build something<br /><span className="text-orange-500">great together.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Tell us about your project and we'll get back to you within one business day.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ CONTACT CONTENT ═══════════════ */}
      <section className="py-20 bg-white">
        <div className="container-professional">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Form Card ── */}
            <motion.div variants={fadeUp} className="lg:col-span-3 rounded-3xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.05)] p-7 sm:p-10 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Send us a message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the form and our team will reach out shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+92 300 1234567" />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service</option>
                    <option value="management-system">Management System Development</option>
                    <option value="crm-development">CRM Development</option>
                    <option value="shopify-development">Shopify Store Development</option>
                    <option value="mobile-development">Mobile App Development</option>
                    <option value="web-development">Web App Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="mvp-development">MVP Development</option>
                    <option value="quality-assurance">Quality Assurance</option>
                    <option value="consulting">Technology Consulting</option>
                    <option value="ai-solutions">AI Solutions & Automation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className={inputClass} placeholder="Tell us about your project..."></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-green-700 font-medium text-sm">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-red-700 font-medium text-sm">Failed to send message. Please try again or contact us directly.</p>
                  </div>
                )}

                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-orange-600 hover:shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="h-5 w-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* ── Info Panel ── */}
            <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-5">
              {/* Email */}
              <a href="mailto:info@diskodifysolutions.com"
                className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-500 text-sm break-all group-hover:text-orange-500 transition-colors">info@diskodifysolutions.com</p>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+923478852590"
                className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-500 text-sm group-hover:text-orange-500 transition-colors">+92 347 8852590</p>
                </div>
              </a>

              {/* Instant Support */}
              <div className="p-6 rounded-2xl bg-gray-950 text-white relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-orange-500/20 blur-2xl pointer-events-none" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Instant Support</h3>
                    <p className="text-white/60 text-sm mb-3 leading-relaxed">Get immediate answers to your questions.</p>
                    <span className="inline-flex items-center text-xs text-white/70">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      AI Assistant online 24/7
                    </span>
                  </div>
                </div>
              </div>

              {/* Follow us */}
              <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <h3 className="font-semibold text-gray-900 mb-4">Follow us</h3>
                <div className="flex gap-3">
                  {[
                    { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 110 4 2 2 0 010-4z' },
                    { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                    { label: 'Instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01 M2 7a5 5 0 015-5h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5z' },
                    { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  ].map((s, i) => (
                    <a key={i} href="#" aria-label={s.label}
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={s.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
}

export default Contact;
