'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Smartphone, Monitor, BarChart3, Database, Mail, Phone, MapPin, CheckCircle, Send, User, MessageSquare, Globe } from 'lucide-react';

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

// Translations object
const translations = {
  es: {
    nav: {
      services: "Servicios",
      cases: "Casos de Éxito",
      contact: "Contacto"
    },
    hero: {
      title: "Soluciones Digitales",
      subtitle: "para la",
      highlight: "Empresa Moderna",
      description: "Donde el software innovador se encuentra con insights accionables para generar ventaja competitiva sostenible. Equipo experto en Barcelona ofreciendo soluciones digitales de vanguardia.",
      cta1: "Explora Nuestro Trabajo",
      cta2: "Ponte en Contacto"
    },
    services: {
      title: "Nuestros",
      titleHighlight: "Servicios",
      description: "Ofrecemos soluciones digitales end-to-end que impulsan la innovación y aceleran el crecimiento empresarial en Barcelona y España",
      mobileApps: {
        title: "Aplicaciones Móviles Nativas",
        description: "Aplicaciones Android e iOS personalizadas construidas con tecnología de vanguardia para un rendimiento óptimo y experiencia de usuario."
      },
      desktop: {
        title: "Aplicaciones de Escritorio",
        description: "Soluciones de escritorio potentes que optimizan tus procesos empresariales y mejoran la productividad en todas las plataformas."
      },
      bi: {
        title: "Business Intelligence",
        description: "Transforma tus datos en insights accionables con nuestras soluciones integrales de BI y dashboards interactivos."
      },
      bigData: {
        title: "Soluciones Big Data",
        description: "Plataformas escalables de procesamiento y análisis de datos que manejan datasets masivos con confiabilidad empresarial."
      }
    },
    cases: {
      title: "Historias de",
      titleHighlight: "Éxito",
      description: "Resultados reales de proyectos reales. Descubre cómo hemos ayudado a empresas a transformar sus operaciones con soluciones basadas en datos.",
      ecommerce: {
        title: "Plataforma de Analytics E-Commerce",
        description: "Desarrollamos un dashboard de analytics integral que incrementó los insights de ingresos del cliente en un 300% y redujo el tiempo de reportes en un 85%.",
        industry: "Retail",
        features: {
          realTime: {
            title: "Analytics en Tiempo Real",
            description: "Monitoriza rendimiento de ventas, comportamiento del cliente y niveles de inventario con streaming de datos en vivo y visualizaciones instantáneas."
          },
          segmentation: {
            title: "Segmentación de Clientes",
            description: "Algoritmos ML avanzados categorizan automáticamente clientes basándose en patrones de compra, demografía y métricas de engagement."
          },
          optimization: {
            title: "Optimización de Ingresos",
            description: "Recomendaciones inteligentes de precios y gestión de inventario para maximizar rentabilidad en todas las categorías de productos."
          }
        }
      },
      healthcare: {
        title: "Sistema de Gestión Sanitaria",
        description: "Construimos un sistema de gestión de pacientes mobile-first sirviendo a 50,000+ pacientes con 99.9% uptime y cumplimiento HIPAA.",
        industry: "Sanidad",
        features: {
          mobile: {
            title: "Diseño Mobile-First",
            description: "Apps nativas iOS y Android con capacidades offline, mensajería segura y programación de citas para pacientes y proveedores."
          },
          ehr: {
            title: "Historiales Médicos Electrónicos",
            description: "Gestión segura de datos de pacientes compatible con HIPAA con backup automatizado, auditorías y interoperabilidad con sistemas existentes."
          },
          analytics: {
            title: "Analytics Clínicos",
            description: "Insights de salud poblacional, seguimiento de resultados de tratamientos y analytics predictivos para recomendaciones de cuidado preventivo."
          }
        }
      },
      finance: {
        title: "Dashboard de Trading Financiero",
        description: "Creamos una plataforma de analytics de trading en tiempo real procesando millones de transacciones con latencia sub-segundo.",
        industry: "Finanzas",
        features: {
          trading: {
            title: "Trading de Alta Frecuencia",
            description: "Ejecución de órdenes ultra-baja latencia con precisión de microsegundos, gestión automatizada de riesgos y procesamiento de datos de mercado en tiempo real."
          },
          risk: {
            title: "Analytics de Riesgo",
            description: "Evaluación avanzada de riesgo de cartera, pruebas de estrés y monitoreo de cumplimiento con alertas en tiempo real y reportes automatizados."
          },
          intelligence: {
            title: "Inteligencia de Mercado",
            description: "Análisis de tendencias de mercado impulsado por IA, seguimiento de sentimientos y modelado predictivo para decisiones de trading informadas."
          }
        }
      },
      scrollText: "Desplázate para explorar nuestros proyectos"
    },
    contact: {
      title: "Construyamos Algo",
      titleHighlight: "Increíble",
      description: "¿Listo para transformar tu negocio con soluciones digitales de vanguardia? Ponte en contacto con nuestro equipo experto en Barcelona.",
      email: "Envíanos un Email",
      call: "Llámanos",
      schedule: "Lun-Vie: 8:00 AM - 5:00 PM",
      visit: "Visítanos",
      linkedin: "LinkedIn",
      form: {
        title: "Comienza Tu Proyecto Hoy",
        description: "Del",
        descriptionHighlight: "concepto a la realidad",
        descriptionEnd: ", te guiaremos a través de cada paso de tu viaje de transformación digital.",
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre completo",
        emailLabel: "Email",
        emailPlaceholder: "tu.email@empresa.com",
        messageLabel: "Mensaje",
        messagePlaceholder: "Cuéntanos sobre tu idea de proyecto, requisitos o cualquier pregunta que tengas...",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
        error: "Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente."
      }
    },
    footer: {
      description: "Soluciones Digitales e Inteligencia de Negocios | Barcelona, España",
      copyright: "2025 CyP Data. Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      services: "Services",
      cases: "Case Studies",
      contact: "Contact"
    },
    hero: {
      title: "Digital Solutions",
      subtitle: "for the",
      highlight: "Modern Enterprise",
      description: "Where innovative software meets actionable insights for sustainable competitive advantage. Expert team in Barcelona delivering cutting-edge digital solutions.",
      cta1: "Explore Our Work",
      cta2: "Get In Touch"
    },
    services: {
      title: "Our",
      titleHighlight: "Services",
      description: "We deliver end-to-end digital solutions that drive innovation and accelerate business growth across Barcelona and Spain",
      mobileApps: {
        title: "Native Mobile Apps",
        description: "Custom Android and iOS applications built with cutting-edge technology for optimal performance and user experience."
      },
      desktop: {
        title: "Desktop Applications",
        description: "Powerful desktop solutions that streamline your business processes and enhance productivity across all platforms."
      },
      bi: {
        title: "Business Intelligence",
        description: "Transform your data into actionable insights with our comprehensive BI solutions and interactive dashboards."
      },
      bigData: {
        title: "Big Data Solutions",
        description: "Scalable data processing and analytics platforms that handle massive datasets with enterprise-grade reliability."
      }
    },
    cases: {
      title: "Success",
      titleHighlight: "Stories",
      description: "Real results from real projects. See how we've helped businesses transform their operations with data-driven solutions.",
      ecommerce: {
        title: "E-Commerce Analytics Platform",
        description: "Developed a comprehensive analytics dashboard that increased client's revenue insights by 300% and reduced reporting time by 85%.",
        industry: "Retail",
        features: {
          realTime: {
            title: "Real-Time Analytics",
            description: "Monitor sales performance, customer behavior, and inventory levels with live data streaming and instant visualizations."
          },
          segmentation: {
            title: "Customer Segmentation",
            description: "Advanced ML algorithms automatically categorize customers based on purchasing patterns, demographics, and engagement metrics."
          },
          optimization: {
            title: "Revenue Optimization",
            description: "Intelligent pricing recommendations and inventory management to maximize profitability across all product categories."
          }
        }
      },
      healthcare: {
        title: "Healthcare Management System",
        description: "Built a mobile-first patient management system serving 50,000+ patients with 99.9% uptime and HIPAA compliance.",
        industry: "Healthcare",
        features: {
          mobile: {
            title: "Mobile-First Design",
            description: "Native iOS and Android apps with offline capabilities, secure messaging, and appointment scheduling for patients and providers."
          },
          ehr: {
            title: "Electronic Health Records",
            description: "Secure, HIPAA-compliant patient data management with automated backup, audit trails, and interoperability with existing systems."
          },
          analytics: {
            title: "Clinical Analytics",
            description: "Population health insights, treatment outcome tracking, and predictive analytics for preventive care recommendations."
          }
        }
      },
      finance: {
        title: "Financial Trading Dashboard",
        description: "Created a real-time trading analytics platform processing millions of transactions with sub-second latency.",
        industry: "Finance",
        features: {
          trading: {
            title: "High-Frequency Trading",
            description: "Ultra-low latency order execution with microsecond precision, automated risk management, and real-time market data processing."
          },
          risk: {
            title: "Risk Analytics",
            description: "Advanced portfolio risk assessment, stress testing, and compliance monitoring with real-time alerts and automated reporting."
          },
          intelligence: {
            title: "Market Intelligence",
            description: "AI-powered market trend analysis, sentiment tracking, and predictive modeling for informed trading decisions."
          }
        }
      },
      scrollText: "Scroll to explore our projects"
    },
    contact: {
      title: "Let's Build Something",
      titleHighlight: "Amazing",
      description: "Ready to transform your business with cutting-edge digital solutions? Get in touch with our expert team in Barcelona.",
      email: "Email Us",
      call: "Call Us",
      schedule: "Mon-Fri: 8:00 AM - 5:00 PM",
      visit: "Visit Us",
      linkedin: "LinkedIn",
      form: {
        title: "Start Your Project Today",
        description: "From",
        descriptionHighlight: "concept to reality",
        descriptionEnd: ", we'll guide you through every step of your digital transformation journey.",
        nameLabel: "Name",
        namePlaceholder: "Your full name",
        emailLabel: "Email",
        emailPlaceholder: "your.email@company.com",
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your project idea, requirements, or any questions you have...",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully! We'll contact you soon.",
        error: "Error sending message. Please try again or contact us directly."
      }
    },
    footer: {
      description: "Digital Solutions & Business Intelligence | Barcelona, Spain",
      copyright: "2025 CyP Data. All rights reserved."
    }
  }
};

