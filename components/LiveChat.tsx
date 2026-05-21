'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LiveChat() {
  const pathname = usePathname();

  useEffect(() => {
    // Tawk.to configuration
    const tawkPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const tawkWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    // Only load if IDs are configured
    if (!tawkPropertyId || !tawkWidgetId) {
      console.log('Tawk.to not configured - add NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID to .env.local');
      return;
    }

    // Prevent double loading
    if ((window as any).Tawk_API) {
      return;
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    // Configure Tawk.to
    script.onload = () => {
      const Tawk_API = (window as any).Tawk_API || {};
      
      // Customize widget based on locale
      const isDanish = pathname?.startsWith('/da');
      
      Tawk_API.onLoad = function() {
        // Set default language
        if (isDanish) {
          Tawk_API.setAttributes({
            name: '',
            email: '',
          });
        }
      };
    };

    // Cleanup function
    return () => {
      const tawkScript = document.querySelector(`script[src*="tawk.to"]`);
      if (tawkScript) {
        tawkScript.remove();
      }
      delete (window as any).Tawk_API;
      delete (window as any).Tawk_LoadStart;
    };
  }, [pathname]);

  return null; // This component doesn't render anything visible
}
