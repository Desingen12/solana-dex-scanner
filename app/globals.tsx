'use client';

import React from 'react';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return <>{children}</>;
}