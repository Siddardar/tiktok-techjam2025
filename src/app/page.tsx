'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to upload page by default
    router.replace('/upload');
  }, [router]);

  return null; // This component won't render anything as it redirects immediately
};

export default HomePage;