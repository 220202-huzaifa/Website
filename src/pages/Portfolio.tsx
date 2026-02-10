import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      description: 'Premium skincare and makeup e-commerce platform.',
      tags: ['Shopify', 'E-commerce', 'Beauty Products'],
      link: 'https://veraluxepk.com/'
    },
    {
      id: 2,
      title: 'National Hotel Association',
      category: 'management',
      image: '🏛️',
      description: 'Pakistan first registered and recognized hostellers association with National Hostel Registration.',
      tags: ['Association Management', 'Hostel Registration', 'National Database'],
      link: 'https://nhapk.org/'
    },
    {
      id: 4,
      title: 'CRM Dashboard',
      category: 'management',
      image: '🤝',
      description: 'Advanced CRM system with analytics, sales pipeline management, automation features, and custom reporting.',
      tags: ['Vue.js', 'Node.js', 'MongoDB', 'Analytics'],
      link: '#'
    },
    {
      id: 5,
      title: 'Battery Expert',
      category: 'web',
      image: '🔋',
      description: 'Company website for battery specialists with nationwide distribution and inventory for VRLA and LIPO batteries.',
      tags: ['Company Website', 'Battery Distribution', 'VRLA', 'LIPO'],
      link: 'https://magnet.pk/'
    },
    {
      id: 6,
      title: 'Digital Rozgar',
      category: 'web',
      image: '💰',
      description: 'Online earning platform.',
      tags: ['Web Platform', 'Online Earning', 'Freelance'],
      link: 'https://digitalrozgars.com/'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects.filter(project => ['web', 'shopify', 'management'].includes(project.category))
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange-500">Work</span>
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
                    {project.image.startsWith('/') ? (
                      <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    ) : (
                      <div className="text-5xl mb-4 text-center">{project.image}</div>
                    )}
                    <div className="text-xs text-orange-500 font-semibold uppercase tracking-wider mb-2 text-center">
                      {categories.find(cat => cat.id === project.category)?.name}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-center">{project.description}</p>
                    
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
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 font-medium text-sm group-hover:text-orange-600 transition-colors inline-flex items-center"
                      >
                        Visit Page
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
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