export default function Home() {
  const [activeProject, elementsRef] = useIntersectionObserver();
  const [isInHero, setIsInHero] = useState(true);
  const [language, setLanguage] = useState<'es' | 'en'>('es'); // Default to Spanish
  
  // Get current translations
  const t = translations[language];
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Language switcher
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitMessage(t.contact.form.success);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage(t.contact.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Track if user is in hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      setIsInHero(scrollY < heroHeight * 0.8); // Hide nav when 80% through hero
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Mouse tracking for 3D card effect - Optimized version
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: React.RefObject<HTMLDivElement | null>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate relative position (-1 to 1)
    const relativeX = (x - centerX) / centerX;
    const relativeY = (y - centerY) / centerY;
    
    // Clamp values to prevent extreme tilting at edges
    const clampedX = Math.max(-1, Math.min(1, relativeX));
    const clampedY = Math.max(-1, Math.min(1, relativeY));
    
    // Reduce rotation intensity for subtler effect
    const rotateX = clampedY * -4; // Reduced from -8 to -4
    const rotateY = clampedX * 4;  // Reduced from 8 to 4
    
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(3px)`;
      }
    });
  };
  
  const handleMouseLeave = (cardRef: React.RefObject<HTMLDivElement | null>) => {
    if (!cardRef.current) return;
    
    // Smooth return to original position
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    });
  };

  const services = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t.services.mobileApps.title,
      description: t.services.mobileApps.description,
      tech: ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: t.services.desktop.title,
      description: t.services.desktop.description,
      tech: ["Electron", "Qt", ".NET", "Java"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t.services.bi.title,
      description: t.services.bi.description,
      tech: ["Power BI", "Tableau", "Qlik", "Custom BI"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t.services.bigData.title,
      description: t.services.bigData.description,
      tech: ["Apache Spark", "Hadoop", "Elasticsearch", "MongoDB"]
    }
  ];

  const caseStudies = [
    {
      id: "project-1",
      title: "E-Commerce Analytics Platform",
      description: "Developed a comprehensive analytics dashboard that increased client's revenue insights by 300% and reduced reporting time by 85%.",
      metrics: ["300% Better Insights", "85% Time Reduction", "Real-time Processing"],
      industry: "Retail",
      gif: "/project_01.gif",
      features: [
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "Real-Time Analytics",
          description: "Monitor sales performance, customer behavior, and inventory levels with live data streaming and instant visualizations."
        },
        {
          icon: <Database className="w-6 h-6" />,
          title: "Customer Segmentation",
          description: "Advanced ML algorithms automatically categorize customers based on purchasing patterns, demographics, and engagement metrics."
        },
        {
          icon: <Monitor className="w-6 h-6" />,
          title: "Revenue Optimization",
          description: "Intelligent pricing recommendations and inventory management to maximize profitability across all product categories."
        }
      ]
    },
    {
      id: "project-2", 
      title: "Healthcare Management System",
      description: "Built a mobile-first patient management system serving 50,000+ patients with 99.9% uptime and HIPAA compliance.",
      metrics: ["50K+ Users", "99.9% Uptime", "HIPAA Compliant"],
      industry: "Healthcare",
      gif: "/project_02.gif",
      features: [
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Mobile-First Design",
          description: "Native iOS and Android apps with offline capabilities, secure messaging, and appointment scheduling for patients and providers."
        },
        {
          icon: <Database className="w-6 h-6" />,
          title: "Electronic Health Records",
          description: "Secure, HIPAA-compliant patient data management with automated backup, audit trails, and interoperability with existing systems."
        },
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "Clinical Analytics",
          description: "Population health insights, treatment outcome tracking, and predictive analytics for preventive care recommendations."
        }
      ]
    },
    {
      id: "project-3",
      title: "Financial Trading Dashboard", 
      description: "Created a real-time trading analytics platform processing millions of transactions with sub-second latency.",
      metrics: ["<1s Latency", "Millions of Transactions", "Real-time Analytics"],
      industry: "Finance",
      gif: "/project_03.gif",
      features: [
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "High-Frequency Trading",
          description: "Ultra-low latency order execution with microsecond precision, automated risk management, and real-time market data processing."
        },
        {
          icon: <Database className="w-6 h-6" />,
          title: "Risk Analytics",
          description: "Advanced portfolio risk assessment, stress testing, and compliance monitoring with real-time alerts and automated reporting."
        },
        {
          icon: <Monitor className="w-6 h-6" />,
          title: "Market Intelligence",
          description: "AI-powered market trend analysis, sentiment tracking, and predictive modeling for informed trading decisions."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 transition-all duration-500 ${
        isInHero ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="logo-gradient-container">
              <img 
                src="/logo.webp" 
                alt="CyP Data" 
                className="h-8 w-auto opacity-0"
              />
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#services" className="hover:text-purple-400 transition-colors">{t.nav.services}</a>
              <a href="#cases" className="hover:text-purple-400 transition-colors">{t.nav.cases}</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">{t.nav.contact}</a>
              
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/CYP.jpg')",
            height: '100vh',
            zIndex: 0
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div 
          className="fixed inset-0 bg-gradient-to-br from-purple-600/40 via-gray-900/60 to-purple-800/40" 
          style={{ 
            zIndex: 1,
            height: '100vh'
          }}
        ></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="hero-logo-white flex justify-center mb-8">
            <img 
              src="/logo.webp" 
              alt="CyP Data" 
              className="h-24 md:h-32 w-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="sr-only">CyP Data - </span>
            {t.hero.title} <span className="text-4xl md:text-6xl">{t.hero.subtitle}</span><br />
            <span className="gradient-text whitespace-nowrap">{t.hero.highlight}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
           {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#cases"
              className="gradient-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105"
            >
              {t.hero.cta1}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#contact"
              className="border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              {t.hero.cta2}
            </a>
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
      <section id="services" className="py-20 px-6 bg-gray-900 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t.services.title} <span className="gradient-text">{t.services.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const cardRef = useRef<HTMLDivElement>(null);
              
              return (
                <div 
                  key={index} 
                  ref={cardRef}
                  className="group p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-2 cursor-pointer"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.1s ease-out'
                  }}
                  onMouseMove={(e) => handleMouseMove(e, cardRef)}
                  onMouseLeave={() => handleMouseLeave(cardRef)}
                >
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-20 px-6 bg-gray-900/80 backdrop-blur-md relative z-10">
        <div className="container mx-auto max-w-7xl">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t.cases.title} <span className="gradient-text">{t.cases.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.cases.description}
            </p>
          </header>

          {/* Two-column layout: Left for text, Right for sticky GIFs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Scrolling Content */}
            <div className="space-y-8 lg:space-y-96 lg:pb-96">
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
                    
                    {/* Key Features */}
                    <div className="mb-8 space-y-6">
                      {study.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 p-2 rounded-lg bg-purple-500/20 text-purple-400">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mobile GIF - Show on small screens only */}
                    <div className="lg:hidden mt-8">
                      <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                        <img
                          src={study.gif}
                          alt={`${study.title} demonstration`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Sticky GIF Display (Desktop Only) */}
            <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[70vh] flex items-center justify-center">
              <div className="relative w-full h-full max-w-lg flex items-center justify-center">
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
      <section id="contact" className="py-20 px-6 bg-gray-900 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.contact.email}</h3>
                  <a 
                    href="mailto:alonso.molina@cypcore.com"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    alonso.molina@cypcore.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.contact.call}</h3>
                  <a 
                    href="tel:+34659160145"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    +34 659 160 145
                  </a>
                  <p className="text-sm text-gray-500">{t.contact.schedule}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.contact.visit}</h3>
                  <address className="text-gray-400 not-italic">
                    Ctra. Piera, 7A<br />
                    08760 Martorell, Barcelona<br />
                    Spain
                  </address>
                </div>
              </div>

              {/* LinkedIn Link */}
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.contact.linkedin}</h3>
                  <a 
                    href="https://es.linkedin.com/company/cypcore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    @cypcore
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="p-8 rounded-2xl bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/60 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-4">{t.contact.form.title}</h3>
              <p className="text-gray-400 mb-6">
                {t.contact.form.description} <span className="gradient-text font-semibold">{t.contact.form.descriptionHighlight}</span>{t.contact.form.descriptionEnd}
              </p>
              
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t.contact.form.nameLabel} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    {t.contact.form.emailLabel} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    {t.contact.form.messageLabel} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors duration-200 resize-vertical"
                    placeholder={t.contact.form.messagePlaceholder}
                    style={{ 
                      minHeight: '100px',
                      maxHeight: '300px'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-primary text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.form.submit}
                    </>
                  )}
                </button>

                {/* Submit Message */}
                {submitMessage && (
                  <div className={`p-4 rounded-lg text-sm ${
                    submitMessage.includes('correctamente') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      {submitMessage}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="logo-gradient-container">
                <img 
                  src="/logo.webp" 
                  alt="CyP Data" 
                  className="h-8 w-auto opacity-0"
                />
              </div>
              <p className="text-gray-400 mt-2">{t.footer.description}</p>
            </div>
            <div className="flex space-x-6">
              <a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">{t.nav.services}</a>
              <a href="#cases" className="text-gray-400 hover:text-purple-400 transition-colors">{t.nav.cases}</a>
              <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">{t.nav.contact}</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}