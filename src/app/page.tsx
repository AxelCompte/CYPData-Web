'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Smartphone, Monitor, BarChart3, Database, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [activeId, setActiveId] = useState('');
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      ...options
    });

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [options]);

  return [activeId, elementsRef] as const;
}

export default function Home() {
  const [activeProject, elementsRef] = useIntersectionObserver();
  const services = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Native Mobile Apps",
      description: "Custom Android and iOS applications built with cutting-edge technology for optimal performance and user experience.",
      tech: ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Desktop Applications",
      description: "Powerful desktop solutions that streamline your business processes and enhance productivity across all platforms.",
      tech: ["Electron", "Qt", ".NET", "Java"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Business Intelligence",
      description: "Transform your data into actionable insights with our comprehensive BI solutions and interactive dashboards.",
      tech: ["Power BI", "Tableau", "Qlik", "Custom BI"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Big Data Solutions",
      description: "Scalable data processing and analytics platforms that handle massive datasets with enterprise-grade reliability.",
      tech: ["Apache Spark", "Hadoop", "Elasticsearch", "MongoDB"]
    }
  ];

  const caseStudies = [
    {
      id: "project-1",
      title: "E-Commerce Analytics Platform",
      description: "Developed a comprehensive analytics dashboard that increased client&apos;s revenue insights by 300% and reduced reporting time by 85%.",
      metrics: ["300% Better Insights", "85% Time Reduction", "Real-time Processing"],
      industry: "Retail",
      gif: "/project_01.gif"
    },
    {
      id: "project-2", 
      title: "Healthcare Management System",
      description: "Built a mobile-first patient management system serving 50,000+ patients with 99.9% uptime and HIPAA compliance.",
      metrics: ["50K+ Users", "99.9% Uptime", "HIPAA Compliant"],
      industry: "Healthcare",
      gif: "/project_02.gif"
    },
    {
      id: "project-3",
      title: "Financial Trading Dashboard", 
      description: "Created a real-time trading analytics platform processing millions of transactions with sub-second latency.",
      metrics: ["<1s Latency", "Millions of Transactions", "Real-time Analytics"],
      industry: "Finance",
      gif: "/project_03.gif"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="gradient-text">CyP Data</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
              <a href="#cases" className="hover:text-purple-400 transition-colors">Case Studies</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/CYP.jpg')",
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-gray-900/60 to-purple-800/40"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Digital Solutions for the
            <span className="block gradient-text">Modern Enterprise</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
           Where innovative software meets actionable insights for sustainable competitive advantage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="gradient-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105">
              Explore Our Work
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We deliver end-to-end digital solutions that drive innovation and accelerate business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg gradient-primary text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 text-sm bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-20 px-6 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real results from real projects. See how we&apos;ve helped businesses transform their operations with data-driven solutions.
            </p>
          </div>

          {/* Two-column layout: Left for text, Right for sticky GIFs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Scrolling Content */}
            <div className="space-y-32">
              {caseStudies.map((study, index) => (
                <div 
                  key={index}
                  id={study.id}
                  ref={(el) => { elementsRef.current[index] = el; }}
                  className="group"
                >
                  <div className="p-8 rounded-2xl bg-gray-900/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
                        {study.industry}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-6 group-hover:text-purple-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                      {study.description}
                    </p>
                    <div className="space-y-3">
                      {study.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center text-green-400">
                          <CheckCircle className="w-5 h-5 mr-3" />
                          <span className="font-medium">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Sticky GIF Display */}
            <div className="lg:sticky lg:top-32 lg:h-[70vh] flex items-center justify-center">
              <div className="relative w-full h-full max-w-lg">
                {caseStudies.map((study, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      activeProject === study.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                      <img
                        src={study.gif}
                        alt={`${study.title} demonstration`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
                
                {/* Default state when no project is active */}
                {!activeProject && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600/20 to-purple-800/20 flex items-center justify-center">
                        <BarChart3 className="w-16 h-16 text-purple-400" />
                      </div>
                      <p className="text-gray-400 text-lg">Scroll to explore our projects</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let&apos;s Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to transform your business with cutting-edge digital solutions? Get in touch with our team of experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-400">contact@cypdata.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-gray-400">+34 XXX XXX XXX</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Us</h3>
                  <p className="text-gray-400">Madrid, Spain</p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-4">Start Your Project Today</h3>
              <p className="text-gray-400 mb-6">
                From concept to deployment, we&apos;ll guide you through every step of your digital transformation journey.
              </p>
              <button className="w-full gradient-primary text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold gradient-text">CyP Data</h3>
              <p className="text-gray-400 mt-2">Digital Solutions & Business Intelligence</p>
            </div>
            <div className="flex space-x-6">
              <a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">Services</a>
              <a href="#cases" className="text-gray-400 hover:text-purple-400 transition-colors">Case Studies</a>
              <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 CyP Data. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}