import type { VercelRequest, VercelResponse } from '@vercel/node';

type WebVitalsName = 'CLS' | 'INP' | 'LCP' | 'FCP' | 'TTFB';
type WebVitalsRating = 'good' | 'needs-improvement' | 'poor';
type WebVitalsDevice = 'mobile' | 'desktop';

interface WebVitalsPayload {
  name: WebVitalsName;
  value: number;
  id: string;
  rating: WebVitalsRating;
  path: string;
  device: WebVitalsDevice;
  timestamp: number;
}

const MAX_PATH_LEN = 200;

function isValidPayload(body: unknown): body is WebVitalsPayload {
  if (!body || typeof body !== 'object') return false;

  const candidate = body as Partial<WebVitalsPayload>;
  const validName = ['CLS', 'INP', 'LCP', 'FCP', 'TTFB'].includes(candidate.name as string);
  const validRating = ['good', 'needs-improvement', 'poor'].includes(candidate.rating as string);
  const validDevice = ['mobile', 'desktop'].includes(candidate.device as string);

  return Boolean(
    validName &&
      validRating &&
      validDevice &&
      typeof candidate.value === 'number' &&
      Number.isFinite(candidate.value) &&
      typeof candidate.id === 'string' &&
      candidate.id.length > 0 &&
      candidate.id.length <= 120 &&
      typeof candidate.path === 'string' &&
      candidate.path.length > 0 &&
      candidate.path.length <= MAX_PATH_LEN &&
      typeof candidate.timestamp === 'number' &&
      Number.isFinite(candidate.timestamp),
  );
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const metric = req.body;
  console.info('[web-vitals]', metric);

  return res.status(204).end();
}
