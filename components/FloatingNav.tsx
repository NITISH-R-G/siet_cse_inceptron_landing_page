'use client';

/**
 * FloatingNav — fully transparent navbar with only two bare text links.
 * Zero background, zero blur, zero border. Only the text is visible.
 * Font: Cindie Mono (loaded via CDN in globals.css).
 */
export function FloatingNav() {
  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 flex items-start justify-end pt-8 pr-10"
      style={{
        background: 'transparent',
        backdropFilter: 'none',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <div className="flex gap-10">
        {['Home', 'Dashboard'].map((label) => (
          <a
            key={label}
            href="#"
            className="font-cindie text-white text-sm uppercase no-underline cursor-pointer transition-opacity duration-150"
            style={{
              letterSpacing: '0.2em',
              opacity: 0.7,
              fontWeight: 400,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7';
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
