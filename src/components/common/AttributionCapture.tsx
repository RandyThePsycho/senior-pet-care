// src/components/common/AttributionCapture.tsx
'use client';

import { useEffect } from 'react';
import { captureAttributionFromLocation } from '@/lib/attribution';

export default function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromLocation();
  }, []);

  return null;
}
