import { PaletteColor, ThemeProvider, createTheme } from "@mui/material";
import { FC, ReactNode } from "react";


// https://stackoverflow.com/questions/50069724/how-to-add-custom-mui-palette-colors
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary: PaletteColor;
  }
}
const { palette: p } = createTheme(); // TODO: once https://github.com/mui/material-ui/issues/17410 is resolved, export directly from mui

export const palette = {
    text: {
      primary: '#d1d0c5',
      secondary: '#646669',
      disabled: 'rgba(50, 63, 83, 0.38)',
    },
    primary: {
      main: '#d1d0c5',
      dark: '#d1d0c5',
      light: '#d1d0c5',
      contrast: '#d1d0c5',
    },
    secondary: {
      main: '#2c2e31',
      dark: '#d1d0c5',
      light: '#d1d0c5',
      contrast: '#d1d0c5',
    },
    info: {
      main: '#0288D1',
      dark: '#01579B',
      light: '#03A9F4',
      contrast: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
      dark: '#1B5E20',
      light: '#4CAF50',
      contrast: '#FFFFFFF',
    },
    tertiary: p.augmentColor({ color: { main: '#202A3E' } }),
    warning: {
      main: '#ED6C02',
      dark: '#E65100',
      light: '#FF9800',
      contrast: '#FFFFFFF',
    },
    error: {
      main: '#D32F2F',
      dark: '#C62828',
      light: '#EF5350',
      contrast: '#FFFFFFF',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)',
    },
    background: {
      default: '#2c2e31',
      paper: '#2c2e31',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  };

interface ProjectThemeProviderProps {
    children: ReactNode;
}

export const ProjectThemeProvider: FC<ProjectThemeProviderProps> = ({ children }) => {
    const theme = createTheme({
        palette: palette
    });
    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
}