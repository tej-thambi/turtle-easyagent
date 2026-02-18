'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const Nav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/agent-builder', label: 'Builder' },
    { href: '/agent-library', label: 'Library' },
    { href: '/deploy', label: 'Deploy' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-pink-purple rounded-2xl flex items-center justify-center group-hover:shadow-bold-md transition-shadow">
              <span className="text-white font-extrabold text-lg">⚙️</span>
            </div>
            <span className="font-extrabold text-xl text-dark-900 hidden sm:inline">
              EasyAgent
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg font-semibold transition-all duration-200',
                  pathname === item.href
                    ? 'bg-pink text-white shadow-bold-sm'
                    : 'text-dark-900 hover:bg-gray-100'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/dashboard"
            className="hidden sm:inline-block px-6 py-2.5 bg-gradient-pink-purple text-white font-bold rounded-xl shadow-bold-md hover:shadow-bold-lg transition-all duration-200"
          >
            Get Started
          </Link>

          {/* Mobile Menu Toggle (placeholder) */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
