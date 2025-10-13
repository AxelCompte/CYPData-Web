'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

interface NavigationProps {
  transparent?: boolean;
}

const languages = [
  { code: 'ca' as const, name: 'Català', flag: '🇪🇸' },
  { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
  { code: 'en' as const, name: 'English', flag: '🇬🇧' }
];

export function Navigation({ transparent = false }: NavigationProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isInHero, setIsInHero] = useState(isHomePage);
  const [language, setLanguage] = useState<'ca' | 'es' | 'en'>('ca');
  const [isMounted, setIsMounted] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentLanguage = languages.find(lang => lang.code === language);

  const changeLanguage = (newLanguage: 'ca' | 'es' | 'en') => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  // Track scroll for hero section (only on homepage)
  useEffect(() => {
    if (!isHomePage) {
      setIsInHero(false);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      setIsInHero(scrollY < heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLanguageDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('.language-dropdown')) {
          setIsLanguageDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  // Smooth scroll function for homepage
  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 60;
        const elementTop = element.offsetTop - navHeight;
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', isHome: true },
    { href: '/case-studies', label: 'Case Studies', section: 'cases' },
    { href: '/#services', label: 'Services', section: 'services' },
    { href: '/#contact', label: 'Contact', section: 'contact' },
  ];

  const showNav = transparent ? !isInHero : true;

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 transition-all duration-500 ${
        showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="logo-gradient-container">
            <Image
              src="/CYPData_logo_white.svg"
              alt="CyP Data"
              width={120}
              height={40}
              className="h-8 w-auto opacity-0"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (isHomePage && link.section) {
                    e.preventDefault();
                    scrollToSection(link.section);
                  }
                }}
                className="hover:text-[#b58bff] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            {isMounted && (
              <div className="relative language-dropdown">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-700 hover:border-[#a476ff] transition-colors"
                  title="Choose language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{currentLanguage?.name}</span>
                  <motion.div
                    animate={{ rotate: isLanguageDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isLanguageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 min-w-[140px] z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors flex items-center space-x-3 ${
                            language === lang.code ? 'text-[#b58bff] bg-gray-700/50' : 'text-gray-300'
                          }`}
                        >
                          <span className="text-sm">{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              className="w-6 h-0.5 bg-white rounded-full"
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white rounded-full"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white rounded-full"
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="container mx-auto px-6 py-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (isHomePage && link.section) {
                            e.preventDefault();
                            scrollToSection(link.section);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className="block py-3 text-lg hover:text-[#b58bff] border-b border-gray-800 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Language Switcher */}
                  {isMounted && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.1 }}
                      className="pt-4 space-y-2"
                    >
                      <div className="text-sm text-gray-400 px-4 mb-2">Idioma / Language</div>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 py-3 px-4 rounded-lg border transition-colors w-full ${
                            language === lang.code
                              ? 'border-[#a476ff] bg-[#a476ff]/10 text-[#b58bff]'
                              : 'border-gray-700 hover:border-[#a476ff]'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-lg font-medium">{lang.name}</span>
                          {language === lang.code && (
                            <div className="ml-auto">
                              <svg className="w-5 h-5 text-[#b58bff]" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
