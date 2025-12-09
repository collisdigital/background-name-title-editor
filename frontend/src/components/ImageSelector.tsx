import { BackgroundImage } from '../config/backgrounds';

interface ImageSelectorProps {
  backgrounds: BackgroundImage[];
  onSelect: (image: BackgroundImage) => void;
}

const ImageSelector = ({ backgrounds, onSelect }: ImageSelectorProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Select a Background</h3>
      <div className="grid grid-cols-3 gap-2">
        {backgrounds.map((bg) => (
          <img
            key={bg.id}
            src={bg.src}
            alt={bg.name}
            className="w-full h-auto cursor-pointer rounded-md border-2 border-transparent hover:border-blue-500"
            onClick={() => onSelect(bg)}
            role="button"
            aria-label={`Select ${bg.name} as background`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
