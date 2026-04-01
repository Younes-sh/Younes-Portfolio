'use client';

import { useInView } from 'react-intersection-observer';

const WIN_FONT = "'Tahoma', 'MS Sans Serif', Arial, sans-serif";

const skills = [
  { name: 'React.js',    level: 90 },
  { name: 'Next.js',     level: 85 },
  { name: 'Node.js',     level: 85 },
  { name: 'TypeScript',  level: 80 },
  { name: 'MongoDB',     level: 85 },
  { name: 'Tailwind CSS',level: 90 },
  { name: 'GraphQL',     level: 75 },
  { name: 'Python',      level: 70 },
  { name: 'Docker',      level: 30 },
  { name: 'AWS',         level: 25 },
  { name: 'Git',         level: 85 },
  { name: 'Vercel',      level: 90 },
  { name: 'Netlify',     level: 80 },
  { name: 'Linux',       level: 70 },
  { name: 'Redux',       level: 80 },
  { name: 'Sass',        level: 75 },
  { name: 'Webpack',     level: 65 },
  { name: 'Babel',       level: 60 },
  { name: 'ESLint',      level: 80 },
  { name: 'Prettier',    level: 85 },
  { name: 'GitHub',      level: 90 },
  { name: 'Cloudinary',  level: 80 },
];

function SkillRow({ skill, inView, index }) {
  const isHighLevel = skill.level >= 80;

  return (
    <tr
      style={{
        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0ece0',
      }}
    >
      {/* Name cell */}
      <td
        style={{
          padding: '3px 8px',
          fontSize: '11px',
          fontFamily: WIN_FONT,
          color: '#000000',
          whiteSpace: 'nowrap',
          borderRight: '1px solid #d4d0c8',
          width: '130px',
        }}
      >
        {isHighLevel && (
          <span
            style={{
              color: '#000080',
              fontWeight: 'bold',
              marginRight: '4px',
            }}
          >
            *
          </span>
        )}
        {skill.name}
      </td>

      {/* Progress bar cell */}
      <td style={{ padding: '4px 8px', width: '100%' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderTop:    '1px solid #808080',
            borderLeft:   '1px solid #808080',
            borderRight:  '1px solid #ffffff',
            borderBottom: '1px solid #ffffff',
            height: '14px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: inView ? `${skill.level}%` : '0%',
              height: '100%',
              background: 'repeating-linear-gradient(90deg, #000080 0px, #000080 9px, #1084d0 9px, #1084d0 13px)',
              transition: `width 0.8s ease ${index * 40}ms`,
            }}
          />
        </div>
      </td>

      {/* Percentage cell */}
      <td
        style={{
          padding: '3px 8px',
          fontSize: '10px',
          fontFamily: WIN_FONT,
          color: '#000080',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          width: '40px',
          textAlign: 'right',
        }}
      >
        {skill.level}%
      </td>
    </tr>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const col1 = skills.slice(0, 11);
  const col2 = skills.slice(11);

  return (
    <section
      style={{
        padding: '32px 16px',
        backgroundColor: '#008080',
        fontFamily: WIN_FONT,
      }}
      id="skills"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Outer window */}
        <div
          style={{
            backgroundColor: '#d4d0c8',
            borderTop:    '2px solid #ffffff',
            borderLeft:   '2px solid #ffffff',
            borderRight:  '2px solid #404040',
            borderBottom: '2px solid #404040',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '3px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              userSelect: 'none',
            }}
          >
            <span>&#9881;</span>
            System Properties — Technical Skills
            <span style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
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

          {/* Tab bar */}
          <div
            style={{
              display: 'flex',
              gap: '2px',
              padding: '6px 8px 0 8px',
              backgroundColor: '#d4d0c8',
              borderBottom: '2px solid #808080',
            }}
          >
            {['General', 'Hardware', 'Performance', 'Skills'].map((tab) => (
              <div
                key={tab}
                style={{
                  padding: '3px 12px',
                  fontSize: '11px',
                  fontFamily: WIN_FONT,
                  backgroundColor: tab === 'Skills' ? '#d4d0c8' : '#c0bcb4',
                  borderTop:    '2px solid ' + (tab === 'Skills' ? '#ffffff' : '#c0bcb4'),
                  borderLeft:   '2px solid ' + (tab === 'Skills' ? '#ffffff' : '#c0bcb4'),
                  borderRight:  '2px solid ' + (tab === 'Skills' ? '#808080' : '#808080'),
                  borderBottom: tab === 'Skills' ? '2px solid #d4d0c8' : '2px solid #808080',
                  cursor: 'default',
                  marginBottom: tab === 'Skills' ? '-2px' : '0',
                  position: 'relative',
                  zIndex: tab === 'Skills' ? 1 : 0,
                  color: '#000000',
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Tab content */}
          <div
            ref={ref}
            style={{
              padding: '12px',
              backgroundColor: '#d4d0c8',
            }}
          >
            {/* Description */}
            <div
              style={{
                fontSize: '11px',
                color: '#000000',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  flexShrink: 0,
                  backgroundColor: '#000080',
                  border: '2px solid #404040',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                YS
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Younes Sheikhlar</div>
                <div>Technologies and tools I work with to bring ideas to life.</div>
                <div style={{ color: '#000080', marginTop: '2px' }}>* Denotes high proficiency level (&ge;80%)</div>
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: '1px', backgroundColor: '#808080', borderBottom: '1px solid #ffffff', marginBottom: '10px' }} />

            {/* Two-column skill tables */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {[col1, col2].map((col, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    backgroundColor: '#ffffff',
                    borderTop:    '2px solid #808080',
                    borderLeft:   '2px solid #808080',
                    borderRight:  '2px solid #ffffff',
                    borderBottom: '2px solid #ffffff',
                    overflow: 'hidden',
                  }}
                >
                  {/* Table header */}
                  <div
                    style={{
                      backgroundColor: '#000080',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      display: 'grid',
                      gridTemplateColumns: '130px 1fr 40px',
                      gap: '0',
                    }}
                  >
                    <span>Name</span>
                    <span>Proficiency</span>
                    <span style={{ textAlign: 'right' }}>%</span>
                  </div>
                  {/* Rows */}
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {col.map((skill, idx) => (
                        <SkillRow key={skill.name} skill={skill} inView={inView} index={idx + colIdx * 11} />
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* OK / Cancel buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '6px',
                marginTop: '12px',
              }}
            >
              {['OK', 'Cancel', 'Apply'].map((label) => (
                <button
                  key={label}
                  style={{
                    padding: '3px 20px',
                    fontSize: '11px',
                    fontFamily: WIN_FONT,
                    backgroundColor: '#d4d0c8',
                    color: '#000000',
                    borderTop:    '2px solid #ffffff',
                    borderLeft:   '2px solid #ffffff',
                    borderRight:  '2px solid #404040',
                    borderBottom: '2px solid #404040',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
