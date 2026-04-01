'use client';

import Link from 'next/link';
import Image from 'next/image';

const WIN_FONT = "'Tahoma', 'MS Sans Serif', Arial, sans-serif";

/* Reusable Win2K window wrapper */
function Win2kWindow({ title, icon, children, style = {}, titleBarExtra }) {
  return (
    <div
      style={{
        border: '2px solid #ffffff',
        borderRight: '2px solid #404040',
        borderBottom: '2px solid #404040',
        backgroundColor: '#d4d0c8',
        fontFamily: WIN_FONT,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 'bold',
          padding: '3px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {icon && <span style={{ fontSize: '14px' }}>{icon}</span>}
          {title}
        </span>
        {/* Win2K window control buttons */}
        <span style={{ display: 'flex', gap: '2px' }}>
          {['_', '□', '×'].map((btn, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '14px',
                backgroundColor: '#d4d0c8',
                borderTop:    '1px solid #ffffff',
                borderLeft:   '1px solid #ffffff',
                borderRight:  '1px solid #404040',
                borderBottom: '1px solid #404040',
                color: '#000000',
                fontSize: '9px',
                fontWeight: 'bold',
                cursor: 'default',
              }}
            >
              {btn}
            </span>
          ))}
        </span>
      </div>
      {/* Content area */}
      <div style={{ padding: '12px' }}>{children}</div>
    </div>
  );
}

/* Win2K raised button */
function Win2kButton({ href, children, primary }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 16px',
        fontSize: '11px',
        fontFamily: WIN_FONT,
        fontWeight: 'bold',
        textDecoration: 'none',
        backgroundColor: primary ? '#000080' : '#d4d0c8',
        color: primary ? '#ffffff' : '#000000',
        borderTop:    '2px solid ' + (primary ? '#6060c0' : '#ffffff'),
        borderLeft:   '2px solid ' + (primary ? '#6060c0' : '#ffffff'),
        borderRight:  '2px solid ' + (primary ? '#000040' : '#404040'),
        borderBottom: '2px solid ' + (primary ? '#000040' : '#404040'),
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Link>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#008080',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0,0,100,0.15) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(0,100,100,0.15) 0%, transparent 40%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: WIN_FONT,
      }}
    >
      <div style={{ width: '100%', maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Main "My Computer" style window */}
        <Win2kWindow
          title="Younes Sheikhlar — Portfolio"
          icon="💼"
          style={{ width: '100%' }}
        >
          {/* Inner content split */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left pane — avatar + badge */}
            <div
              style={{
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                borderTop:    '2px solid #808080',
                borderLeft:   '2px solid #808080',
                borderRight:  '2px solid #ffffff',
                borderBottom: '2px solid #ffffff',
                backgroundColor: '#c0c0c0',
                minWidth: '160px',
              }}
            >
              <Image
                src="/logo.png"
                alt="Younes Sheikhlar"
                width={100}
                height={100}
                style={{ imageRendering: 'pixelated', display: 'block' }}
              />
              {/* Badge */}
              <div
                style={{
                  backgroundColor: '#000080',
                  color: '#ffff00',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  textAlign: 'center',
                  border: '1px solid #ffff00',
                }}
              >
                Full Stack Developer
              </div>
              {/* Fake "Details" list */}
              <div style={{ fontSize: '10px', color: '#000000', width: '100%', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #808080', padding: '1px 0' }}>
                  <span>Status:</span><span style={{ color: '#008000', fontWeight: 'bold' }}>Online</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #808080', padding: '1px 0' }}>
                  <span>Type:</span><span>Developer</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
                  <span>Version:</span><span>v2.0.0</span>
                </div>
              </div>
            </div>

            {/* Right pane — main text */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Sunken "output" area */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderTop:    '2px solid #808080',
                  borderLeft:   '2px solid #808080',
                  borderRight:  '2px solid #ffffff',
                  borderBottom: '2px solid #ffffff',
                  padding: '10px 12px',
                }}
              >
                <h1
                  style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#000080',
                    margin: '0 0 6px 0',
                    fontFamily: WIN_FONT,
                  }}
                >
                  Crafting Digital Experiences
                </h1>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#000000',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                >
                  I build exceptional web applications that combine beautiful design
                  with powerful functionality. Let&apos;s create something extraordinary together.
                </p>
              </div>

              {/* Fake system info box */}
              <div
                style={{
                  backgroundColor: '#f0ece0',
                  borderTop:    '2px solid #808080',
                  borderLeft:   '2px solid #808080',
                  borderRight:  '2px solid #ffffff',
                  borderBottom: '2px solid #ffffff',
                  padding: '6px 12px',
                  fontSize: '10px',
                  color: '#000000',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {[
                      ['Computer:', 'YOUNES-PC'],
                      ['Processor:', 'React 19 @ 90% Proficiency'],
                      ['Memory (RAM):', '∞ Ideas Available'],
                      ['Operating System:', 'Next.js 16 Professional'],
                    ].map(([label, val]) => (
                      <tr key={label}>
                        <td style={{ fontWeight: 'bold', paddingRight: '16px', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{label}</td>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Win2kButton href="/projects" primary>
                  &gt; View My Work
                </Win2kButton>
                <Win2kButton href="/contact">
                  Get in Touch
                </Win2kButton>
              </div>
            </div>
          </div>
        </Win2kWindow>

        {/* Status bar below window */}
        <div
          style={{
            backgroundColor: '#d4d0c8',
            borderTop:    '2px solid #ffffff',
            borderLeft:   '2px solid #ffffff',
            borderRight:  '2px solid #404040',
            borderBottom: '2px solid #404040',
            padding: '2px 8px',
            fontSize: '10px',
            fontFamily: WIN_FONT,
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              borderTop:    '1px solid #808080',
              borderLeft:   '1px solid #808080',
              borderRight:  '1px solid #ffffff',
              borderBottom: '1px solid #ffffff',
              padding: '1px 6px',
            }}
          >
            Ready
          </span>
          <span
            style={{
              borderTop:    '1px solid #808080',
              borderLeft:   '1px solid #808080',
              borderRight:  '1px solid #ffffff',
              borderBottom: '1px solid #ffffff',
              padding: '1px 6px',
            }}
          >
            3 Objects
          </span>
          <span style={{ marginLeft: 'auto', color: '#000080', fontWeight: 'bold' }}>
            sheikhlaryounes.dev
          </span>
        </div>

      </div>
    </section>
  );
}
