import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import VantaGlobe from '../components/VantaGlobe';
import TypingAnimation from '../components/TypingAnimation';

function Home() {
  const location = useLocation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const rotatingWords = [
    'software product',
    'digital business',
    'online platform',
    'tech startup',
    'SaaS application'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <link rel="canonical" href={`https://diskodifysolutions.com${location.pathname}`} />
        <title>Diskodify Solutions | Premium Software Development Agency</title>
        <meta
          name="description"
          content="Diskodify Solutions helps startups and enterprises build custom web apps, mobile apps, and digital products that scale."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <VantaGlobe />
        <div className="container-professional text-center relative z-10">
          <h1 className="hero-heading mb-8 mt-4 text-white">
            Skyrocket the growth of your <br />
            <span className="text-gradient"> 
              <TypingAnimation 
                words={rotatingWords}
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={800}
                className="text-gradient"
              />
            </span>
          </h1>
          <p className="hero-subheading mb-12 max-w-4xl mx-auto text-gray-100">
            Define, build and scale compliant software solutions with our expert development team.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/contact"
              className="btn-primary px-8 py-4 text-lg shadow-professional-lg"
            >
              Get a Quote
            </Link>
            <button className="btn-secondary px-8 py-4 text-lg">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-white">
        <div className="container-professional">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your tech partner who understands the journey</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We know what it takes to launch and scale a software product like yours. We're here to help you make a smart strategy for your product that goes beyond technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { step: '1', title: 'Idea generation', desc: 'Concept validation' },
              { step: '2', title: 'Research and shape', desc: 'Market analysis' },
              { step: '3', title: 'MVP', desc: 'Build and test' },
              { step: '4', title: 'Product-market fit', desc: 'Refine and monetize' },
              { step: '5', title: 'Product growth', desc: 'Scale and optimize' },
              { step: '6', title: 'Enterprise', desc: 'Global expansion' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-subtle rounded-full flex items-center justify-center mx-auto mb-4 shadow-professional">
                  <span className="text-orange-500 font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-professional">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Full-cycle software development services</h2>
            <p className="text-lg text-gray-600">Curated for your startup</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: '🏢', 
                title: 'Management System Development', 
                desc: 'Build custom management systems for your business',
                details: 'We develop comprehensive management systems that streamline your business operations, from inventory tracking to HR management.',
                features: ['ERP Systems', 'Inventory Management', 'Project Management', 'HR Management']
              },
              { 
                icon: '🤝', 
                title: 'CRM Development', 
                desc: 'Develop powerful CRM solutions for customer management',
                details: 'Our CRM solutions help you build stronger customer relationships with advanced analytics and sales automation.',
                features: ['Custom CRM', 'Sales Pipeline', 'Customer Analytics', 'Integration']
              },
              { 
                icon: '🛒', 
                title: 'Shopify Store Development', 
                desc: 'Create stunning, high-converting Shopify stores',
                details: 'Transform your e-commerce vision into reality with custom Shopify stores that drive conversions.',
                features: ['Custom Themes', 'App Development', 'Store Optimization', 'Migration']
              },
              { 
                icon: '📱', 
                title: 'Mobile App Development', 
                desc: 'Build mobile products with greater impact',
                details: 'Create powerful mobile applications that engage users and deliver exceptional performance.',
                features: ['iOS Development', 'Android Development', 'React Native', 'Flutter']
              },
              { 
                icon: '🌐', 
                title: 'Web App Development', 
                desc: 'Develop powerful and secure web applications',
                details: 'Build scalable web applications with modern technologies that grow with your business.',
                features: ['React Development', 'Node.js Backend', 'Cloud Architecture', 'API Development']
              },
              { 
                icon: '🎨', 
                title: 'UI/UX Design', 
                desc: 'Create enjoyable digital experiences',
                details: 'Design beautiful, intuitive interfaces that delight users and drive business results.',
                features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="relative h-96 cursor-pointer group"
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
              >
                <div 
                  className="absolute inset-0 w-full h-full transition-all duration-700 transform-gpu"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: hoveredCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card */}
                  <div 
                    className="absolute inset-0 w-full h-full card-professional"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="service-icon">{service.icon}</div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description flex-grow">{service.desc}</p>
                      <div className="text-center mt-auto">
                        <span className="text-orange-500 font-medium text-sm">Hover for details →</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 w-full h-full gradient-professional rounded-xl p-6 shadow-professional-lg text-white"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="service-icon">{service.icon}</div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="text-orange-100 mb-4 text-sm leading-relaxed flex-grow">{service.details}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-white text-sm mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-xs text-orange-100">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0 mt-0.5"></span>
                              <span className="leading-tight">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/services"
              className="btn-primary px-8 py-4 text-lg shadow-professional-lg"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section className="section-padding bg-white">
        <div className="container-professional">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Recent Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successful projects that have helped businesses transform their digital presence and achieve remarkable growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Vera Luxe',
                category: 'Shopify',
                image: '🛒',
                description: 'Premium skincare and makeup e-commerce platform.',
                tags: ['Shopify', 'E-commerce', 'Beauty Products'],
                link: '/portfolio'
              },
              {
                title: 'National Hotel Association',
                category: 'Management Systems',
                image: '🏛️',
                description: 'Pakistan first registered and recognized hostellers association with National Hostel Registration.',
                tags: ['Association Management', 'Hostel Registration'],
                link: '/portfolio'
              },
              {
                title: 'CRM Dashboard',
                category: 'Management Systems',
                image: '🤝',
                description: 'Advanced CRM system with analytics, sales pipeline management, and automation features.',
                tags: ['CRM', 'Analytics', 'Automation'],
                link: '/portfolio'
              },
              {
                title: 'Battery Expert',
                category: 'Web Development',
                image: '🔋',
                description: 'Company website for battery specialists with nationwide distribution of VRLA and LIPO batteries.',
                tags: ['Company Website', 'Battery Distribution'],
                link: '/portfolio'
              },
              {
                title: 'Digital Rozgar',
                category: 'Web Development',
                image: '💰',
                description: 'Online earning platform.',
                tags: ['Web Platform', 'Online Earning'],
                link: '/portfolio'
              }
            ].map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="card-professional h-full overflow-hidden hover:shadow-professional-lg transition-all duration-300">
                  <div className="p-8">
                    <div className="text-5xl mb-4 text-center">{project.image}</div>
                    <div className="text-xs text-orange-500 font-semibold uppercase tracking-wider mb-2 text-center">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-center">{project.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-center">
                      <Link 
                        to={project.link}
                        className="text-orange-500 font-medium text-sm group-hover:text-orange-600 transition-colors inline-flex items-center"
                      >
                        Visit Page
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/portfolio"
              className="btn-primary px-8 py-4 text-lg shadow-professional-lg"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Deep industry expertise</h2>
            <p className="text-lg text-gray-600">Make your products more competitive</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏥', title: 'Healthcare', desc: 'Build secure, accessible, and compliant healthcare solutions' },
              { icon: '💳', title: 'Fintech', desc: 'Revolutionize way financial services are delivered' },
              { icon: '🌐', title: 'Internet of Things', desc: 'All-in IoT product development expertise' }
            ].map((industry, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-blue-50">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{industry.title}</h3>
                <p className="text-gray-600">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to accelerate your product growth?</h2>
          <p className="text-xl text-orange-100 mb-8">Let's build something amazing together</p>
          <Link 
            to="/contact"
            className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
