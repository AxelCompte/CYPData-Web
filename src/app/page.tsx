'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Smartphone, Monitor, BarChart3, Database, Mail, Phone, MapPin, CheckCircle, Send, User, MessageSquare, Globe, Brain, Code } from 'lucide-react';
import { 
  SiReact, 
  SiFlutter, 
  SiSwift, 
  SiKotlin, 
  SiElectron, 
  SiQt, 
  SiDotnet, 
  SiNextdotjs, 
  SiVuedotjs, 
  SiNodedotjs,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
  SiTableau,
  SiApachespark,
  SiMongodb,
  SiElasticsearch
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Optimized video component with GIF fallback
// Optimized video component without hydration issues
const OptimizedVideo = ({ 
  src, 
  alt, 
  className = "",
  priority = false 
}: { 
  src: string, 
  alt: string, 
  className?: string,
  priority?: boolean 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [key, setKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Only run on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setIsLoaded(false);
    setKey(prev => prev + 1);
    
    // Small delay to ensure video element is ready
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load(); // Force reload the video
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [src]);

  // Use a stable cache-busting approach
  const videoSrc = isMounted ? `${src}?v=${key}` : src;

  return (
    <video
      ref={videoRef}
      key={`${src}-${key}`} // Force remount on key change
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 object-cover w-full h-full`}
      autoPlay
      loop
      muted
      playsInline
      onLoadedData={() => {
        console.log(`Video loaded: ${src}`);
        setIsLoaded(true);
      }}
      onCanPlay={() => {
        // Ensure video plays even after reload
        if (videoRef.current) {
          videoRef.current.play().catch(console.error);
        }
      }}
      onError={(e) => {
        console.error(`Video failed to load: ${src}`, e);
        // Try to reload the video on error
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.load();
          }
        }, 1000);
      }}
      preload="metadata"
    >
      <source src={videoSrc} type="video/webm" />
      <p className="text-gray-400 text-center p-4">
        Your browser doesn't support video playback.
      </p>
    </video>
  );
};

// Enhanced Button Component with Advanced Micro-Interactions
const EnhancedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  href,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'small' | 'default' | 'large';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-200 ease-out cursor-pointer select-none";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/25",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:border-purple-500",
    ghost: "text-purple-400 hover:text-purple-300 hover:bg-purple-500/10",
    outline: "border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm rounded-lg",
    default: "px-6 py-3 text-base rounded-xl",
    large: "px-8 py-4 text-lg rounded-xl"
  };

  const createRipple = (event: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (disabled || loading) return;
    
    createRipple(event);
    onClick?.();
  };

  const buttonMotion = {
    scale: isPressed ? 0.98 : isHovered ? 1.02 : 1,
    y: isPressed ? 1 : 0,
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      ref={buttonRef as any}
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      animate={buttonMotion}
      transition={{ duration: 0.15, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Magnetic hover effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{
              left: ripple.x - 2,
              top: ripple.y - 2,
              width: 4,
              height: 4,
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
        {variant === 'primary' && !loading && (
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}
      </span>

      {/* Shine effect for primary buttons */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{ 
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? [0, 0.1, 0] : 0 
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </Component>
  );
};

// Enhanced Navigation Link Component
const NavLink = ({ 
  href, 
  children, 
  className = "" 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href={href}
      className={`relative py-2 transition-colors ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      
      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.a>
  );
};

// Scroll Animation Components
const FadeInWhenVisible = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const directionVariants = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={directionVariants[direction]}
      variants={{
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            delay,
            ease: "easeOut"
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerChild = ({ 
  children, 
  direction = 'up',
  className = '' 
}: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  const directionVariants = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 }
  };

  return (
    <motion.div
      variants={{
        hidden: directionVariants[direction],
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Project Card Animation Component for Success Stories
const AnimatedProjectCard = ({ children, index }: {
  children: React.ReactNode;
  index: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: false, // Allow re-triggering for enter/exit effects
    amount: 0.3
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {
          opacity: 0,
          y: 60,
          scale: 0.95,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        }
      }}
      className="group"
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -8,
          transition: { 
            duration: 0.3, 
            ease: "easeOut" 
          }
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Technology Icon Mapping
const getTechIcon = (tech: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'React Native': <SiReact className="w-5 h-5" style={{ color: '#61DAFB' }} />,
    'React': <SiReact className="w-5 h-5" style={{ color: '#61DAFB' }} />,
    'Flutter': <SiFlutter className="w-5 h-5" style={{ color: '#02569B' }} />,
    'Swift': <SiSwift className="w-5 h-5" style={{ color: '#FA7343' }} />,
    'Kotlin': <SiKotlin className="w-5 h-5" style={{ color: '#7F52FF' }} />,
    'Electron': <SiElectron className="w-5 h-5" style={{ color: '#47848F' }} />,
    'Qt': <SiQt className="w-5 h-5" style={{ color: '#41CD52' }} />,
    '.NET': <SiDotnet className="w-5 h-5" style={{ color: '#512BD4' }} />,
    'Java': <FaJava className="w-5 h-5" style={{ color: '#ED8B00' }} />,
    'Next.js': <SiNextdotjs className="w-5 h-5" style={{ color: '#000000' }} />,
    'Vue.js': <SiVuedotjs className="w-5 h-5" style={{ color: '#4FC08D' }} />,
    'Node.js': <SiNodedotjs className="w-5 h-5" style={{ color: '#339933' }} />,
    'OpenAI': <SiOpenai className="w-5 h-5" style={{ color: '#412991' }} />,
    'TensorFlow': <SiTensorflow className="w-5 h-5" style={{ color: '#FF6F00' }} />,
    'PyTorch': <SiPytorch className="w-5 h-5" style={{ color: '#EE4C2C' }} />,
    'Power BI': <BarChart3 className="w-5 h-5" style={{ color: '#F2C811' }} />,
    'Tableau': <SiTableau className="w-5 h-5" style={{ color: '#E97627' }} />,
    'Apache Spark': <SiApachespark className="w-5 h-5" style={{ color: '#E25A1C' }} />,
    'MongoDB': <SiMongodb className="w-5 h-5" style={{ color: '#47A248' }} />,
    'Elasticsearch': <SiElasticsearch className="w-5 h-5" style={{ color: '#005571' }} />,
    // Fallback icons for technologies without specific icons
    'Qlik': <BarChart3 className="w-5 h-5 text-purple-400" />,
    'Custom BI': <BarChart3 className="w-5 h-5 text-purple-400" />,
    'Hadoop': <Database className="w-5 h-5 text-green-400" />,
    'Hugging Face': <Brain className="w-5 h-5 text-yellow-400" />
  };
  
  return iconMap[tech] || <Code className="w-5 h-5 text-gray-400" />;
};

// Expandable Service Card Component
const ExpandableServiceCard = ({ 
  service, 
  index 
}: {
  service: {
    icon: React.ReactNode;
    title: string;
    description: string;
    tech: string[];
  };
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getTransform = () => {
    if (!isHovered || !cardRef.current) return '';
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (mousePosition.y - centerY) / centerY * -8;
    const rotateY = (mousePosition.x - centerX) / centerX * 8;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <div
        ref={cardRef}
        className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer overflow-hidden"
        data-cursor-hover
        data-cursor-text={service.title}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          transform: getTransform(),
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
        }}
      >
        {/* Main Content */}
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg gradient-primary text-white mr-4 group-hover:scale-105 transition-transform duration-200">
            {service.icon}
          </div>
          <h3 className="text-2xl font-bold">{service.title}</h3>
        </div>
        
        <p className="text-gray-400 mb-2 leading-relaxed">{service.description}</p>
        
        {/* Expandable Technology Icons Section - Always rendered but hidden */}
        <div className="relative">
          <motion.div
            className="border-t border-gray-700/50"
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              paddingTop: isExpanded ? 16 : 0,
              marginTop: isExpanded ? 16 : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              height: { duration: 0.3 },
              opacity: { duration: 0.2, delay: isExpanded ? 0.1 : 0 }
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="flex items-center mb-3">
              <Code className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
                Technologies
              </span>
            </div>
            
            <motion.div 
              className="grid grid-cols-4 gap-4"
              initial={false}
              animate={{
                y: isExpanded ? 0 : 20
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: isExpanded ? 0.1 : 0
              }}
            >
              {service.tech.map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
                  initial={false}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    scale: isExpanded ? 1 : 0.9
                  }}
                  transition={{
                    duration: 0.2,
                    delay: isExpanded ? techIndex * 0.05 + 0.15 : 0,
                    ease: "easeOut"
                  }}
                  className="flex flex-col items-center p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors group/tech"
                >
                  <div className="mb-2 group-hover/tech:scale-105 transition-transform duration-150">
                    {getTechIcon(tech)}
                  </div>
                  <span className="text-xs text-gray-400 text-center leading-tight">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

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
      },
      aiIntegration: {
        title: "Integración de IA",
        description: "Implementación de soluciones de inteligencia artificial personalizadas que automatizan procesos y mejoran la toma de decisiones empresariales."
      },
      webDevelopment: {
        title: "Desarrollo Web",
        description: "Sitios web y aplicaciones web modernas, responsivas y optimizadas que ofrecen experiencias excepcionales y resultados medibles."
      }
    },
    midline: {
      title: "Soluciones a medida para cada desafío",
      subtitle: "Nos adaptamos a tu visión y requerimientos del proyecto"
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
      },
      aiIntegration: {
        title: "AI Integration",
        description: "Custom artificial intelligence solutions that automate processes, enhance decision-making, and drive business innovation."
      },
      webDevelopment: {
        title: "Web Development",
        description: "Modern, responsive, and optimized websites and web applications that deliver exceptional user experiences and measurable results."
      }
    },
    midline: {
      title: "Tailored solutions for every challenge",
      subtitle: "We adapt to your vision and project requirements"
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
      icon: <Code className="w-8 h-8" />,
      title: t.services.webDevelopment.title,
      description: t.services.webDevelopment.description,
      tech: ["React", "Next.js", "Vue.js", "Node.js"]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: t.services.aiIntegration.title,
      description: t.services.aiIntegration.description,
      tech: ["OpenAI", "TensorFlow", "PyTorch", "Hugging Face"]
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
      gif: "/project_01.webm",
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
      gif: "/project_02.webm",
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
      gif: "/project_03.webm",
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
              <Image 
                src="/logo.webp" 
                alt="CyP Data" 
                width={120}
                height={40}
                className="h-8 w-auto opacity-0"
                priority
              />
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink href="#services" className="hover:text-purple-400">{t.nav.services}</NavLink>
              <NavLink href="#cases" className="hover:text-purple-400">{t.nav.cases}</NavLink>
              <NavLink href="#contact" className="hover:text-purple-400">{t.nav.contact}</NavLink>
              
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
            backgroundImage: "url('/CYP.webp')",
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
          <FadeInWhenVisible direction="up" delay={0.2} className="hero-logo-white flex justify-center mb-8">
            <Image 
              src="/logo.webp" 
              alt="CyP Data" 
              width={192}
              height={128}
              className="h-24 md:h-32 w-auto"
              priority
            />
          </FadeInWhenVisible>
          
          <FadeInWhenVisible direction="up" delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="sr-only">CyP Data - </span>
              {t.hero.title} <span className="text-4xl md:text-6xl">{t.hero.subtitle}</span><br />
              <span className="gradient-text whitespace-nowrap">{t.hero.highlight}</span>
            </h1>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible direction="up" delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
             {t.hero.description}
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <EnhancedButton 
              href="#cases"
              variant="primary"
              size="large"
              className="text-lg font-semibold"
            >
              {t.hero.cta1}
            </EnhancedButton>
            <EnhancedButton 
              href="#contact"
              variant="outline"
              size="large"
              className="text-lg font-semibold"
            >
              {t.hero.cta2}
            </EnhancedButton>
            </div>
          </FadeInWhenVisible>
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
          <FadeInWhenVisible direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t.services.title} <span className="gradient-text">{t.services.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </FadeInWhenVisible>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.2}>
            {services.map((service, index) => (
              <StaggerChild key={index} direction="up">
                <ExpandableServiceCard 
                  service={service}
                  index={index}
                />
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mid-line Header */}
      <section className="relative py-16 px-6 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <FadeInWhenVisible direction="up" className="text-center">
            <div className="relative">
              {/* Enhanced Decorative elements */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/80 to-transparent transform -translate-y-1/2"></div>
              
              {/* Enhanced center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="absolute inset-0 w-3 h-3 bg-purple-300 rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* Side accent dots */}
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-400/60 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-400/60 rounded-full"></div>
              
              {/* Main content with better styling */}
              <div className="relative bg-gray-900 px-12 py-6 rounded-2xl border border-purple-500/20 inline-block">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl md:text-4xl font-bold">
                    <span className="gradient-text">{t.midline.title}</span>
                  </h3>
                  <p className="text-lg md:text-xl text-gray-300 font-medium">
                    {t.midline.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-20 px-6 bg-gray-900/80 backdrop-blur-md relative z-10">
        <div className="container mx-auto max-w-7xl">
          <FadeInWhenVisible direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t.cases.title} <span className="gradient-text">{t.cases.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.cases.description}
            </p>
          </FadeInWhenVisible>

          {/* Two-column layout: Left for text, Right for sticky GIFs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Scrolling Content */}
            <div className="space-y-8 lg:space-y-96 lg:pb-96">
              {caseStudies.map((study, index) => (
                <AnimatedProjectCard 
                  key={study.id}
                  index={index}
                >
                <div 
                  id={study.id}
                  ref={(el) => { elementsRef.current[index] = el; }}
                >
                  <div className="p-8 rounded-2xl bg-gray-900/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
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
                      <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl relative">
                        <OptimizedVideo
                          src={study.gif}
                          alt={`${study.title} demonstration`}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                </AnimatedProjectCard>
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
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl relative">
                      <OptimizedVideo
                        src={study.gif}
                        alt={`${study.title} demonstration`}
                        className="w-full h-full"
                        priority={activeProject === study.id}
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
          <FadeInWhenVisible direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </FadeInWhenVisible>

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
                <EnhancedButton
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className="w-full text-lg font-semibold"
                >
                  {isSubmitting ? t.contact.form.sending : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.form.submit}
                    </>
                  )}
                </EnhancedButton>

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
                <Image 
                  src="/logo.webp" 
                  alt="CyP Data" 
                  width={120}
                  height={40}
                  className="h-8 w-auto opacity-0"
                />
              </div>
              <p className="text-gray-400 mt-2">{t.footer.description}</p>
            </div>
            <div className="flex space-x-6">
              <NavLink href="#services" className="text-gray-400 hover:text-purple-400">{t.nav.services}</NavLink>
              <NavLink href="#cases" className="text-gray-400 hover:text-purple-400">{t.nav.cases}</NavLink>
              <NavLink href="#contact" className="text-gray-400 hover:text-purple-400">{t.nav.contact}</NavLink>
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