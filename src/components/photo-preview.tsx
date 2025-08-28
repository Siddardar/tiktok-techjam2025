import { X } from 'lucide-react';

// Photo Preview List
export interface PhotoFile {
  id: string;
  file: File;
  preview: string;
}

interface PhotoPreviewListProps {
  photos: PhotoFile[];
  onDelete: (id: string) => void;
  onProcess: () => void;
}

const PhotoPreviewList: React.FC<PhotoPreviewListProps> = ({
  photos,
  onDelete,
  onProcess
}) => {
  if (photos.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto px-8 pb-24">
      {/* Photos List */}
      <div className="space-y-4 mb-6">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={photo.preview}
                alt={photo.file.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', photo.file.name);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Delete button */}
            <button
              onClick={() => onDelete(photo.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Photo info */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900 truncate">{photo.file.name}</p>
              <p className="text-xs text-gray-600">
                {(photo.file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Process button */}
      <div className="flex justify-center">
        <button
          onClick={onProcess}
          className="bg-blue-600 text-white py-3 px-30 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Process {photos.length} Photo{photos.length !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
};

export default PhotoPreviewList;