'use client'
import React, { useState, useEffect, useRef } from 'react';
import { PhotoFile } from '@/components/photo-preview';
import PhotoPreviewPopup from '@/components/photo-preview';
import UploadZone from '@/components/upload-zone';

const UploadPage: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      return file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024;
    });

    const newPhotos: PhotoFile[] = validFiles.map(file => {
      const preview = URL.createObjectURL(file);
      console.log('Created preview URL:', preview, 'for file:', file.name);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview
      };
    });

    if (newPhotos.length > 0) {
      console.log("Valid photos selected:");
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    } else {
      console.log('No valid image files selected');
    }
  };

  // Scroll to preview when photos are added
  useEffect(() => {
    if (photos.length > 0) {
      // Use setTimeout to ensure the DOM is updated
      setTimeout(() => {
        if (previewRef.current) {
          previewRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // Fallback scroll method
          window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [photos.length]); // Only trigger when photos array length changes

  const handleClosePreview = () => {
    // Clean up object URLs
    photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    setPhotos([]);
  };

  const handleDelete = (id: string) => {
    setPhotos(prevPhotos => {
      const filteredPhotos = prevPhotos.filter(photo => photo.id !== id);
      
      // Clean up the URL for the deleted photo
      const photoToDelete = prevPhotos.find(photo => photo.id === id);
      if (photoToDelete) {
        URL.revokeObjectURL(photoToDelete.preview);
      }
      
      return filteredPhotos;
    });
  };

  const handleProcess = () => {
    alert('Processing photos... (This would integrate with your backend)');
    handleClosePreview();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        <UploadZone onFileSelect={handleFileSelect} />
      </div>

      {photos.length > 0 && (
        <div ref={previewRef}>
          <PhotoPreviewPopup
            photos={photos}
            onDelete={handleDelete}
            onProcess={handleProcess}
          />
        </div>
      )}
    </div>
  );
};

export default UploadPage;