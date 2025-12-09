import { forwardRef } from 'react';

const PreviewCanvas = forwardRef<HTMLCanvasElement>((_, ref) => {
  return (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
      <canvas ref={ref} role="presentation"></canvas>
    </div>
  );
});

export default PreviewCanvas;
