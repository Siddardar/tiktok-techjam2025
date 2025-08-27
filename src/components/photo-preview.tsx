import {X, ChevronLeft, ChevronRight} from 'lucide-react';

// Photo Preview Popup
export interface PhotoFile {
  id: string;
  file: File;
  preview: string;
}

interface PhotoPreviewPopupProps {
  photos: PhotoFile[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onProcess: () => void;
}

const PhotoPreviewPopup: React.FC<PhotoPreviewPopupProps> = ({
  photos,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onProcess
}) => {
  if (photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-sm w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Photo Preview</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Display */}
        <div className="relative">
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <img
              src={currentPhoto.preview}
              alt={currentPhoto.file.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', currentPhoto.file.name);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', currentPhoto.file.name);
              }}
            />
          </div>

          {/* Navigation buttons */}
          {photos.length > 1 && (
            <>
              {currentIndex > 0 && (
                <button
                  onClick={onPrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {currentIndex < photos.length - 1 && (
                <button
                  onClick={onNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </>
          )}

          {/* Photo counter */}
          {photos.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          )}
        </div>

        {/* Photo info */}
        <div className="p-4 border-b">
          <p className="font-medium text-gray-900 truncate">{currentPhoto.file.name}</p>
          <p className="text-sm text-gray-600">
            {(currentPhoto.file.size / 1024 / 1024).toFixed(1)} MB
          </p>
        </div>

        {/* Action buttons */}
        <div className="p-4 space-y-3">
          <button
            onClick={onProcess}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Process Photos
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPreviewPopup;