"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/products');
  }, [router]);

  return null;
}