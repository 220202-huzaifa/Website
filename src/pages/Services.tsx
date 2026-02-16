import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Services() {
  const location = useLocation();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  const services = [
    {
      icon: '🏢',
      title: 'Management System Development',
      description: 'Build custom management systems tailored to your business needs for improved efficiency and productivity.',
      features: ['ERP Systems', 'Inventory Management', 'Project Management', 'HR Management Systems'],
      details: 'We develop comprehensive management systems that streamline your business operations, from inventory tracking to HR management, all tailored to your specific requirements.'
    },
    {
      icon: '🤝',
      title: 'CRM Development',
      description: 'Develop powerful CRM solutions to manage customer relationships, sales pipelines, and business analytics.',
      features: ['Custom CRM Solutions', 'Sales Pipeline Management', 'Customer Analytics', 'Integration Services'],
      details: 'Our CRM solutions help you build stronger customer relationships with advanced analytics, sales automation, and seamless integration with your existing tools.'
    },
    {
      icon: '🛒',
      title: 'Shopify Store Development',
      description: 'Create stunning, high-converting Shopify stores with custom themes, apps, and optimization.',
      features: ['Custom Theme Development', 'Shopify App Development', 'Store Optimization', 'Migration Services'],
      details: 'Transform your e-commerce vision into reality with custom Shopify stores that drive conversions and provide exceptional shopping experiences.'
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Build mobile products with greater impact using native and cross-platform technologies.',
      features: ['iOS Development', 'Android Development', 'React Native', 'Flutter'],
      details: 'Create powerful mobile applications that engage users and deliver exceptional performance across all platforms and devices.'
    },
    {
      icon: '🌐',
      title: 'Web App Development',
      description: 'Develop powerful, intuitive, and secure web applications that scale with your business.',
      features: ['React Development', 'Node.js Backend', 'Cloud Architecture', 'API Development'],
      details: 'Build scalable web applications with modern technologies that grow with your business and provide seamless user experiences.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Create enjoyable digital experiences that solve user needs and drive engagement.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      details: 'Design beautiful, intuitive interfaces that delight users and drive business results through research-driven design processes.'
    },
    {
      icon: '🚀',
      title: 'MVP Development',
      description: 'Validate your product idea and attract early-adopter users with rapid MVP development.',
      features: ['Rapid Prototyping', 'Lean Development', 'User Testing', 'Iterative Design'],
      details: 'Launch your product faster with our MVP development services that help you validate ideas and attract early users.'
    },
    {
      icon: '✅',
      title: 'Quality Assurance',
      description: 'Make sure your product is market-ready before launch with comprehensive testing.',
      features: ['Automated Testing', 'Performance Testing', 'Security Audits', 'User Acceptance Testing'],
      details: 'Ensure your product meets the highest quality standards with our comprehensive testing and quality assurance services.'
    },
    {
      icon: '💡',
      title: 'Technology Consulting',
      description: 'Get a fresh perspective to solve your tech challenges with expert consulting services.',
      features: ['Architecture Review', 'Technology Stack Selection', 'Performance Optimization', 'Security Consulting'],
      details: 'Leverage our expertise to solve complex technical challenges and optimize your technology stack for maximum efficiency.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <link rel="canonical" href={`https://diskodifysolutions.com${location.pathname}`} />
        <title>Services | Diskodify Solutions</title>
        <meta
          name="description"
          content="Explore Diskodify Solutions services including web app development, mobile apps, Shopify stores, CRM systems, UI/UX design, QA, and technology consulting."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange-500">Services</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Full-cycle software development services, curated for your startup. Click on any card to see detailed information.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="relative h-96 cursor-pointer group"
                onClick={() => handleCardClick(index)}
              >
                <div 
                  className="absolute inset-0 w-full h-full transition-all duration-700 transform-gpu"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="text-5xl mb-4 text-center">{service.icon}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{service.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm flex-grow leading-relaxed">{service.description}</p>
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-xs text-gray-600">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center pt-2 border-t border-gray-100">
                        <span className="text-orange-500 font-medium text-xs group-hover:text-orange-600 transition-colors inline-flex items-center">
                          Click to see details
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg text-white"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="text-5xl mb-3 text-center">{service.icon}</div>
                      <h3 className="text-lg font-bold mb-2 text-center">{service.title}</h3>
                      <p className="text-orange-100 mb-3 text-sm leading-relaxed">{service.details}</p>
                      <div className="space-y-1 flex-grow">
                        <h4 className="font-semibold text-white text-sm mb-2">Key Features:</h4>
                        <div className="space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start text-xs text-orange-100">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0 mt-1"></span>
                              <span className="leading-tight">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 text-center pt-2 border-t border-orange-400">
                        <span className="text-white font-medium text-xs hover:text-orange-100 transition-colors inline-flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Click to go back
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-orange-100 mb-8">Let's discuss how we can help bring your vision to life</p>
          <button className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Get a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

export default Services;
