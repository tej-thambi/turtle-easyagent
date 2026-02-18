'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/agent-builder', label: 'Builder' },
    { href: '/agent-library', label: 'Library' },
    { href: '/deploy', label: 'Deploy' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-pink-purple rounded-2xl flex items-center justify-center group-hover:shadow-bold-md transition-shadow">
              <span className="text-white font-extrabold text-lg">⚙️</span>
            </div>
            <span className="font-extrabold text-xl text-dark-900 hidden sm:inline">
              EasyAgent
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg font-semibold transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-pink text-white shadow-bold-sm'
                    : 'text-dark-900 hover:bg-gray-100'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex gap-3 items-center">
            <button className="px-6 py-2.5 bg-gradient-pink-purple text-white font-bold rounded-xl shadow-bold-md hover:shadow-bold-lg transition-all duration-200">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'block px-4 py-2 rounded-lg font-semibold transition-all duration-200',
                    isActive(item.href)
                      ? 'bg-pink text-white'
                      : 'text-dark-900 hover:bg-gray-100'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button className="w-full mt-4 px-4 py-2.5 bg-gradient-pink-purple text-white font-bold rounded-xl shadow-bold-md hover:shadow-bold-lg transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
