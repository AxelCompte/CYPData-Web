import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="logo-gradient-container inline-block">
              <Image
                src="/CYPData_logo_white.svg"
                alt="CyP Data"
                width={120}
                height={40}
                className="h-8 w-auto opacity-0"
              />
            </Link>
            <p className="text-gray-400 mt-2">
              Digital Solutions & Business Intelligence | Barcelona, Spain
            </p>
          </div>
          <div className="flex space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-[#b58bff] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} CyP Data. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
