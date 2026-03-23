import { onCLS, onINP, onLCP, type MetricWithAttribution } from 'web-vitals/attribution';

interface WebVitalsPayload {
  name: MetricWithAttribution['name'];
  value: number;
  id: string;
  rating: MetricWithAttribution['rating'];
  path: string;
  device: 'mobile' | 'desktop';
  timestamp: number;
}

function detectDevice(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  return window.matchMedia('(max-width: 1024px)').matches ? 'mobile' : 'desktop';
}

function sendMetric(metric: MetricWithAttribution) {
  if (typeof window === 'undefined') return;

  const payload: WebVitalsPayload = {
    name: metric.name,
    value: Number(metric.value.toFixed(2)),
    id: metric.id,
    rating: metric.rating,
    path: window.location.pathname,
    device: detectDevice(),
    timestamp: Date.now(),
  };

  const body = JSON.stringify(payload);
  const sent = navigator.sendBeacon?.('/api/web-vitals', body);
  if (sent) return;

  fetch('/api/web-vitals', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
  }).catch(() => {
    // Ignore network failures to avoid impacting UX.
  });
}

export function initWebVitals() {
  onCLS(sendMetric, { reportAllChanges: true });
  onLCP(sendMetric, { reportAllChanges: true });
  onINP(sendMetric, { reportAllChanges: true });
}
