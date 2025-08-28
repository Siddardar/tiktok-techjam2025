import { Image } from "lucide-react";

// Gallery Placeholder
const Gallery: React.FC = () => (
  <div className="p-6 text-center">
    <div className="max-w-sm mx-auto">
      <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Photos Yet</h3>
      <p className="text-gray-600">Upload some photos to see them here</p>
    </div>
  </div>
);

export default Gallery;