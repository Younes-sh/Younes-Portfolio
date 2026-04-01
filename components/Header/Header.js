'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'About me', href: '/about' },
  ];

  return (
    <header
      style={{
        backgroundColor: '#d4d0c8',
        borderBottom: '2px solid #404040',
        borderTop: '2px solid #ffffff',
        fontFamily: "'Tahoma', 'MS Sans Serif', Arial, sans-serif",
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Menu bar row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 12px',
          backgroundColor: '#d4d0c8',
        }}
      >
        {/* Logo + site name */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            style={{ imageRendering: 'pixelated' }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#000000',
              fontFamily: "'Tahoma', Arial, sans-serif",
            }}
          >
            Younes.Portfolio
          </span>
        </Link>

        {/* Desktop nav — Win2000 menu-bar style */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
          className="hidden md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                display: 'inline-block',
                padding: '3px 10px',
                fontSize: '11px',
                fontFamily: "'Tahoma', Arial, sans-serif",
                color: '#000000',
                textDecoration: 'none',
                backgroundColor: pathname === item.href ? '#000080' : 'transparent',
                color: pathname === item.href ? '#ffffff' : '#000000',
                borderTop:    pathname === item.href ? '2px solid #808080' : '2px solid transparent',
                borderLeft:   pathname === item.href ? '2px solid #808080' : '2px solid transparent',
                borderRight:  pathname === item.href ? '2px solid #ffffff' : '2px solid transparent',
                borderBottom: pathname === item.href ? '2px solid #ffffff' : '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = '#000080';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderTop    = '2px solid #808080';
                  e.currentTarget.style.borderLeft   = '2px solid #808080';
                  e.currentTarget.style.borderRight  = '2px solid #ffffff';
                  e.currentTarget.style.borderBottom = '2px solid #ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.borderTop    = '2px solid transparent';
                  e.currentTarget.style.borderLeft   = '2px solid transparent';
                  e.currentTarget.style.borderRight  = '2px solid transparent';
                  e.currentTarget.style.borderBottom = '2px solid transparent';
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger — styled as Win2K button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          style={{
            backgroundColor: '#d4d0c8',
            borderTop:    '2px solid #ffffff',
            borderLeft:   '2px solid #ffffff',
            borderRight:  '2px solid #404040',
            borderBottom: '2px solid #404040',
            padding: '3px 8px',
            cursor: 'pointer',
            fontSize: '11px',
            fontFamily: "'Tahoma', Arial, sans-serif",
          }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '▲ Menu' : '▼ Menu'}
        </button>
      </div>

      {/* Win2K-style separator */}
      <div
        style={{
          height: '1px',
          backgroundColor: '#808080',
          borderBottom: '1px solid #ffffff',
          margin: '0 0',
        }}
      />

      {/* Mobile dropdown — looks like a context menu */}
      {isMenuOpen && (
        <nav
          style={{
            backgroundColor: '#d4d0c8',
            borderLeft:   '2px solid #ffffff',
            borderRight:  '2px solid #404040',
            borderBottom: '2px solid #404040',
            position: 'absolute',
            right: '12px',
            top: '100%',
            minWidth: '160px',
            zIndex: 100,
            boxShadow: '2px 2px 0 #000000',
          }}
          className="md:hidden"
        >
          {navigation.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '4px 20px',
                fontSize: '11px',
                fontFamily: "'Tahoma', Arial, sans-serif",
                textDecoration: 'none',
                backgroundColor: pathname === item.href ? '#000080' : 'transparent',
                color: pathname === item.href ? '#ffffff' : '#000000',
                borderBottom: idx < navigation.length - 1 ? '1px solid #808080' : 'none',
              }}
            >
              {pathname === item.href ? '> ' : '\u00a0\u00a0'}{item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
