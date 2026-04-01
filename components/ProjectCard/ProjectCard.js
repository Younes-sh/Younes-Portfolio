'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const WIN_FONT = "'Tahoma', 'MS Sans Serif', Arial, sans-serif";

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#d4d0c8',
        borderTop:    '2px solid #ffffff',
        borderLeft:   '2px solid #ffffff',
        borderRight:  '2px solid #404040',
        borderBottom: '2px solid #404040',
        fontFamily: WIN_FONT,
        display: 'flex',
        flexDirection: 'column',
        transition: 'none',
        boxShadow: isHovered ? '3px 3px 0 #000000' : '2px 2px 0 #000000',
      }}
    >
      {/* Window title bar */}
      <div
        style={{
          background: isHovered
            ? 'linear-gradient(90deg, #1084d0 0%, #000080 100%)'
            : 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
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
          <span>&#128196;</span>
          {project.title}
        </span>
        <span style={{ display: 'flex', gap: '2px' }}>
          {['_', '□', '×'].map((btn, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '14px',
                height: '12px',
                backgroundColor: '#d4d0c8',
                borderTop:    '1px solid #ffffff',
                borderLeft:   '1px solid #ffffff',
                borderRight:  '1px solid #404040',
                borderBottom: '1px solid #404040',
                color: '#000000',
                fontSize: '8px',
                fontWeight: 'bold',
                cursor: 'default',
              }}
            >
              {btn}
            </span>
          ))}
        </span>
      </div>

      {/* Image area — sunken */}
      <div
        style={{
          margin: '8px',
          borderTop:    '2px solid #808080',
          borderLeft:   '2px solid #808080',
          borderRight:  '2px solid #ffffff',
          borderBottom: '2px solid #ffffff',
          overflow: 'hidden',
          position: 'relative',
          height: '160px',
          backgroundColor: '#000000',
        }}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          style={{
            objectFit: 'cover',
            imageRendering: 'auto',
            filter: isHovered ? 'none' : 'saturate(0.85) contrast(1.05)',
          }}
        />
        {/* Scan-line overlay for retro feel */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 2px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content area */}
      <div style={{ padding: '4px 10px 10px 10px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {/* Description — in a sunken field */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderTop:    '1px solid #808080',
            borderLeft:   '1px solid #808080',
            borderRight:  '1px solid #ffffff',
            borderBottom: '1px solid #ffffff',
            padding: '4px 6px',
            fontSize: '11px',
            color: '#000000',
            lineHeight: '1.5',
          }}
        >
          {project.description
            ? project.description.length > 90
              ? project.description.slice(0, 90) + '…'
              : project.description
            : 'No description available.'}
        </div>

        {/* Technologies — badge row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              style={{
                backgroundColor: '#000080',
                color: '#ffffff',
                fontSize: '10px',
                padding: '1px 6px',
                fontFamily: WIN_FONT,
                border: '1px solid #000040',
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span
              style={{
                backgroundColor: '#808080',
                color: '#ffffff',
                fontSize: '10px',
                padding: '1px 6px',
                fontFamily: WIN_FONT,
                border: '1px solid #404040',
              }}
            >
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Separator */}
        <div
          style={{
            height: '1px',
            backgroundColor: '#808080',
            borderBottom: '1px solid #ffffff',
          }}
        />

        {/* Footer row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href={`/projects/${project._id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 12px',
              fontSize: '11px',
              fontFamily: WIN_FONT,
              textDecoration: 'none',
              backgroundColor: '#d4d0c8',
              color: '#000000',
              borderTop:    '2px solid #ffffff',
              borderLeft:   '2px solid #ffffff',
              borderRight:  '2px solid #404040',
              borderBottom: '2px solid #404040',
            }}
          >
            Open &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
