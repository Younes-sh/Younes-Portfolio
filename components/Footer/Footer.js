const WIN_FONT = "'Tahoma', 'MS Sans Serif', Arial, sans-serif";

export default function Footer() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <footer
      style={{
        backgroundColor: '#d4d0c8',
        borderTop: '2px solid #ffffff',
        fontFamily: WIN_FONT,
      }}
    >
      {/* Separator */}
      <div style={{ height: '1px', backgroundColor: '#808080', borderBottom: '1px solid #ffffff' }} />

      {/* Windows taskbar-style bar */}
      <div
        style={{
          background: 'linear-gradient(180deg, #1680d8 0%, #0f6bbd 40%, #0d5faa 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '3px 6px',
          gap: '8px',
          minHeight: '30px',
        }}
      >
        {/* Start button area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* "Start" button */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '2px 10px 2px 6px',
              backgroundColor: '#4a9a3c',
              borderRadius: '0 8px 8px 0',
              borderTop:    '1px solid #6fd45a',
              borderLeft:   '1px solid #6fd45a',
              borderRight:  '1px solid #2a6a20',
              borderBottom: '1px solid #2a6a20',
              cursor: 'default',
              fontWeight: 'bold',
              fontSize: '12px',
              color: '#ffffff',
              textShadow: '1px 1px 1px #000000',
              letterSpacing: '0.5px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                width: '16px',
                height: '16px',
                backgroundColor: '#d4d0c8',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#000080',
                flexShrink: 0,
              }}
            >
              &#9658;
            </span>
            start
          </div>

          {/* Quick launch separator */}
          <div
            style={{
              width: '2px',
              height: '22px',
              borderLeft: '1px solid #0a4f9a',
              borderRight: '1px solid #2090e0',
            }}
          />

          {/* Open "windows" in taskbar */}
          {[
            { label: 'Portfolio.exe', active: true },
            { label: 'GitHub.lnk', active: false },
          ].map((win) => (
            <div
              key={win.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                color: '#ffffff',
                backgroundColor: win.active ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
                border: win.active
                  ? '1px solid rgba(0,0,0,0.5)'
                  : '1px solid rgba(255,255,255,0.2)',
                cursor: 'default',
                minWidth: '100px',
                textShadow: '1px 1px 1px #000000',
              }}
            >
              <span style={{ fontSize: '12px' }}>&#128196;</span>
              {win.label}
            </div>
          ))}
        </div>

        {/* System tray (right side) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(0,0,0,0.4)',
            padding: '2px 8px',
          }}
        >
          {/* Links */}
          {[
            { label: 'GitHub', href: 'https://github.com/Younes-sh' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/younes-sheikhlar/' },
            { label: 'Email', href: 'mailto:sheikhlaryounes@gmail.com' },
          ].map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                fontSize: '11px',
                color: '#ffffff',
                textDecoration: 'none',
                textShadow: '1px 1px 1px #000000',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.3)' : 'none',
                paddingLeft: i > 0 ? '6px' : '0',
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Separator */}
          <div
            style={{
              width: '2px',
              height: '18px',
              borderLeft: '1px solid rgba(0,0,0,0.5)',
              borderRight: '1px solid rgba(255,255,255,0.3)',
              marginLeft: '2px',
            }}
          />

          {/* Clock */}
          <span
            style={{
              fontSize: '11px',
              color: '#ffffff',
              textShadow: '1px 1px 1px #000000',
              whiteSpace: 'nowrap',
            }}
          >
            {timeStr}
          </span>
        </div>
      </div>

      {/* Copyright strip */}
      <div
        style={{
          backgroundColor: '#d4d0c8',
          borderTop: '1px solid #808080',
          padding: '2px 10px',
          fontSize: '10px',
          color: '#404040',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>&copy; {new Date().getFullYear()} Younes Sheikhlar. All rights reserved.</span>
        <span style={{ color: '#808080' }}>Portfolio v2.0 — Built with Next.js</span>
      </div>
    </footer>
  );
}
