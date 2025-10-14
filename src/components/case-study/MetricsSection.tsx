'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Metric {
  value: string;
  label: string;
  suffix?: string;
}

interface MetricsSectionProps {
  metrics: Metric[];
}

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        // Format number
        if (numericValue >= 1000) {
          setDisplayValue(Math.floor(current).toLocaleString());
        } else if (numericValue >= 100) {
          setDisplayValue(Math.floor(current).toString());
        } else {
          setDisplayValue(current.toFixed(1));
        }
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="gradient-text text-6xl md:text-7xl font-bold">
      {displayValue}{suffix}
    </span>
  );
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Blur Overlay for sticky background */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        style={{ zIndex: 1 }}
      />
      
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-20" style={{ zIndex: 2 }}>
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Impact by <span className="gradient-text">Numbers</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Measurable results that demonstrate the success of our solution
            </p>
          </div>

          {/* Metrics Grid */}
          <div className={`grid grid-cols-1 ${metrics.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Card */}
                <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />
                  
                  <div className="relative">
                    {/* Number */}
                    <div className="mb-4">
                      <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                    </div>
                    
                    {/* Label */}
                    <p className="text-gray-400 text-lg font-medium">
                      {metric.label}
                    </p>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
