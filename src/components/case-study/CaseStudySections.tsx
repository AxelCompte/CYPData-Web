'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ConstellationBackground } from '@/components/animations/ConstellationBackground';

interface BulletPoint {
  title: string;
  description: string;
}

interface Section {
  id: string;
  title: string;
  points: BulletPoint[];
  image: string;
}

interface CaseStudySectionsProps {
  goals: { points: BulletPoint[]; image: string };
  challenge: { points: BulletPoint[]; image: string };
  approach: { points: BulletPoint[]; image: string };
  results: { points: BulletPoint[]; image: string };
}

export function CaseStudySections({ goals, challenge, approach, results }: CaseStudySectionsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const containerRef = useRef<HTMLElement>(null);

  const sections: Section[] = [
    {
      id: 'goals',
      title: 'Project Goals',
      points: goals.points,
      image: goals.image,
    },
    {
      id: 'challenge',
      title: 'The Challenge',
      points: challenge.points,
      image: challenge.image,
    },
    {
      id: 'approach',
      title: 'Our Approach',
      points: approach.points,
      image: approach.image,
    },
    {
      id: 'results',
      title: 'The Results',
      points: results.points,
      image: results.image,
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    setActiveSection('goals');
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMounted]);

  return (
    <section ref={containerRef} className="relative bg-gray-900 overflow-hidden">
      <ConstellationBackground sectionRef={containerRef} />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8 lg:space-y-96 lg:pb-96">
            {sections.map((section, sectionIndex) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionsRef.current[section.id] = el;
                }}
                className="min-h-screen flex items-center"
              >
                <div className="w-full">
                  <div className="p-8 md:p-10 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-[#a476ff]/30 transition-all duration-300">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
                        {section.title}
                      </h2>

                      <div className="lg:hidden mb-8">
                        <div className="relative h-80 rounded-xl overflow-hidden">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        {section.points.map((point, pointIndex) => (
                          <motion.div
                            key={pointIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: pointIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex items-start space-x-4"
                          >
                            <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-[#a476ff] to-[#7c52ef] text-white">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                                {point.title}
                              </h3>
                              <p className="text-gray-400 leading-relaxed">
                                {point.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[70vh] flex items-center justify-center">
            <div className="relative w-full h-full max-w-lg flex items-center justify-center">
              {isMounted && sections.map((section) => (
                <div
                  key={section.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeSection === section.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={activeSection === section.id}
                    />
                  </div>
                </div>
              ))}

              {!activeSection && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#a476ff]/20 to-[#7c52ef]/20 flex items-center justify-center">
                      <svg className="w-16 h-16 text-[#a476ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-lg">Scroll to explore the project</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
