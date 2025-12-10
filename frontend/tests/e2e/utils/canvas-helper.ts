import { Page } from '@playwright/test';

export interface CanvasObject {
  type: string;
  text?: string;
  visible: boolean;
  name?: string;
  left: number;
  top: number;
}

interface FabricCanvasElement extends HTMLCanvasElement {
  __fabric?: any; // We can't easily import fabric types in browser context here without strict dependency, keeping any for the fabric instance itself is safer for serializability check
}

/**
 * Retrieves a serializable representation of a Fabric.js object from the canvas by its name.
 */
export async function getCanvasObject(page: Page, name: string): Promise<CanvasObject | null> {
  return page.evaluate((objectName) => {
    const canvasEl = document.querySelector('canvas') as FabricCanvasElement | null;
    if (!canvasEl?.__fabric) {
      return null;
    }
    const fabricCanvas = canvasEl.__fabric;
    const targetObject = fabricCanvas.getObjects().find((obj: any) => obj.name === objectName);
    
    if (!targetObject) {
      return null;
    }
    
    return {
      type: targetObject.type,
      text: targetObject.text,
      visible: targetObject.visible,
      name: targetObject.name,
      left: targetObject.left,
      top: targetObject.top
    };
  }, name);
}

/**
 * Checks if the background image is set on the canvas.
 */
export async function hasBackgroundImage(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const canvasEl = document.querySelector('canvas') as FabricCanvasElement | null;
    if (!canvasEl?.__fabric) {
      return false;
    }
    const fabricCanvas = canvasEl.__fabric;
    return !!fabricCanvas.backgroundImage;
  });
}
