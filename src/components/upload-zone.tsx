'use client'
import { useRef } from "react";

import {Upload, Camera, Image} from "lucide-react";

// Simple Upload Zone
interface UploadZoneProps {
  onFileSelect: (files: FileList) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onFileSelect(files);
    }

    e.target.value = ''; // Reset the input so the same file can be selected again if needed
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Photos</h3>
        <p className="text-gray-600 text-sm mb-4">Select multiple photos to upload</p>
        
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center">
            <Image className="w-4 h-4 mr-1" />
            JPG, PNG, WebP
          </span>
          <span className="flex items-center">
            <Camera className="w-4 h-4 mr-1" />
            Max 10MB
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;