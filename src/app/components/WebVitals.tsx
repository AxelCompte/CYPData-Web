'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

interface WebVitalsProps {
  analyticsId?: string;
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    performance: Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };
  }
}

// Performance monitoring component
export default function WebVitals({ analyticsId }: WebVitalsProps) {
  useEffect(() => {
    // Function to send metrics to analytics
    const sendToAnalytics = (metric: Metric) => {
      // Console log for development
      console.log('Web Vitals:', metric);
      
      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          custom_parameter_name: metric.name,
          value: Math.round(metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      }
      
      // Send to custom analytics endpoint
      if (analyticsId) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            analyticsId,
            metric: {
              name: metric.name,
              value: metric.value,
              id: metric.id,
              delta: metric.delta,
              entries: metric.entries,
              navigationType: metric.navigationType,
              rating: metric.rating,
            },
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
          }),
        }).catch(console.error);
      }
    };

    // Performance observer for detailed metrics
    const observePerformance = () => {
      if ('PerformanceObserver' in window) {
        // Observe paint metrics
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log(`${entry.name}: ${entry.startTime}ms`);
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Observe navigation metrics
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const navigationEntry = entry as PerformanceNavigationTiming;
            console.log('Navigation Timing:', {
              domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
              load: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
              transferSize: navigationEntry.transferSize,
              encodedBodySize: navigationEntry.encodedBodySize,
              decodedBodySize: navigationEntry.decodedBodySize,
            });
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });

        // Observe resource metrics
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming;
            if (resourceEntry.transferSize > 100000) { // Log large resources (>100KB)
              console.log('Large Resource:', {
                name: resourceEntry.name,
                transferSize: resourceEntry.transferSize,
                duration: resourceEntry.duration,
              });
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
      }
    };

    // Monitor Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics); // INP replaced FID in web-vitals v3
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Start performance observation
    observePerformance();

    // Cleanup function
    return () => {
      // Performance observers are automatically cleaned up when the component unmounts
    };
  }, [analyticsId]);

  // Performance monitoring utility functions
  useEffect(() => {
    // Memory usage monitoring (if available)
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & {
          memory?: {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
          };
        }).memory;
        
        if (memory) {
          console.log('Memory Usage:', {
            used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
            total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
            limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
          });
        }
      }
    };

    // Monitor memory usage every 30 seconds
    const memoryInterval = setInterval(monitorMemory, 30000);
    
    // Initial memory check
    monitorMemory();

    return () => clearInterval(memoryInterval);
  }, []);

  // Monitor long tasks
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long Task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      });
      
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (error) {
        // Long task API not supported
        console.log('Long task API not supported:', error);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}

// Utility function to get current performance metrics on demand
export const logCurrentPerformance = () => {
  if (typeof window !== 'undefined') {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    console.log('Current Performance Snapshot:', {
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 'N/A',
      load: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 'N/A',
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 'N/A',
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 'N/A',
      transferSize: navigation?.transferSize || 'N/A',
    });
  }
};