'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Baloo_2 } from 'next/font/google';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
        if (event.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
        document.removeEventListener('keydown', handleEscKey);
    }
  }, [isMobileMenuOpen]);

 useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 10);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
 }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
        ? 'bg-white/95 backdrop-blur-sm shadow-sm'
        : 'bg-white/90 backdrop-blur-sm '
    }`}>
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-22">
                {/* brand */}
                <Link href="/" className="flex items-center">
                    <h1 className={`text-xl font-bold text-[#202A44] ${baloo.className}`}>
                        Trackly
                    </h1>
                </Link>
                {/* Desktop Nav */} 
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-gray-700 hover:text-[#202A44] transition-colors">
                        Home
                    </Link>
                    <Link href="/features" className="text-gray-700 hover:text-[#202A44] transition-colors">
                        Features
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-[#202A44] transition-colors">
                        About
                    </Link>
                    <Link href="/login" className="text-gray-700 hover:text-[#202A44] transition-colors">
                        Login
                    </Link>
                    <Link href="/register" className="bg-[#202A44] text-white px-4 py-2 rounded-full hover:bg-[#1a1f35] transition-colors">
                        Register<span className="ml-2">❯</span>
                    </Link>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 hover:text-[#202A44] p-2"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle mobile menu"
                    >
                        <span className="sr-only">Open menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
                        <Link
                            href="/"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 text-gray-700 hover:text-[#202A44] hover:bg-gray-50 rounded-md transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/features"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 text-gray-700 hover:text-[#202A44] hover:bg-gray-50 rounded-md transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/about"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 text-gray-700 hover:text-[#202A44] hover:bg-gray-50 rounded-md transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/login"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 text-gray-700 hover:text-[#202A44] hover:bg-gray-50 rounded-md transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 bg-[#202A44] text-white hover:bg-[#1a1f35] transition-colors rounded-md text-center"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}