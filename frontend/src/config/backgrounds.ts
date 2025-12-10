export const DEFAULT_CYMRAEG_TEXT_X_OFFSET = 75;
export const DEFAULT_CYMRAEG_TEXT_Y_OFFSET = 50;
export const DEFAULT_TEXT_FILL = '#ffffff';
export const DEFAULT_TEXT_ALIGN = 'left';
export const DEFAULT_FONT_FAMILY = 'Sans-serif';
export const DEFAULT_NAME_FONT_SIZE = 90;
export const DEFAULT_TITLE_FONT_SIZE = 50;
export const DEFAULT_CYMRAEG_FONT_SIZE = 45;

export interface LogoConfig {
  x: number;
  y: number;
  width: number;
  textXOffset: number;
  textYOffset: number;
  font: string;
  fontSize: number;
  fill: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface Placeholder {
  id: string;
  x: number;
  y: number;
  width: number;
  font: string;
  fontSize: number;
  fill: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface BackgroundImage {
  id: string;
  name: string;
  src: string;
  placeholders: Placeholder[];
  logoConfig?: LogoConfig;
  originalWidth?: number;
  originalHeight?: number;
}

export const backgrounds: BackgroundImage[] = [
  {
    id: '1',
    name: 'Normal Dark 2024',
    src: '/images/backgrounds/DHCWTeamsBackground-2024-Dark.png',
    placeholders: [
      {
        id: 'name',
        x: 744,
        y: 430,
        width: 1800,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_NAME_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
      {
        id: 'title',
        x: 744,
        y: 585,
        width: 2000,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_TITLE_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
    ],
    logoConfig: {
      x: 3200,
      y: 1650,
      width: 200,
      textXOffset: DEFAULT_CYMRAEG_TEXT_X_OFFSET,
      textYOffset: DEFAULT_CYMRAEG_TEXT_Y_OFFSET,
      font: DEFAULT_FONT_FAMILY,
      fontSize: DEFAULT_CYMRAEG_FONT_SIZE,
      fill: DEFAULT_TEXT_FILL,
      textAlign: DEFAULT_TEXT_ALIGN,
    },
  },
  {
    id: '2',
    name: 'Normal Light 2024',
    src: '/images/backgrounds/DHCWTeamsBackground-2024-Light.png',
    placeholders: [
      {
        id: 'name',
        x: 744,
        y: 430,
        width: 1800,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_NAME_FONT_SIZE,
        fill: '#325083',
        textAlign: DEFAULT_TEXT_ALIGN,
      },
      {
        id: 'title',
        x: 744,
        y: 585,
        width: 2000,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_TITLE_FONT_SIZE,
        fill: '#325083',
        textAlign: DEFAULT_TEXT_ALIGN,
      },
    ],
    logoConfig: {
      x: 3200,
      y: 1650,
      width: 200,
      textXOffset: DEFAULT_CYMRAEG_TEXT_X_OFFSET,
      textYOffset: DEFAULT_CYMRAEG_TEXT_Y_OFFSET,
      font: DEFAULT_FONT_FAMILY,
      fontSize: DEFAULT_CYMRAEG_FONT_SIZE,
        fill: '#325083',
      textAlign: DEFAULT_TEXT_ALIGN,
    },
  },
  {
    id: '3',
    name: 'Pride 2024',
    src: '/images/backgrounds/DHCWTeamsBackground-2024-Pride.png',
    placeholders: [
      {
        id: 'name',
        x: 1050,
        y: 430,
        width: 2000,
        font: 'Arial',
        fontSize: DEFAULT_NAME_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
      {
        id: 'title',
        x: 1050,
        y: 585,
        width: 2000,
        font: 'Arial',
        fontSize: DEFAULT_TITLE_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
    ],
    logoConfig: {
      x: 3200,
      y: 1650,
      width: 200,
      textXOffset: DEFAULT_CYMRAEG_TEXT_X_OFFSET,
      textYOffset: DEFAULT_CYMRAEG_TEXT_Y_OFFSET,
      font: DEFAULT_FONT_FAMILY,
      fontSize: DEFAULT_CYMRAEG_FONT_SIZE,
      fill: DEFAULT_TEXT_FILL,
      textAlign: DEFAULT_TEXT_ALIGN,
    },
  },
  {
    id: '4',
    name: 'Values 2025',
    src: '/images/backgrounds/DHCWTeamsBackground-2025-Values.png',
    placeholders: [
      {
        id: 'name',
        x: 870,
        y: 180,
        width: 2000,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_NAME_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
      {
        id: 'title',
        x: 870,
        y: 300,
        width: 2000,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_TITLE_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
    ],
    logoConfig: {
      x: 150,
      y: 800,
      width: 200,
      textXOffset: DEFAULT_CYMRAEG_TEXT_X_OFFSET,
      textYOffset: DEFAULT_CYMRAEG_TEXT_Y_OFFSET,
      font: DEFAULT_FONT_FAMILY,
      fontSize: DEFAULT_CYMRAEG_FONT_SIZE,
      fill: DEFAULT_TEXT_FILL,
      textAlign: DEFAULT_TEXT_ALIGN,
    },
  },
  {
    id: '5',
    name: 'Christmas 2024',
    src: '/images/backgrounds/DHCWTeamsBackground-2024-Christmas.png',
    placeholders: [
      {
        id: 'name',
        x: 744,
        y: 160,
        width: 2000,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_NAME_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
      {
        id: 'title',
        x: 744,
        y: 300,
        width: 2000,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_TITLE_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
    ],
    logoConfig: {
      x: 3200,
      y: 1650,
      width: 200,
      textXOffset: DEFAULT_CYMRAEG_TEXT_X_OFFSET,
      textYOffset: DEFAULT_CYMRAEG_TEXT_Y_OFFSET,
      font: DEFAULT_FONT_FAMILY,
      fontSize: DEFAULT_CYMRAEG_FONT_SIZE,
      fill: DEFAULT_TEXT_FILL,
      textAlign: DEFAULT_TEXT_ALIGN,
    },
  },
  {
    id: '6',
    name: 'Christmas 2025',
    src: '/images/backgrounds/DHCWTeamsBackground-2025-Christmas.png',
    placeholders: [
      {
        id: 'name',
        x: 3000,
        y: 1180,
        width: 900,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_NAME_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
      {
        id: 'title',
        x: 3000,
        y: 1300,
        width: 900,
        font: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_TITLE_FONT_SIZE,
        fill: DEFAULT_TEXT_FILL,
        textAlign: DEFAULT_TEXT_ALIGN,
      },
    ],
    logoConfig: {
      x: 3200,
      y: 1450,
      width: 200,
      textXOffset: DEFAULT_CYMRAEG_TEXT_X_OFFSET,
      textYOffset: DEFAULT_CYMRAEG_TEXT_Y_OFFSET,
      font: DEFAULT_FONT_FAMILY,
      fontSize: DEFAULT_CYMRAEG_FONT_SIZE,
      fill: DEFAULT_TEXT_FILL,
      textAlign: DEFAULT_TEXT_ALIGN,
    },
  },
];