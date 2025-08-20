import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Add quantum-themed body class
    document.body.classList.add('bg-apex-dark', 'text-white');
    
    // Log environment info
    console.log('PSYBERHERD™ APEX Sniper - Frontend v2.1.0');
    console.log('Environment:', process.env.NEXT_PUBLIC_ENVIRONMENT);
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    
    // Initialize performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
      }
    }
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;