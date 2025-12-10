import { useEffect, useRef, useState, useCallback } from 'react';
import * as fabric from 'fabric';
import { BackgroundImage, Placeholder, LogoConfig } from '../config/backgrounds';

interface FabricObjectWithConfig extends fabric.Object {
  _placeholder?: Placeholder;
  _logoConfig?: LogoConfig;
}

interface FabricCanvasElement extends HTMLCanvasElement {
  __fabric?: fabric.Canvas;
}

export const useImageProcessor = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const [selectedImage, setSelectedImage] = useState<BackgroundImage | null>(
    null
  );
  const [originalImageDimensions, setOriginalImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [imageLoadingError, setImageLoadingError] = useState<string | null>(null);
  const [cymraegStatus, setCymraegStatus] = useState<'None' | 'Learner' | 'Fluent'>('None');

  const updateLayout = useCallback(() => {
    if (!fabricCanvas.current?.backgroundImage) return;

    const canvas = fabricCanvas.current;
    const bgImage = canvas.backgroundImage as fabric.FabricImage;

    if (!bgImage.width || !bgImage.height) return;

    // Calculate Scale (Contain) - Ensure image is fully visible
    const scale = Math.min(
      (canvas.width ?? 0) / bgImage.width,
      (canvas.height ?? 0) / bgImage.height
    );

    // Center Image
    bgImage.set({
      scaleX: scale,
      scaleY: scale,
      left: (canvas.width ?? 0) / 2,
      top: (canvas.height ?? 0) / 2,
      originX: 'center',
      originY: 'center',
    });

    // Calculate Top-Left of the image relative to canvas
    // imageCenter is at canvas.width/2, canvas.height/2
    const imgLeft = (canvas.width ?? 0) / 2 - (bgImage.width * scale) / 2;
    const imgTop = (canvas.height ?? 0) / 2 - (bgImage.height * scale) / 2;

    // Update Objects (Text and Logo)
    canvas.getObjects().forEach((obj) => {
      const fabricObj = obj as FabricObjectWithConfig;
      
      if (fabricObj._placeholder) {
        const placeholder = fabricObj._placeholder;
        obj.set({
          left: imgLeft + placeholder.x * scale,
          top: imgTop + placeholder.y * scale,
          width: placeholder.width * scale,
          fontSize: placeholder.fontSize * scale,
          scaleX: 1,
          scaleY: 1,
        });
        obj.setCoords();
      } else if (fabricObj._logoConfig) {
        const logoConfig = fabricObj._logoConfig;
        
        if ((obj as any).name === 'cymraeg-text') {
             const xOffset = logoConfig.textXOffset * scale;
             const yOffset = logoConfig.textYOffset * scale;
             const baseFontSize = logoConfig.fontSize;
             obj.set({
                 left: imgLeft + (logoConfig.x + logoConfig.width) * scale + xOffset,
                 top: imgTop + logoConfig.y * scale + yOffset,
                 fontSize: baseFontSize * scale,
                 scaleX: 1,
                 scaleY: 1,
             });
             obj.setCoords();
        } else {
            // Check for obj.width to be safe, though images usually have it
            if (obj.width) {
               const logoScale = (logoConfig.width * scale) / obj.width;
               obj.set({
                 left: imgLeft + logoConfig.x * scale,
                 top: imgTop + logoConfig.y * scale,
                 scaleX: logoScale,
                 scaleY: logoScale,
               });
               obj.setCoords();
            }
        }
      }
    });

    canvas.requestRenderAll();
  }, []); 

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      fabricCanvas.current = new fabric.Canvas(canvasElement, {
        width: canvasElement.clientWidth,
        height: canvasElement.clientHeight,
      });

      // Expose fabric instance for E2E testing
      (canvasElement as FabricCanvasElement).__fabric = fabricCanvas.current;

      const resizeObserver = new ResizeObserver(() => {
        if (fabricCanvas.current && canvasElement) {
          requestAnimationFrame(() => {
            if (!fabricCanvas.current || !canvasElement) return;

            // Find the responsive container by ID
            const container = document.getElementById('preview-container');
            if (!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            fabricCanvas.current.setDimensions({
              width: width,
              height: height,
            });

            updateLayout();
          });
        }
      });

      // Observe the responsive container
      const container = document.getElementById('preview-container');
      if (container) {
        resizeObserver.observe(container);
      } else {
        // Fallback if ID isn't found immediately (though it should be)
        resizeObserver.observe(canvasElement.parentElement ?? canvasElement);
      }

      return () => {
        if (canvasElement) {
            delete (canvasElement as FabricCanvasElement).__fabric;
        }
        fabricCanvas.current?.dispose();
        resizeObserver.disconnect();
      };
    }
  }, [canvasRef, updateLayout]);

  const updateText = (id: string, text: string) => {
    if (!fabricCanvas.current || !selectedImage) return;

    const placeholder = selectedImage.placeholders.find((p) => p.id === id);
    if (!placeholder) return;

    const canvas = fabricCanvas.current;

    // Remove existing text object if it exists
    const existingObject = canvas
      .getObjects()
      .find((obj) => (obj as fabric.Object & { name?: string }).name === id);
    if (existingObject) {
      canvas.remove(existingObject);
    }

    // Create text object with temporary coordinates
    const textObject = new fabric.Textbox(text, {
      fontFamily: placeholder.font,
      fontSize: placeholder.fontSize,
      fill: placeholder.fill,
      textAlign: placeholder.textAlign,
      name: id,
    });
    
    // Attach placeholder config to the object for future updates
    (textObject as FabricObjectWithConfig)._placeholder = placeholder;

    canvas.add(textObject);
    
    // Position it correctly immediately
    updateLayout();
  };

  const addLogoToCanvasInternal = async (canvas: fabric.Canvas, logoConfig: LogoConfig, status: 'Learner' | 'Fluent') => {
      const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
      const logoUrl = `${baseUrl}images/overlays/logo-cymraeg.png`;
      try {
        const logoImg = await fabric.FabricImage.fromURL(logoUrl, { crossOrigin: 'anonymous' });

        logoImg.set({
            name: 'cymraeg-logo',
            originX: 'left',
            originY: 'top',
        });
        (logoImg as FabricObjectWithConfig)._logoConfig = logoConfig;
        canvas.add(logoImg);

        // Add text
        const textContent = status === 'Learner' ? "Dysgwyr\nLearner" : "Rhugl\nFluent";
        const textObj = new fabric.Textbox(textContent, {
            name: 'cymraeg-text',
            fontFamily: logoConfig.font, 
            fill: logoConfig.fill,
            textAlign: logoConfig.textAlign as 'left' | 'center' | 'right' | 'justify',
            originX: 'left',
            originY: 'top',
            lineHeight: 1.1,
        });
        (textObj as FabricObjectWithConfig)._logoConfig = logoConfig;
        canvas.add(textObj);

      } catch (e) {
        console.error("Failed to load logo", e);
      }
  };

  const updateCymraegStatus = async (status: 'None' | 'Learner' | 'Fluent') => {
      setCymraegStatus(status);
      if (!fabricCanvas.current || !selectedImage) return;

      const canvas = fabricCanvas.current;
      const existingLogo = canvas.getObjects().find(obj => (obj as any).name === 'cymraeg-logo');
      const existingText = canvas.getObjects().find(obj => (obj as any).name === 'cymraeg-text');
      
      if (existingLogo) canvas.remove(existingLogo);
      if (existingText) canvas.remove(existingText);

      if (status !== 'None' && selectedImage.logoConfig) {
          await addLogoToCanvasInternal(canvas, selectedImage.logoConfig, status);
          updateLayout();
      } else {
          canvas.requestRenderAll();
      }
  };

  const selectImage = async (image: BackgroundImage, textValues: Record<string, string> = {}) => {
    setSelectedImage(image);
    if (!fabricCanvas.current) return;

    try {
      // Clear existing objects (text) when changing background
      setImageLoadingError(null);
      fabricCanvas.current.clear();
      
      const img = await fabric.FabricImage.fromURL(image.src, { crossOrigin: 'anonymous' });
      
      if (!fabricCanvas.current) return;

      const canvas = fabricCanvas.current;
      
      canvas.backgroundImage = img;

      setOriginalImageDimensions({ width: img.width, height: img.height });
      // update state is async, so we use 'image' argument for logic below
      
      updateLayout();

      // Re-add text objects if values are provided
      Object.entries(textValues).forEach(([id, text]) => {
        const placeholder = image.placeholders.find((p) => p.id === id);
        if (!placeholder) return;

        const textObject = new fabric.Textbox(text, {
          fontFamily: placeholder.font,
          fontSize: placeholder.fontSize,
          fill: placeholder.fill,
          textAlign: placeholder.textAlign,
          name: id,
        });
        
        (textObject as FabricObjectWithConfig)._placeholder = placeholder;
        canvas.add(textObject);
      });

      // Re-add logo if status is set
      if (cymraegStatus !== 'None' && image.logoConfig) {
          await addLogoToCanvasInternal(canvas, image.logoConfig, cymraegStatus);
      }

      // Layout again to position new text objects correctly
      updateLayout();
      
    } catch (error) {
      console.error('Error loading image:', error);
      setImageLoadingError(`Failed to load image: ${image.name}. Please try a different image.`);
    }
  };

  const downloadImage = async () => {
    if (!selectedImage || !originalImageDimensions || !fabricCanvas.current) {
      console.error('No image selected or original dimensions not available for download.');
      return;
    }

    // Create a temporary static canvas with original image dimensions
    const tempCanvasEl = document.createElement('canvas');
    const tempCanvas = new fabric.StaticCanvas(tempCanvasEl, {
      width: originalImageDimensions.width,
      height: originalImageDimensions.height,
      renderOnAddRemove: false, // Optimize for static rendering
    });

    try {
      // Load the background image onto the temporary canvas
      const originalImg = await fabric.FabricImage.fromURL(selectedImage.src, { crossOrigin: 'anonymous' });
      tempCanvas.backgroundImage = originalImg;

      // Add all text objects from the interactive canvas to the temporary canvas
      fabricCanvas.current.getObjects().forEach((obj) => {
        const fabricObj = obj as FabricObjectWithConfig;
        if (fabricObj._placeholder) {
          const placeholder = fabricObj._placeholder;
          const textObject = new fabric.Textbox((obj as fabric.Textbox).text ?? '', {
            fontFamily: placeholder.font,
            fontSize: placeholder.fontSize,
            fill: placeholder.fill,
            textAlign: placeholder.textAlign,
            left: placeholder.x,
            top: placeholder.y,
            width: placeholder.width,
            originX: 'left',
            originY: 'top',
          });
          tempCanvas.add(textObject);
        }
      });

      // Add Logo for download
      if (cymraegStatus !== 'None' && selectedImage.logoConfig) {
           const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
           const logoUrl = `${baseUrl}images/overlays/logo-cymraeg.png`;
           const logoImg = await fabric.FabricImage.fromURL(logoUrl, { crossOrigin: 'anonymous' });
           const config = selectedImage.logoConfig;
           
           logoImg.set({
               left: config.x,
               top: config.y,
               scaleX: config.width / logoImg.width!,
               scaleY: config.width / logoImg.width!,
               originX: 'left',
               originY: 'top',
           });
           tempCanvas.add(logoImg);

           // Add Cymraeg Text
           const textContent = cymraegStatus === 'Learner' ? "Dysgwyr\nLearner" : "Rhugl\nFluent";
           const baseFontSize = config.fontSize; 

           const textObj = new fabric.Textbox(textContent, {
                fontFamily: config.font,
                fontSize: baseFontSize,
                fill: config.fill,
                textAlign: config.textAlign as 'left' | 'center' | 'right' | 'justify',
                left: config.x + config.width + config.textXOffset, 
                top: config.y + config.textYOffset,
                originX: 'left',
                originY: 'top',
                lineHeight: 1.1,
           });
           tempCanvas.add(textObj);
      }
      
      // Render all objects on the temporary canvas
      tempCanvas.renderAll();

      // Generate data URL and trigger download
      const dataURL = tempCanvas.toDataURL({
        format: 'png',
        quality: 1, // Max quality
        multiplier: 1,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'virtual-background.png';
      link.click();
    } catch (error) {
      console.error('Error generating image for download:', error);
    } finally {
      // Dispose the temporary canvas to free up memory
      tempCanvas.dispose();
    }
  };

  return { selectImage, updateText, downloadImage, imageLoadingError, updateCymraegStatus, cymraegStatus };
};
