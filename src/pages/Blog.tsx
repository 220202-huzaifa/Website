import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Blog() {
  const location = useLocation();
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Mobile App Development",
      excerpt: "Exploring emerging trends and technologies shaping the mobile app landscape in 2024 and beyond.",
      author: "Sarah Johnson",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Mobile Development",
      image: "📱"
    },
    {
      id: 2,
      title: "Building Scalable Web Applications with React",
      excerpt: "Best practices and architectural patterns for creating maintainable and scalable React applications.",
      author: "Michael Chen",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Web Development",
      image: "⚛️"
    },
    {
      id: 3,
      title: "UX Design Principles for Startup Success",
      excerpt: "How user-centered design can drive product adoption and customer satisfaction for early-stage startups.",
      author: "Emily Rodriguez",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Design",
      image: "🎨"
    },
    {
      id: 4,
      title: "MVP Development: From Idea to Launch",
      excerpt: "A comprehensive guide to building and launching a minimum viable product that resonates with users.",
      author: "David Kim",
      date: "November 28, 2024",
      readTime: "10 min read",
      category: "Product Strategy",
      image: "🚀"
    },
    {
      id: 5,
      title: "The Rise of AI in Software Development",
      excerpt: "How artificial intelligence is transforming the way we build, test, and deploy software applications.",
      author: "Alex Thompson",
      date: "November 20, 2024",
      readTime: "7 min read",
      category: "Technology",
      image: "🤖"
    },
    {
      id: 6,
      title: "Security Best Practices for Modern Web Apps",
      excerpt: "Essential security measures every developer should implement to protect web applications from threats.",
      author: "Lisa Wang",
      date: "November 15, 2024",
      readTime: "9 min read",
      category: "Security",
      image: "🔒"
    }
  ];

  const categories = ["All", "Mobile Development", "Web Development", "Design", "Product Strategy", "Technology", "Security"];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <link rel="canonical" href={`https://diskodifysolutions.com${location.pathname}`} />
        <title>Blog | Diskodify Solutions</title>
        <meta
          name="description"
          content="Read insights from Diskodify Solutions on web development, mobile apps, UX design, product strategy, AI, and software security."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange-500">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, trends, and best practices from our team of experts
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
                <div className="p-8 text-center bg-gradient-to-br from-orange-50 to-blue-50">
                  <div className="text-5xl mb-4">{post.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                      <span>{post.author}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>
                  <button className="mt-4 text-orange-500 font-medium hover:text-orange-600 transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on technology, design, and product development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
