import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'shopify', name: 'Shopify' },
    { id: 'management', name: 'Management Systems' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'web', name: 'Web Development' },
    { id: 'saas', name: 'SaaS' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'shopify',
      image: '🛒',
      description: 'Custom Shopify store with advanced inventory management and seamless payment integration. Increased client sales by 150% in the first quarter.',
      tags: ['Shopify', 'React', 'Node.js', 'Payment Gateway'],
      client: 'Fashion Retail Co.',
      duration: '3 months',
      technologies: ['Shopify Plus', 'React', 'Node.js', 'PostgreSQL', 'Stripe API'],
      features: ['Custom Theme Development', 'Inventory Management', 'Multi-currency Support', 'Advanced Analytics'],
      results: ['150% sales increase', '40% conversion rate improvement', '99.9% uptime'],
      link: '#'
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      category: 'management',
      image: '🏥',
      description: 'Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine capabilities.',
      tags: ['React', 'Python', 'PostgreSQL', 'HIPAA Compliant'],
      client: 'MediCare Plus',
      duration: '6 months',
      technologies: ['React', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
      features: ['Patient Records', 'Appointment Scheduling', 'Telemedicine', 'Billing System'],
      results: ['60% reduction in admin time', '95% patient satisfaction', 'HIPAA compliant'],
      link: '#'
    },
    {
      id: 3,
      title: 'FinTech Mobile App',
      category: 'mobile',
      image: '📱',
      description: 'Secure mobile banking application with real-time transactions, biometric authentication, and AI-powered financial insights.',
      tags: ['React Native', 'Firebase', 'Security', 'AI/ML'],
      client: 'SecureBank',
      duration: '4 months',
      technologies: ['React Native', 'Firebase', 'Node.js', 'Machine Learning', 'Biometric Auth'],
      features: ['Real-time Transactions', 'Biometric Security', 'AI Insights', 'Budget Tracking'],
      results: ['100K+ downloads', '4.8 star rating', 'Bank-level security'],
      link: '#'
    },
    {
      id: 4,
      title: 'CRM Dashboard',
      category: 'management',
      image: '🤝',
      description: 'Advanced CRM system with analytics, sales pipeline management, automation features, and custom reporting.',
      tags: ['Vue.js', 'Node.js', 'MongoDB', 'Analytics'],
      client: 'SalesPro Inc.',
      duration: '5 months',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'D3.js', 'Redis'],
      features: ['Sales Pipeline', 'Analytics Dashboard', 'Email Automation', 'Custom Reports'],
      results: ['45% increase in sales', '30% better lead conversion', 'Real-time analytics'],
      link: '#'
    },
    {
      id: 5,
      title: 'IoT Monitoring Platform',
      category: 'web',
      image: '🌐',
      description: 'Real-time IoT device monitoring platform with data visualization, alert system, and predictive maintenance.',
      tags: ['React', 'WebSocket', 'D3.js', 'IoT'],
      client: 'SmartTech Solutions',
      duration: '4 months',
      technologies: ['React', 'WebSocket', 'D3.js', 'Python', 'MQTT'],
      features: ['Real-time Monitoring', 'Data Visualization', 'Alert System', 'Predictive Maintenance'],
      results: ['80% reduction in downtime', 'Real-time monitoring', 'Predictive alerts'],
      link: '#'
    },
    {
      id: 6,
      title: 'SaaS Analytics Tool',
      category: 'saas',
      image: '📊',
      description: 'Cloud-based analytics platform with custom reporting, business intelligence features, and multi-tenant architecture.',
      tags: ['Angular', 'Python', 'AWS', 'Analytics'],
      client: 'DataDrive Analytics',
      duration: '6 months',
      technologies: ['Angular', 'Python', 'AWS', 'TensorFlow', 'PostgreSQL'],
      features: ['Custom Reports', 'Business Intelligence', 'Multi-tenant', 'API Integration'],
      results: ['500+ enterprise clients', '99.99% uptime', 'Scalable architecture'],
      link: '#'
    },
    {
      id: 7,
      title: 'Educational Platform',
      category: 'web',
      image: '🎓',
      description: 'Comprehensive online learning platform with video streaming, interactive quizzes, and progress tracking.',
      tags: ['Next.js', 'GraphQL', 'AWS', 'Video Streaming'],
      client: 'EduTech Academy',
      duration: '5 months',
      technologies: ['Next.js', 'GraphQL', 'AWS', 'Video.js', 'PostgreSQL'],
      features: ['Video Streaming', 'Interactive Quizzes', 'Progress Tracking', 'Certification'],
      results: ['10K+ active students', '85% completion rate', 'Mobile responsive'],
      link: '#'
    },
    {
      id: 8,
      title: 'Food Delivery App',
      category: 'mobile',
      image: '🍔',
      description: 'Feature-rich food delivery application with real-time tracking, payment integration, and restaurant management.',
      tags: ['React Native', 'Google Maps', 'Stripe', 'Real-time'],
      client: 'QuickEats',
      duration: '3 months',
      technologies: ['React Native', 'Google Maps API', 'Stripe', 'Socket.io', 'Node.js'],
      features: ['Real-time Tracking', 'Payment Integration', 'Restaurant Dashboard', 'Rating System'],
      results: ['50K+ orders/month', '4.7 star rating', '30 min avg delivery'],
      link: '#'
    },
    {
      id: 9,
      title: 'Project Management Tool',
      category: 'saas',
      image: '📋',
      description: 'Collaborative project management platform with kanban boards, time tracking, and team collaboration features.',
      tags: ['React', 'TypeScript', 'PostgreSQL', 'Collaboration'],
      client: 'TeamFlow',
      duration: '4 months',
      technologies: ['React', 'TypeScript', 'PostgreSQL', 'WebSocket', 'Docker'],
      features: ['Kanban Boards', 'Time Tracking', 'Team Collaboration', 'Gantt Charts'],
      results: ['1000+ teams', '40% productivity increase', 'Enterprise features'],
      link: '#'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange-500">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover our success stories and see how we've helped businesses transform their digital presence with innovative solutions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group">
                <div className="card-professional h-full overflow-hidden hover:shadow-professional-lg transition-all duration-300">
                  <div className="p-8">
                    <div className="text-5xl mb-4 text-center">{project.image}</div>
                    <div className="text-xs text-orange-500 font-semibold uppercase tracking-wider mb-2 text-center">
                      {categories.find(cat => cat.id === project.category)?.name}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-center">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 font-semibold mb-2">Client: {project.client}</div>
                      <div className="text-xs text-gray-500">Duration: {project.duration}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <Link 
                        to={project.link}
                        className="text-orange-500 font-medium text-sm group-hover:text-orange-600 transition-colors inline-flex items-center"
                      >
                        View Case Study
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
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your project?</h2>
          <p className="text-xl text-orange-100 mb-8">Let's create something amazing together</p>
          <Link 
            to="/contact"
            className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
