import { ImageResponse } from 'next/og';

// Open Graph image configuration
export const runtime = 'edge';
export const alt = 'Hyde Media - Premium Out-of-Home Advertising';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Generate Open Graph image
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #60a5fa 50%, #93c5fd 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px',
            zIndex: 10,
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 20,
            }}
          >
            {/* HYDE in geometric style */}
            <div
              style={{
                fontSize: 180,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.05em',
                textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                lineHeight: 1,
              }}
            >
              HYDE
            </div>
            {/* MEDIA in smaller geometric style */}
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.15em',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                marginTop: -20,
              }}
            >
              MEDIA
            </div>
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: 'white',
              letterSpacing: '-0.02em',
              maxWidth: 900,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              marginTop: 40,
            }}
          >
            Premium Aussenwerbung in der Schweiz
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              marginTop: 20,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            High-Impact Banner Campaigns • Premium Outdoor Advertising
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
