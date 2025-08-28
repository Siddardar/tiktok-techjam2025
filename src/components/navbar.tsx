'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import path from 'path';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  
  const getActiveTab = (): 'upload' | 'gallery' => {
    if (pathname === '/gallery') return 'gallery';
    return 'upload'; // Default to upload for '/' or '/upload'
  };

  const activeTab = getActiveTab();

  if (pathname !== "/") {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto">
          <div className="flex">
            <Link 
            href="/upload"
            className={`flex-1 text-center py-3 px-4 font-medium text-sm transition-colors ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upload
          </Link>
          <Link 
            href="/gallery"
            className={`flex-1 text-center py-3 px-4 font-medium text-sm transition-colors ${
              activeTab === 'gallery'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Gallery
          </Link>
        </div>
      </div>
    </nav>
  );
  }

};

export default NavBar;