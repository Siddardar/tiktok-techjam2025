'use client'
import React from 'react';
import Gallery from '@/components/gallery';

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;