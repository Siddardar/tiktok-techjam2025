'use client'
import React, { useState } from 'react';
import { PhotoFile } from '@/components/photo-preview';
import PhotoPreviewPopup from '@/components/photo-preview';
import UploadZone from '@/components/upload-zone';

const UploadPage: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
      setPhotos(newPhotos);
      setCurrentPhotoIndex(0);
      setShowPreview(true);
    } else {
      console.log('No valid image files selected');
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    // Clean up object URLs
    console.log("hi")
    photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    setPhotos([]);
  };

  const handlePrevious = () => {
    setCurrentPhotoIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPhotoIndex(prev => Math.min(photos.length - 1, prev + 1));
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

      {showPreview && (
        <PhotoPreviewPopup
          photos={photos}
          currentIndex={currentPhotoIndex}
          onClose={handleClosePreview}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onProcess={handleProcess}
        />
      )}
    </div>
  );
};

export default UploadPage;