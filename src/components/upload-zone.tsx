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
    <div className="min-h-screen flex items-center justify-center p-8">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-20 text-center cursor-pointer hover:border-gray-400 transition-colors w-full max-w-2xl"
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
        
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h3 className="text-xl font-medium text-gray-900 mb-3">Upload Photos</h3>
        <p className="text-gray-600 mb-6">Select multiple photos to upload</p>
        
        <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
          <span className="flex items-center">
            <Image className="w-5 h-5 mr-2" />
            JPG, PNG, WebP
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;