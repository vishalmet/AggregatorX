'use client';
import { useEffect } from 'react';

export function ReferrerTracker() {
  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("Referrer:", document.referrer);
    console.log("Is opened in X.com:", 
      document.referrer.includes('x.com') || 
      document.referrer.includes('twitter.com')
    );
  }, []);

  return null;
}