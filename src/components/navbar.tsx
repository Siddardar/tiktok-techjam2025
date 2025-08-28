'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Upload, Image, Home, Plus } from 'lucide-react';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  
  const getActiveTab = (): 'home' | 'upload' | 'gallery' => {
    if (pathname === '/gallery') return 'gallery';
    if (pathname === '/upload') return 'upload';
    return 'home'; // Default to home for '/'
  };

  const activeTab = getActiveTab();

  // Navigation items configuration
  const navItems = [
    {
      id: 'upload',
      label: 'Upload',
      href: '/upload',
      icon: Upload,
    },
    {
      id: 'gallery',
      label: 'Gallery',
      href: '/gallery',
      icon: Image,
    },
  ];

  // Calculate active tab index for morphing animation
  const activeIndex = navItems.findIndex(item => item.id === activeTab);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      {/* Backdrop blur for iOS-like effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg"></div>
      
      {/* Navigation content */}
      <div className="relative max-w-md mx-auto">
        <div className="relative flex items-center justify-around px-4 py-3">
          {/* Morphing bubble background */}
          <div
            className="absolute top-2 bottom-2 bg-blue-500/10 rounded-2xl transition-all duration-500 ease-out"
            style={{
              width: `calc(100% / ${navItems.length} - 16px)`,
              left: `calc((100% / ${navItems.length}) * ${activeIndex} + 8px)`,
            }}
          />
          
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex items-center justify-center p-2 flex-1 group z-10"
              >
                {/* Content container */}
                <div className="flex items-center space-x-2 transition-all duration-300 ease-out">
                  {/* Icon */}
                  <Icon
                    size={24}
                    className={`transition-all duration-300 ease-out flex-shrink-0 ${
                      isActive
                        ? 'text-blue-500 stroke-[2.5]'
                        : 'text-gray-400 group-hover:text-gray-600 group-active:text-blue-400'
                    }`}
                  />
                  
                  {/* Label - appears next to icon when active */}
                  <span
                    className={`text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap ${
                      isActive
                        ? 'text-blue-500 opacity-100 translate-x-0'
                        : 'text-gray-400 opacity-0 -translate-x-2'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                
                {/* Haptic feedback on tap */}
                <div className="absolute inset-0 rounded-2xl group-active:bg-black/5 transition-colors duration-150" />
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-4 bg-white/80 backdrop-blur-lg"></div>
    </nav>
  );
};

export default NavBar;