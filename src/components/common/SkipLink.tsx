// src/components/common/SkipLink.tsx
'use client';

import { useState } from 'react';

export default function SkipLink() {
  const [focused, setFocused] = useState(false);

  return (
    <a
      href="#main-content"
      className={`
        fixed top-0 left-0 p-3 m-3 bg-primary text-white font-bold z-50 transition-transform
        ${focused ? 'transform-none' : '-translate-y-full'}
      `}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      Skip to main content
    </a>
  );
}