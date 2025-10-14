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

function useIntersectionObserver() {
  const [activeId, setActiveId] = useState('');
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return [activeId, elementsRef] as const;
}

export function CaseStudySections({ goals, challenge, approach, results }: CaseStudySectionsProps) {
  const [activeSection, elementsRef] = useIntersectionObserver();
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

  return (
    <section ref={containerRef} className="py-20 px-6 bg-gray-900/80 backdrop-blur-md relative z-10">
      <ConstellationBackground sectionRef={containerRef} />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Two-column layout: Left for text, Right for sticky images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Scrolling Content */}
          <div className="space-y-8 lg:space-y-96 lg:pb-96">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => { elementsRef.current[index] = el; }}
              >
                <div className="p-8 rounded-2xl bg-gray-900/80 border border-gray-700/50 hover:border-[#a476ff]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a476ff]/10">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                      {section.title}
                    </h2>

                    {/* Mobile Image - Show on small screens only */}
                    <div className="lg:hidden mb-8">
                      <div className="relative h-80 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    </div>

                    {/* Key Points */}
                    <div className="space-y-6">
                      {section.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-[#a476ff] to-[#7c52ef] text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                              {point.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              {point.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Sticky Image Display (Desktop Only) */}
          <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[70vh] flex items-center justify-center">
            <div className="relative w-full h-full max-w-lg flex items-center justify-center">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeSection === section.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl relative">
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
              
              {/* Default state when no section is active */}
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
