// src/components/common/PerformanceMonitor.tsx
'use client';

import { useEffect, useState } from 'react';

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    cls: 0,
  });
  
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;
    
    let lcpObserver: PerformanceObserver;
    let fcpObserver: PerformanceObserver;
    let clsObserver: PerformanceObserver;
    
    // First Contentful Paint
    if (PerformanceObserver) {
      try {
        fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const fcp = entries[0].startTime;
            setMetrics(prev => ({ ...prev, fcp }));
          }
        });
        
        fcpObserver.observe({ type: 'paint', buffered: true });
        
        // Largest Contentful Paint
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const lcp = lastEntry.startTime;
            setMetrics(prev => ({ ...prev, lcp }));
          }
        });
        
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Cumulative Layout Shift
        clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.error('Performance metrics error:', e);
      }
    }
    
    return () => {
      fcpObserver?.disconnect();
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
    };
  }, []);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 bg-black bg-opacity-70 text-white p-2 text-xs z-50 font-mono">
      <div>FCP: {metrics.fcp.toFixed(0)}ms</div>
      <div>LCP: {metrics.lcp.toFixed(0)}ms</div>
      <div>CLS: {metrics.cls.toFixed(3)}</div>
    </div>
  );
}